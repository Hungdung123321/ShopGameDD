import React, { useRef, useState } from "react";
import IC_Search from "../../../public/icons/IC_Search";
import IC_Close from "../../../public/icons/IC_Close";

const DropdownMutilSearch = ({
  onChange,
  data,
  defaultValue,
}: {
  onChange?: (data: string[]) => void;
  data: string[];
  defaultValue?: string[];
}) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>(defaultValue || []);
  const [menuOpen, setMenuOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const tags = [
    "Tutorial",
    "HowTo",
    "DIY",
    "Review",
    "Tech",
    "Gaming",
    "Travel",
    "Fitness",
    "Cooking",
    "Vlog",
  ];

  const filteredTags = data.filter(
    (item) =>
      item?.toLocaleLowerCase()?.includes(query.toLocaleLowerCase()?.trim()) &&
      !selected?.includes(item)
  );

  const isDisable: boolean | undefined =
    !query?.trim() ||
    selected?.some(
      (item) =>
        item?.toLocaleLowerCase()?.trim() === query?.toLocaleLowerCase()?.trim()
    );

  return (
    <div className=" w-full h-fit text-sm bg-foreground rounded-lg">
      {selected?.length ? (
        <div className="bg-foreground w-full relative text-xs flex flex-wrap gap-1 p-2 mb-2 rounded-lg">
          {selected.map((tag) => {
            return (
              <div
                key={tag}
                className="rounded-full w-fit py-1.5 px-3 border border-gray-400 bg-gray-50 text-gray-500
                  flex items-center gap-2"
              >
                {tag}
                <div
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setSelected(selected.filter((i) => i !== tag))}
                >
                  <IC_Close />
                </div>
              </div>
            );
          })}
          <div className="w-full text-right">
            <span
              className="text-gray-400 cursor-pointer"
              onClick={() => {
                setSelected([]);
                inputRef.current?.focus();
                onChange?.([]);
              }}
            >
              Clear all
            </span>
          </div>
        </div>
      ) : null}
      <div className="w-full card flex items-center justify-between p-3 w-80 gap-2.5">
        <IC_Search />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value.trimStart())}
          placeholder="Search or Create tags"
          className="bg-transparent text-sm flex-1 caret-rose-600"
          onFocus={() => setMenuOpen(true)}
          onBlur={() => setMenuOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isDisable) {
              setSelected((prev: string[]) => [...prev, query]);
              setQuery("");
              setMenuOpen(true);
              onChange?.([...selected, query]);
            }
          }}
        />
        <button
          className="text-sm disabled:text-gray-300 text-rose-500 disabled:cursor-not-allowed"
          disabled={isDisable}
          onClick={() => {
            if (isDisable) {
              return;
            }
            setSelected((prev: string[]) => [...prev, query]);
            setQuery("");
            inputRef.current?.focus();
            setMenuOpen(true);
            onChange?.([...selected, query]);
          }}
        >
          + Add
        </button>
      </div>

      {/* Menu's */}
      {menuOpen ? (
        <div className="card bg-foreground h-fit w-full max-h-52 mt-2 p-1 flex scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200 rounded-lg">
          <ul className="w-full min-h-[30px] max-h-[200px] overflow-y-scroll grid grid-cols-2">
            {filteredTags?.length ? (
              filteredTags.map((tag, i) => (
                <li
                  key={tag}
                  className="w-fit p-2 text-center cursor-pointer col-span-1 hover:bg-rose-50 hover:text-rose-500 rounded-md w-full"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setMenuOpen(true);
                    setSelected((prev: string[]) => [...prev, tag]);
                    setQuery("");
                    onChange?.([...selected, tag]);
                  }}
                >
                  {tag}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No options available</li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default DropdownMutilSearch;
