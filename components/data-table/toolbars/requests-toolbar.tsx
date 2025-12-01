"use client";

import type { Table } from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Search, X, Sparkles } from "lucide-react";
import RegisterInterestPopup from "@/components/(landing-page)/test/register-interest-popup";

interface RequestsToolbarProps<TData> {
  table?: Table<TData>;
  onRefresh?: () => void;
  onExport?: () => void;
  tableName?: string;
  onGlobalFilterChange?: (value: string) => void;
}

export function RequestsDataTableToolbar<TData>({
  table,
  onRefresh,
  onExport,
  tableName,
  onGlobalFilterChange,
}: RequestsToolbarProps<TData>) {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [isRegisterInterestOpen, setIsRegisterInterestOpen] = useState(false);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setGlobalFilter(value);
    onGlobalFilterChange?.(value);
  };

  const isFiltered = globalFilter !== "";

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by project or request no."
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

        <div className="flex items-center gap-2">
          {tableName && (
            <Button
              variant="outline"
              size="sm"
              className="hidden h-8 lg:flex"
              onClick={onExport}
            >
              Export
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="hidden h-8 lg:flex"
          >
            Refresh
          </Button>
          {table && <DataTableViewOptions table={table} />}
          <Button
            variant="default"
            size="sm"
            className="h-8"
            onClick={() => setIsRegisterInterestOpen(true)}
          >
            <Sparkles className="mr-1 h-4 w-4" />
            Request Interest
          </Button>
        </div>
      </div>

      <RegisterInterestPopup
        isOpen={isRegisterInterestOpen}
        setIsOpen={setIsRegisterInterestOpen}
      />
    </>
  );
}


