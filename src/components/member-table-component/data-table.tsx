"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { cn } from "@/lib/utils";
import { DataTableToolbarYourGame } from "./_components/data-table-toolbar-yourgame";
import { DataTableToolbarAllUser } from "./_components/data-table-toolbar-alluser";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  RowsPerPageData?: number[];
  TableToolbal?: TableToolbalType;
  className?: string;
  fetchdata?: () => void;
}

export enum TableToolbalType {
  None,
  Member,
  YourGame,
  AllUser,
}

export function DataTable<TData, TValue>({
  columns,
  data,
  RowsPerPageData,
  className,
  TableToolbal = TableToolbalType.Member,
  fetchdata,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: RowsPerPageData?.[0] || 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: pagination,
    },
    meta: {
      fetchdata: () => {
        fetchdata?.();
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // // Handle row click to toggle selection
  // const handleRowClick = (rowId: string) => {
  //   setRowSelection((prev) => ({
  //     ...prev,
  //     [rowId]: !prev[rowId], // Toggle the selection for this row
  //   }));
  // };

  const renderTableToolbal = () => {
    switch (TableToolbal) {
      case TableToolbalType.None:
        return <div></div>;
      case TableToolbalType.Member:
        return <DataTableToolbar table={table} />;
      case TableToolbalType.YourGame:
        return <DataTableToolbarYourGame table={table} />;
      case TableToolbalType.AllUser:
        return <DataTableToolbarAllUser table={table} />;
      default:
        return <DataTableToolbar table={table} />;
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {renderTableToolbal()}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  // onClick={() => handleRowClick(row.id)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination RowsPerPageData={RowsPerPageData} table={table} />
    </div>
  );
}
