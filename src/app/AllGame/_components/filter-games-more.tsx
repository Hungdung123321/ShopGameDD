import React, { Ref, useEffect, useRef, useState } from "react";
import AppCollapsible from "@/components/AppCollapsible";
import Currency_Input from "@/components/Inputs/currency-input";
import { FilterGameMutiple } from "./filter-games-mutiple";
import { GenresTable, releaseYears } from "@/constants/dropdown-data";
import { GameFilters } from "@/components/types/game-filter";
import FilterGameMutipleDev from "./FilterGameMutipleDev";
import { undefined } from "zod";

interface IFilterGamesMore {
  ref?: Ref<HTMLDivElement>;
  onChange?: (fiter: GameFilters) => void;
}

const FilterGamesMore = ({ ref, onChange }: IFilterGamesMore) => {
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [genre, setGenre] = useState<string[]>([]);
  const [releaseYear, setReleaseYear] = useState<number[]>([]);
  const [teams, setTeams] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    onChange?.({ minPrice, maxPrice, genre, releaseYear, teams });
  }, [minPrice, maxPrice, genre, releaseYear, teams]);

  return (
    <div className={"w-[200px] space-y-5"} ref={ref}>
      <AppCollapsible value={true} title="Price">
        <p className="text-white">Price range</p>
        <div className="w-full space-y-4">
          <Currency_Input
            className="bg-background text-white p-1 rounded-lg"
            placeholder="Min"
            onCurrencyChange={(e) => setMinPrice(e.float)}
            value={minPrice}
          />
          <Currency_Input
            ref={inputRef}
            className="bg-background text-white p-1 rounded-lg"
            placeholder="Max"
            onCurrencyChange={(e) => setMaxPrice(e.float)}
            value={maxPrice}
          />
        </div>
      </AppCollapsible>
      <AppCollapsible value={true} title="Genre">
        <FilterGameMutiple
          onChange={(e) => setGenre(e)}
          title={"Games"}
          options={GenresTable}
        />
      </AppCollapsible>
      <AppCollapsible value={false} title="Release Year">
        <FilterGameMutiple
          onChange={(e) => {
            const numberYear = e.map((str) => parseInt(str));
            setReleaseYear(numberYear);
          }}
          title={"Year"}
          options={releaseYears}
        />
      </AppCollapsible>
      <AppCollapsible value={false} title="Developers">
        <FilterGameMutipleDev onChange={(e) => setTeams(e)} />
      </AppCollapsible>
    </div>
  );
};

export default FilterGamesMore;
