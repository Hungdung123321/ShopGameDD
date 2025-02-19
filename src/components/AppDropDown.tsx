import {
  Menu,
  MenuButton,
  MenuHeading,
  MenuItem,
  MenuItems,
  MenuSection,
} from "@headlessui/react";
import React, { ReactNode } from "react";

export interface IAppDropdownItem {
  key: string;
  label: string;
}

export interface IAppDropdownCusItem {
  key: string;
  label: string;
  image: string;
}

interface IAppDropdown {
  items?: IAppDropdownItem[] | IAppDropdownCusItem[];
  children?: ReactNode;
  ClassName?: string;
  MenuButtonElement: () => ReactNode;
  TopItemsElement?: () => ReactNode;
  BottomItemsElement?: () => ReactNode;
  ItemsElement?: () => ReactNode;
  onClick?: (key: string) => void;
}

const AppDropdown = (props: IAppDropdown) => {
  const {
    MenuButtonElement,
    TopItemsElement,
    ItemsElement,
    items,
    ClassName,
    onClick,
  } = props;

  return (
    <div className={`${ClassName}`}>
      <Menu>
        <MenuButton>{MenuButtonElement()}</MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          style={{ position: "sticky", top: 0 }}
          className="w-52 origin-top-right rounded-xl z-50 border border-white/5 bg-foreground p-1 text-sm/6  transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuSection>
            <MenuHeading>{TopItemsElement?.()}</MenuHeading>
            {ItemsElement?.() ||
              items?.map((item) => {
                return (
                  <MenuItem key={item.key}>
                    <button
                      onClick={() => {
                        onClick?.(item.key);
                      }}
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                    >
                      {item.label}
                    </button>
                  </MenuItem>
                );
              })}
          </MenuSection>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default AppDropdown;
