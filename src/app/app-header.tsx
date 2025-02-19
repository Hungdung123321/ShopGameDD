"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import logo from "../../public/images/AppLogo.jpg";
import AppDropdown, { IAppDropdownItem } from "@/components/AppDropDown";
import IC_Home_dark from "../../public/icons/IC_Home_dark";
import IC_Game from "../../public/icons/IC_Game";
import IC_Members from "../../public/icons/IC_Members";
import IC_Event from "../../public/icons/IC_Event";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useAppContext } from "./context-provider";
import { Building2, ShoppingCart, Swords } from "lucide-react";
import { VNvnd } from "@/constants/common";

const data: IAppDropdownItem[] = [
  {
    key: "Profile",
    label: "Profile",
  },
  {
    key: "Libary",
    label: "Libary",
  },
  {
    key: "History",
    label: "History Purchased",
  },
  {
    key: "Payment",
    label: "Payment",
  },
  {
    key: "Sign_Out",
    label: "Sign Out",
  },
];

const data2: IAppDropdownItem[] = [
  {
    key: "Profile",
    label: "Profile",
  },
  {
    key: "Admin",
    label: "Admin",
  },
  {
    key: "Sign_Out",
    label: "Sign Out",
  },
];

const data3: IAppDropdownItem[] = [
  {
    key: "Profile",
    label: "Profile",
  },
  {
    key: "Sign_Out",
    label: "Sign Out",
  },
];
const AppHeader = () => {
  // const { setTheme } = useTheme();
  const { user, setUser } = useAppContext();
  const [team, setTeamData] = useState<any | null>(null);
  useEffect(() => {
    if (user) {
      console.log(user);
      if (user.teamId) {
        const fetchData = async () => {
          const fetchTeam = await fetch(
            `http://localhost:5041/api/DAP/GetDAP/${user.teamId}`
          );
          const rs = await fetchTeam.json();
          setTeamData(rs);
        };
        fetchData();
      } else {
        console.log("Not In team");
      }
    }
  }, []);

  const ChangeRoleLabel = () => {
    switch (user?.userRole) {
      case "DEVELOPER":
        if (user.isleader) {
          return (
            <p className="text-yellow-400 text-base font-medium">Leader</p>
          );
        } else if (user.isleader == false && user.isInTeam === true) {
          return <p className="text-green-600 text-base font-medium">Member</p>;
        } else {
          return <p className="text-white text-base font-medium">None</p>;
        }
      case "USER":
        return <p className="text-white text-base font-medium">User</p>;
      case "ADMIN":
        return <p className="text-red-600 text-base font-medium">Admin1</p>;
      default:
        break;
    }
  };

  const ChangeDropdown = () => {
    switch (user?.userRole) {
      case "USER":
        return (
          <AppDropdown
            items={data}
            ClassName={"mt-2 bg-foreground"}
            MenuButtonElement={DropdownButton}
            onClick={onClick}
            TopItemsElement={() => (
              <div className="w-full">
                <img
                  className="text-center rounded-lg mx-auto"
                  src={user.avartarUrl || "https://placehold.co/600x400"}
                  alt="logo"
                  width={90}
                  height={90}
                />
                <p className="text-center">{user.name}</p>
              </div>
            )}
          />
        );
      case "DEVELOPER":
        return (
          <AppDropdown
            items={data3}
            ClassName={"mt-2 bg-foreground"}
            MenuButtonElement={DropdownButton}
            onClick={onClick}
            TopItemsElement={() => (
              <div className="w-full">
                <img
                  className="text-center rounded-lg mx-auto"
                  src={user.avartarUrl || "https://placehold.co/600x400"}
                  alt="logo"
                  width={90}
                  height={90}
                />
                <p className="text-center">{user.name}</p>
              </div>
            )}
          />
        );
      case "ADMIN":
        return (
          <AppDropdown
            items={data2}
            ClassName={"mt-2 bg-foreground"}
            MenuButtonElement={DropdownButton}
            onClick={onClick2}
            TopItemsElement={() => (
              <div className="w-full">
                <img
                  className="text-center rounded-lg mx-auto"
                  src={user.avartarUrl || "https://placehold.co/600x400"}
                  alt="logo"
                  width={90}
                  height={90}
                />
                <p className="text-center">{user.name}</p>
              </div>
            )}
          />
        );
      default:
        break;
    }
  };

  const DropdownButton = () => {
    return (
      <div>
        {user && (
          <div className="flex flex-row items-center ">
            <img
              className="w-14 h-14 rounded-lg"
              src={user.avartarUrl || "https://placehold.co/600x400"}
              alt="avatar"
            />
            <div className="mx-2">
              <p>{user?.name}</p>
              {ChangeRoleLabel()}
              <p>{VNvnd.format(user?.wallet)}</p>
            </div>
            <p>▼</p>
          </div>
        )}
      </div>
    );
  };

  const onClick = (key: string) => {
    if (key === "Sign_Out") {
      setUser(null);
      redirect("/Login");
    } else if (key === "Libary") {
      redirect("/Libary");
    } else if (key === "History") {
      redirect("/History");
    } else if (key === "Payment") {
      redirect("/Payment");
    } else if (key === "Profile") {
      redirect("/Profile");
    }
  };

  const onClick2 = (key: string) => {
    if (key === "Sign_Out") {
      setUser(null);
      redirect("/Login");
    } else if (key === "Admin") {
      redirect("/Admin");
    } else if (key === "Profile") {
      redirect("/Profile");
    }
  };

  return user ? (
    <div
      className="fixed w-full flex flex-row items-center mb-5 z-10 bg-foreground p-2"
      style={{ position: "sticky", top: 0 }}
    >
      <Image
        className="rounded-lg"
        src={logo}
        alt="logo"
        width={90}
        height={90}
      />

      <div className="w-full ml-1 flex flex-row items-center rounded-lg p-2">
        <div className="flex-1 w-fit flex flex-row items-center">
          <Link className="flex-2 ml-4 mr-2 my-auto p-2" href="/Home">
            <IC_Home_dark className="mx-auto" />
            <p className="text-sm">Home</p>
          </Link>
          {user.userRole === "DEVELOPER" ? (
            <Link className="flex-2 my-auto p-2" href="/YourGames">
              <IC_Game className="mx-auto" />
              <p className="text-sm">Your Games</p>
            </Link>
          ) : (
            <div></div>
          )}
          <Link className="flex-2 mr-2 my-auto p-2" href="/AllGame">
            <Swords width={40} height={40} color="white" className="mx-auto" />
            <p className="text-sm">All Game</p>
          </Link>
          <Link className="flex-2 my-auto p-2" href="/Events">
            <IC_Event className="mx-auto" />
            <p className="text-sm">Events</p>
          </Link>
          <Link className="flex-2 my-auto p-2" href="/ChosesTeams">
            <Building2
              width={40}
              height={40}
              color="white"
              className="mx-auto"
            />
            <p className="text-sm">Find Teams</p>
          </Link>
        </div>
        {ChangeDropdown()}
        <div className="w-1 h-14 bg-slate-700 mx-2 opacity-30"></div>
        {user.userRole === "USER" ? (
          <Link className="my-auto p-2" href="/Cart">
            <ShoppingCart
              width={32}
              height={32}
              color="white"
              className="mx-auto"
            />
            <p className="text-sm text-center">Cart</p>
          </Link>
        ) : (
          <div></div>
        )}
        {user.isInTeam ? (
          <>
            <Link
              href={{
                pathname: "/DapProfile",
                query: { dapid: user.teamId },
              }}
            >
              <div className="w-fit">
                <img
                  className="text-center rounded-lg mx-auto"
                  src={team?.logoUrl || "https://placehold.co/40x40"}
                  alt="logo"
                  width={40}
                  height={40}
                />
                <p className="text-sm text-center">{team?.name}</p>
              </div>
            </Link>
            <Link href={"/Members"} className="ml-3">
              <IC_Members className="mx-auto" />
              <p className="text-sm text-center">
                Members: {team?.usersId?.length || 80}
              </p>
            </Link>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default AppHeader;
