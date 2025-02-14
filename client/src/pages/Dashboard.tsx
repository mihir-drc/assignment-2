"use client";

import { Bell } from "lucide-react";

import { Button } from "../components/ui/button";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";

import SelectLanguage from "../components/SelectLanguage";
import { Translations } from "../store/slices/AuthSlice";

function Dashboard() {
  const auth = useSelector((state: RootState) => state.auth);
  const { translations } = auth;

  return (
    <>
      <div className="flex items-center ">
        <div className="w-[70%]">
          <div className="text-2xl font-medium h-[36px]">
            {translations.YOURFINANCIALDASHBOARD}
          </div>
          <div className="text-[#666D80] ">
            {translations.WELCOMEBACK}
            {auth.name}
          </div>
        </div>
        <div className="w-[30%]">
          <div className="flex justify-between">
            <Button variant={"white"}>
              <Bell></Bell>
            </Button>
            <SelectLanguage></SelectLanguage>

            <Button variant={"white"}>{translations.EXCHANGERATE}</Button>
          </div>
        </div>
      </div>
      <div className="mt-5"></div>
    </>
  );
}
export default Dashboard;
