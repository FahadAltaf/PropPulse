"use client";

import type { Table } from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Search, X, Sparkles, Download, RefreshCcw } from "lucide-react";
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
            onClick={() => setIsRegisterInterestOpen(true)}
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:block!">Request Interest</span>
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
