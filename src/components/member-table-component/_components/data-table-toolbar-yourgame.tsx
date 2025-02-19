"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { GameFeaturesTable, GenresTable } from "@/constants/dropdown-data";
import { DataTableFacetedFilter } from "../data-table-faceted-filter";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbarYourGame<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Filter labels..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("name")?.setFilterValue(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px] text-black"
        />
        {table.getColumn("genres") && (
          <DataTableFacetedFilter
            column={table.getColumn("genres")}
            title="genres"
            options={GenresTable}
          />
        )}
        {table.getColumn("features") && (
          <DataTableFacetedFilter
            column={table.getColumn("features")}
            title="features"
            options={GameFeaturesTable}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
