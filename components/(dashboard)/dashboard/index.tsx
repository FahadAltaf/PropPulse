"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { RequestsDataTableToolbar } from "@/components/data-table/toolbars/requests-toolbar";
import {
  getRequestColumns,
  type RequestRecord,
} from "@/components/data-table/columns/column-requests";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";

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

  return (
    <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6 h-[calc(100vh-62px)]">
      <div className="flex flex-col">
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

      <Card className="mt-auto  bg-linear-to-br from-primary/5 via-background to-background border border-border/60">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold">
              Credits overview
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Track how many property requests you can still create.
            </p>
          </div>
          <Badge variant="outline" className="gap-1 text-[11px]">
            <Sparkles className="h-3 w-3 text-primary" />
            Active plan
          </Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <div className="text-3xl font-semibold tracking-tight">
                {remainingCredits}
                <span className="ml-1 text-sm font-normal text-muted-foreground">
                  / {totalCredits} credits
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Remaining this billing period
              </p>
            </div>
            <div className="text-right text-xs text-muted-foreground">
              <div className="font-medium text-foreground">
                {usedPercent.toFixed(0)}% used
              </div>
              <div>{usedCredits} credits consumed</div>
            </div>
          </div>

          <Progress value={usedPercent} className="h-2" />
        </CardContent>
      </Card>
    </div>
  );
}
