import { type Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  pageIndex: number;
  pageSize: number;
  onPageChange: (pageIndex: number) => void;
  onPageSizeChange: (size: number) => void;
  rowCount: number;
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [12, 20, 30, 40, 50, 100],
  pageIndex,
  pageSize,
  onPageChange,
  onPageSizeChange,
  rowCount,
}: DataTablePaginationProps<TData>) {
  const totalRows = rowCount;
  const pageCount = Math.ceil(totalRows / pageSize);
  const startRow = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="flex flex-row gap-3 px-2 items-center justify-between">
      <div className="text-[11px] text-muted-foreground sm:text-xs md:text-sm">
        {totalRows === 0 ? (
          "No records found"
        ) : (
          <>
            Showing{" "}
            <span className="font-medium text-foreground">
              {startRow}–{endRow}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">{totalRows}</span>{" "}
            rows
          </>
        )}
      </div>
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end sm:space-x-4 lg:space-x-6">
        <div className="hidden items-center space-x-2 md:flex">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              const size = Number(value);
              onPageSizeChange(size);
            }}
          >
            <SelectTrigger className="h-8 w-[80px]">
              <SelectValue placeholder={`${pageSize}`} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSizeOption) => (
                <SelectItem key={pageSizeOption} value={`${pageSizeOption}`}>
                  {pageSizeOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="hidden md:flex items-center justify-center text-[11px] font-medium text-muted-foreground sm:text-xs md:text-sm">
          Page{" "}
          <span className="mx-1 min-w-[2ch] text-center text-foreground">
            {pageCount === 0 ? 0 : pageIndex + 1}
          </span>
          of <span className="ml-1 text-foreground">{pageCount}</span>
        </div>
        <div className="flex items-center justify-center space-x-1 sm:space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0 "
            onClick={() => {
              onPageChange(0);
            }}
            disabled={pageIndex === 0}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              onPageChange(pageIndex - 1);
            }}
            disabled={pageIndex === 0}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              onPageChange(pageIndex + 1);
            }}
            disabled={pageIndex >= pageCount - 1}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className=" h-8 w-8 p-0 "
            onClick={() => {
              onPageChange(pageCount - 1);
            }}
            disabled={pageIndex >= pageCount - 1}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
