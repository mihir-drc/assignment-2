"use client";

import * as React from "react";
import {
  Bell,
  ChevronRight,
  Landmark,
  Loader2,
  Plus,
  Search,
} from "lucide-react";

import { Button } from "../components/ui/button";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

import AddAccountDialog from "../components/Recieptents/AddAccountDialog";
import { fetchAccounts } from "../store/slices/AccountSlice";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { getCurrencySymbol } from "../helpers/getCurrencySymbol";
import SelectLanguage from "../components/SelectLanguage";
import { Translations } from "../store/slices/AuthSlice";
import BankAccount from "../components/Recieptents/BankAccount";
import { BankAccountInterface } from "../interface/Interface";

function Recieptents() {
  const auth = useSelector((state: RootState) => state.auth);
  const accounts = useSelector((state: RootState) => state.account);
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  const { translations } = auth;
  const dispatch = useDispatch<AppDispatch>();
  React.useEffect(() => {
    dispatch(fetchAccounts());
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="w-[62%]">
          <div className="text-2xl font-medium h-[36px]">
            {translations.RECIEPTENTS}
          </div>
          <div className="text-[#666D80] ">
            {translations.RECIEPTENTSDESCRIPTION}
          </div>
        </div>
        <div className="max-w-[38%] min-w-[32%] ">
          <div className="flex justify-between gap-x-2">
            <Button variant={"white"}>
              <Bell></Bell>
            </Button>
            <SelectLanguage></SelectLanguage>

            <AddAccountDialog
              isOpen={isDialogOpen}
              setIsOpen={setIsDialogOpen}
            ></AddAccountDialog>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="w-[52%] flex gap-x-2">
          <div className="w-[67%]">
            <Input icon={<Search />} placeholder={translations.SEARCH}></Input>
          </div>
          <div>
            <Button variant={"white"}>
              <Plus></Plus> {translations.ADDRECIEPTENT}
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-5 border rounded-lg p-4">
        <div className="flex gap-x-2 mb-6">
          <div className="font-medium text-xl w-[90%]">
            {translations.YOURACCOUNT}
          </div>
        </div>
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => {
            setIsDialogOpen(true);
          }}
        >
          <div className="flex items-center gap-x-6">
            <div className="w-[56px] h-[56px] rounded-full bg-gradient-to-b from-[#cad0d8] to-white flex items-center justify-center">
              <div className="h-[40px] w-[40px] rounded-full flex justify-center items-center shadow-lg bg-white">
                <Landmark size={20} fontWeight={10}></Landmark>
              </div>
            </div>
            <div className="text-lg font-medium">
              {translations.ADDYOURBANKACCOUNT}
            </div>
          </div>
          <div className="">
            <ChevronRight></ChevronRight>
          </div>
        </div>
        <div className="mt-6 max-h-[170px] overflow-auto">
          {accounts.accounts.map((acc: BankAccountInterface) => {
            return <BankAccount acc={acc}></BankAccount>;
          })}
        </div>
      </div>
      <div className="mt-5 border rounded-lg p-4">
        <div className="flex gap-x-2 mb-6">
          <div className="font-medium text-xl w-[90%]">
            {translations.YOUR}
            {translations.RECIEPTENTS}
          </div>
          <div className="text-end w-[10%]">
            <Button variant={"white"}>
              <Plus></Plus>
              {translations.ADD}
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between"></div>
      </div>
    </>
  );
}
export default Recieptents;
