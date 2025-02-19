import { ReactNode } from "react";
import { Metadata } from "next";
import ContextProvider from "./context-provider";
import "@/styles/global.css";

interface IRootlayout {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const Rootlayout = ({ children }: IRootlayout) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="p-0 dark">
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
};

export default Rootlayout;
