"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { RequestsDataTableToolbar } from "@/components/data-table/toolbars/requests-toolbar";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import {
  getRequestColumns,
  type RequestRecord,
} from "@/components/data-table/columns/column-requests";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Download, Home } from "lucide-react";

const MOCK_REQUESTS: RequestRecord[] = [
  {
    id: "1",
    reqNo: "REQ-0001",
    createdAt: "2025-11-28 10:15",
    completedAt: "2025-11-29 14:30",
    project: "Downtown Residences",
    lastAction: "Completed",
  },
  {
    id: "2",
    reqNo: "REQ-0002",
    createdAt: "2025-11-29 09:05",
    completedAt: null,
    project: "Marina Heights",
    lastAction: "In Progress",
  },
  {
    id: "3",
    reqNo: "REQ-0003",
    createdAt: "2025-11-30 16:40",
    completedAt: null,
    project: "Palm View Villas",
    lastAction: "Pending Info",
  },
];

export default function Page() {
  const [data, setData] = useState<RequestRecord[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(12);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isRefetching, setIsRefetching] = useState<boolean>(false);

  const fetchRequests = () => {
    setIsRefetching(true);

    setTimeout(() => {
      const filtered = MOCK_REQUESTS.filter((item) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          item.reqNo.toLowerCase().includes(q) ||
          item.project.toLowerCase().includes(q)
        );
      });
      setData(filtered);
      setRowCount(filtered.length);
      setIsRefetching(false);
    }, 200);
  };

  useEffect(() => {
    fetchRequests();
  }, [searchQuery, currentPage, pageSize]);

  const handleGlobalFilterChange = (filter: string) => {
    setSearchQuery(filter);
    setCurrentPage(0);
  };

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0);
  };

  const totalCredits = 200;
  const usedCredits = 80;
  const remainingCredits = totalCredits - usedCredits; // 120
  const usedPercent = (usedCredits / totalCredits) * 100;

  const getStatusClasses = (lastAction: string) => {
    if (lastAction.toLowerCase().includes("completed")) {
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    }
    if (lastAction.toLowerCase().includes("progress")) {
      return "border-amber-200 bg-amber-50 text-amber-700";
    }
    return "border-slate-200 bg-slate-50 text-slate-700";
  };

  return (
    <div className="flex flex-1 flex-col gap-6 py-6 h-[calc(100vh-62px)]">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        {/* Mobile view: toolbar + cards + pagination instead of table */}
        <div className="md:hidden space-y-3">
          <RequestsDataTableToolbar
            onGlobalFilterChange={handleGlobalFilterChange}
          />
          {data.length === 0 ? (
            <div className="rounded-lg border bg-muted/30 p-4 text-center text-xs text-muted-foreground">
              No requests found. Try adjusting your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {MOCK_REQUESTS.map((item) => (
                <Card
                  key={item.id}
                  className="border border-border/60 rounded-xl p-4 flex flex-col gap-3 bg-white shadow-sm hover:shadow-md transition-all"
                >
                  {/* Top Row */}
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-muted-foreground">
                        Request No.
                      </span>
                      <span className="text-sm font-semibold">
                        {item.reqNo}
                      </span>
                    </div>

                    <span
                      className={`
                      text-[10px] px-2 py-0.5 rounded-full font-medium
                      ${
                        item.lastAction === "Completed"
                          ? "bg-green-100 text-green-700"
                          : item.lastAction === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                    >
                      {item.lastAction}
                    </span>
                  </div>

                  {/* Project */}
                  <p className="text-xs font-medium text-foreground line-clamp-2 flex flex-row items-center gap-2">
                    <Home className="h-3 w-3 text-muted-foreground" />
                    {item.project}
                  </p>

                  {/* Info Rows */}
                  <div className="flex justify-between text-[11px]">
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase">
                        Created
                      </p>
                      <p className="font-medium">{item.createdAt}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] text-muted-foreground uppercase">
                        {item.completedAt ? "Completed" : "Status"}
                      </p>
                      <p className="font-medium">
                        {item.completedAt ?? item.lastAction}
                      </p>
                    </div>
                  </div>

                  {/* Download Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-[11px] w-full flex items-center justify-center gap-2"
                  >
                    <Download className="h-3 w-3" />
                    Download
                  </Button>
                </Card>
              ))}
            </div>
          )}
          <div className="pt-1">
            <DataTablePagination
              // dummy table instance – not used by pagination component
              // but required by its props
              table={{} as any}
              pageIndex={currentPage}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              rowCount={rowCount}
            />
          </div>
        </div>

        {/* Tablet / Desktop view: table */}
        <div className="hidden md:grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <DataTable
            data={data}
            toolbar={<RequestsDataTableToolbar />}
            // @ts-ignore
            columns={getRequestColumns()}
            onGlobalFilterChange={handleGlobalFilterChange}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            pageSize={pageSize}
            currentPage={currentPage}
            loading={isRefetching}
            error={""}
            rowCount={rowCount}
            type="requests"
          />
        </div>
      </div>
    </div>
  );
}
