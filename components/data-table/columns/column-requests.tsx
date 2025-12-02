"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface RequestRecord {
  id: string;
  reqNo: string;
  createdAt: string;
  completedAt?: string | null;
  project: string;
  lastAction: string;
}

export function getRequestColumns(): ColumnDef<RequestRecord>[] {
  const columns: ColumnDef<RequestRecord>[] = [
    {
      accessorKey: "reqNo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Req No" />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.original.reqNo}</span>
      ),
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.createdAt}
        </span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "completedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Completed At" />
      ),
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.completedAt || "—"}
        </span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "project",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Project" />
      ),
      cell: ({ row }) => (
        <span className="text-sm font-medium">{row.original.project}</span>
      ),
      enableSorting: true,
    },

    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => (
        <Button variant="outline" size="icon">
          <Download className="h-3 w-3" />
        </Button>
      ),
    },
  ];

  return columns;
}
