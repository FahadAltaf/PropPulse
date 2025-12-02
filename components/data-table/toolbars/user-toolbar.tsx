"use client";

import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Download, Plus, RefreshCcw, X, Search, UserPlus } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import AddUser from "@/components/(dashboard)/user/component/add-user";
import type { Role } from "@/types/types";
// import UserSettingsDialogBox from "@/components/dashboard/user-management/manage-user-settings";

interface DataTableToolbarProps<TData> {
  table?: Table<TData>;
  onRefresh?: () => void;
  onExport?: () => void;
  tableName?: string;
  onGlobalFilterChange?: (value: string) => void;
  fetchRecords: () => void;
  type?: string;
  listRoles?: Role[];
}

export function UserDataTableToolbar<TData>({
  table,
  onRefresh,
  onExport,
  tableName,
  onGlobalFilterChange,
  fetchRecords,
  type,
  listRoles,
}: DataTableToolbarProps<TData>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setGlobalFilter(value);
    onGlobalFilterChange?.(value);
  };

  const isFiltered = globalFilter !== "";
  return (
    <>
      <div className="flex flex-row gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search + Reset */}
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative w-full sm:w-1/2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={globalFilter}
              onChange={handleFilterChange}
              className="h-8 pl-8 w-full focus-visible:ring-0"
            />
          </div>
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => {
                onGlobalFilterChange?.("");
                setGlobalFilter("");
              }}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          {tableName && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 text-xs sm:text-sm"
              onClick={onExport}
            >
              <Download className="h-4 w-4" />
              <span className="hidden xs:inline">Export</span>
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="h-8 gap-3 text-xs sm:text-sm"
          >
            <RefreshCcw className="h-4 w-4" />
            <span className="hidden sm:inline!">Refresh</span>
          </Button>
          {table && (
            <div className="hidden sm:block">
              <DataTableViewOptions table={table} />
            </div>
          )}
          <Button
            variant="default"
            size="sm"
            className="h-8 gap-3 text-xs sm:text-sm"
            onClick={() => setIsDialogOpen(true)}
          >
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:block!">Add User</span>
          </Button>
        </div>
      </div>
      <AddUser
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        listRoles={listRoles}
        onRefresh={fetchRecords}
      />
    </>
  );
}
