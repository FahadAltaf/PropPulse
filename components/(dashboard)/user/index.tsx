"use client";
import { useState, useEffect } from "react";

import { getUserColumns } from "@/components/data-table/columns/column-user";
import { UserDataTableToolbar } from "@/components/data-table/toolbars/user-toolbar";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { UserTableRowActions } from "@/components/data-table/actions/user-actions";
import { usersService } from "@/modules/users/services/users-service";
import { User, Role } from "@/types/types";
import { rolesService } from "@/modules/roles/services/roles-service";
import { useDebounce } from "@/hooks/use-debounce";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { currentTimezone } from "@/lib/helper/current-timezone";
import { generateNameAvatar } from "@/utils/generateRandomAvatar";
import {
  Mail,
  BadgeCheck,
  Clock3,
  CalendarDays,
  MoreHorizontal,
  SquarePen,
} from "lucide-react";
import type { Row } from "@tanstack/react-table";

export default function UserManagementPage({ type }: { type: string }) {
  const [listUsers, setListUsers] = useState<User[]>([]);
  const [listRoles, setListRoles] = useState<Role[]>([]);
  const [recordCount, setRecordCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(12);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isRefetching, setIsRefetching] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const [sorting, setSorting] = useState<{
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }>({});

  const { userProfile } = useAuth();

  async function fetchUsers() {
    setIsRefetching(true);
    try {
      const usersResponse: any = await usersService.getUsersPagination(
        `%${debouncedSearchTerm}%`,
        pageSize,
        currentPage,

        sorting
      );

      setListUsers(usersResponse.users);
      setRecordCount(usersResponse.totalCount);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsRefetching(false);
    }
  }
  const fetchRoles = async () => {
    const rolesResponse: Role[] = await rolesService.getAllRoles();
    setListRoles(rolesResponse);
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, pageSize, debouncedSearchTerm, sorting]);

  const handleGlobalFilterChange = (filter: string) => {
    if (!searchQuery && !filter) {
      setIsRefetching(true);
      fetchUsers();
    } else {
      setSearchQuery(filter);
    }
    setCurrentPage(0);
  };

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleSortingChange = (sortBy?: string, sortOrder?: "asc" | "desc") => {
    setSorting({ sortBy, sortOrder });
    setCurrentPage(0);
  };

  return (
    <div className="flex flex-1 flex-col gap-6 py-6 h-[calc(100vh-62px)]">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        {/* Mobile view: toolbar + cards + pagination */}
        <div className="md:hidden space-y-3">
          <UserDataTableToolbar
            fetchRecords={fetchUsers}
            type={type}
            listRoles={listRoles}
            onGlobalFilterChange={handleGlobalFilterChange}
          />

          {listUsers.length === 0 ? (
            <div className="rounded-lg border bg-muted/30 p-4 text-center text-xs text-muted-foreground">
              No users found. Try adjusting your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {listUsers
                .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                .map((user) => {
                  const fullName = `${user.first_name || ""} ${
                    user.last_name || ""
                  }`.trim();
                  const avatarSrc =
                    user.profile_image && user.profile_image.includes("http")
                      ? user.profile_image
                      : generateNameAvatar(fullName || user.email || "");

                  return (
                    <Card
                      key={user.id}
                      className="border border-border/60 rounded-xl p-4 flex flex-col gap-4 bg-white shadow-sm hover:shadow-md transition-all"
                    >
                      {/* Header: avatar, name, email, actions */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="border-foreground/10 border h-10 w-10">
                            <AvatarImage src={avatarSrc} alt={fullName} />
                          </Avatar>
                          <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-semibold truncate">
                              {fullName || user.email}
                            </span>
                            {user.email && (
                              <span className="text-[11px] text-muted-foreground truncate">
                                {user.email}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-row items-end gap-1">
                          <StatusBadge
                            status={user.is_active ? "active" : "inactive"}
                          />
                        </div>
                      </div>

                      {/* Details rows */}
                      <div className="space-y-2 text-[11px]">
                        {/* Role */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <BadgeCheck className="h-3 w-3" />
                            <span>Role</span>
                          </div>
                          <Badge className="px-2 py-0.5 text-[10px] font-semibold">
                            {(user.roles?.name || "Unknown").toUpperCase()}
                          </Badge>
                        </div>

                        {/* Created */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <CalendarDays className="h-3 w-3" />
                            <span>Created</span>
                          </div>
                          <span className="text-xs font-medium text-right">
                            {user.created_at
                              ? currentTimezone(user.created_at)
                              : "--"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <SquarePen className="h-3 w-3" />
                            <span>Actions</span>
                          </div>
                          <span className="text-xs font-medium text-right">
                            <UserTableRowActions
                              // @ts-ignore - we only need row.original inside actions
                              row={{ original: user } as Row<User>}
                              fetchUsers={fetchUsers}
                              listRoles={listRoles}
                            />
                          </span>
                        </div>
                      </div>
                    </Card>
                  );
                })}
            </div>
          )}

          <div className="pt-1">
            <DataTablePagination
              // dummy table instance – not used internally
              table={{} as any}
              pageIndex={currentPage}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              rowCount={recordCount}
            />
          </div>
        </div>

        {/* Desktop view: standard table */}
        <div className="hidden md:grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <DataTable
            data={listUsers || []}
            toolbar={
              <UserDataTableToolbar
                fetchRecords={fetchUsers}
                type={type}
                listRoles={listRoles}
              />
            }
            // @ts-ignore
            columns={getUserColumns(
              fetchUsers,
              listRoles as Role[],
              userProfile?.roles?.name === "admin"
            )}
            onGlobalFilterChange={handleGlobalFilterChange}
            onSortingChange={handleSortingChange}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            pageSize={pageSize}
            currentPage={currentPage}
            loading={isRefetching}
            error={""}
            rowCount={recordCount}
            type="users"
          />
        </div>
      </div>
    </div>
  );
}
