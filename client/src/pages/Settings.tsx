"use client";

import { Bell } from "lucide-react";

import { Button } from "../components/ui/button";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";

import SelectLanguage from "../components/SelectLanguage";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import AccountSetting from "../components/Settings/AccountSetting";
import AppSetting from "../components/Settings/AppSetting";
import PrivacySetting from "../components/Settings/PrivacySetting";
import { Translations } from "../store/slices/AuthSlice";
function Settings() {
  const auth = useSelector((state: RootState) => state.auth);
  const { translations } = auth;
  return (
    <>
      <div className="flex justify-between items-center ">
        <div className="">
          <div className="text-2xl font-medium h-[36px]">
            {translations.SETTINGS}
          </div>
          <div className="text-[#666D80] ">
            {translations.SETTINGSDESCRIPTION}
          </div>
        </div>
        <div className="">
          <div className="flex justify-between gap-x-5">
            <Button variant={"white"}>
              <Bell></Bell>
            </Button>
            <SelectLanguage></SelectLanguage>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Tabs defaultValue="account" className="w-full">
          <TabsList variant="underline">
            <TabsTrigger variant="underline" value="account">
              {translations.ACCOUNT}
            </TabsTrigger>
            <TabsTrigger variant="underline" value="appsetting">
              {translations.SETTINGS}
            </TabsTrigger>
            <TabsTrigger variant="underline" value="security">
              {translations.PRIVACYANDSECURITY}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <AccountSetting></AccountSetting>
          </TabsContent>
          <TabsContent value="appsetting">
            <AppSetting></AppSetting>
          </TabsContent>
          <TabsContent value="security">
            <PrivacySetting></PrivacySetting>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default Settings;
