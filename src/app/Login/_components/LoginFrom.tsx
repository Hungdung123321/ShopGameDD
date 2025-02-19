"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import React, { useState } from "react";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

enum ELoginFrom {
  SIGN_IN,
  SIGN_UP,
}

function LoginFrom() {
  const [selectedIndex, setSelectedIndex] = useState<number>(
    ELoginFrom.SIGN_IN
  );

  // const { setNavbar } = useAppContextProvider();

  // useEffect(() => {
  //   setNavbar(false);
  // }, [setNavbar]);

  return (
    <TabGroup
      className={"mt-5"}
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
    >
      <TabList className={"flex px-6 "}>
        <Tab className={"flex-1 py-2"}>Sign in</Tab>
        <div className="w-[1px] bg-gray-500"></div>
        <Tab className={"flex-1 py-2"}>Sign up</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SigninForm
            backButtonHref={() => setSelectedIndex(ELoginFrom.SIGN_UP)}
          />
        </TabPanel>
        <TabPanel>
          <SignupForm
            backButtonHref={() => setSelectedIndex(ELoginFrom.SIGN_IN)}
          />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}

export default LoginFrom;
