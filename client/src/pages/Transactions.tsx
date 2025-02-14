"use client";

import * as React from "react";
import { Bell } from "lucide-react";

import { Button } from "../components/ui/button";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

import SelectLanguage from "../components/SelectLanguage";
import AddTransactionDialog from "../components/Transactions/AddTransactionDialog";
import { Translations } from "../store/slices/AuthSlice";

function Transactions() {
  const auth = useSelector((state: RootState) => state.auth);
  const accounts = useSelector((state: RootState) => state.account);
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  const { translations } = auth;
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="w-[89%]">
          <div className="text-2xl font-medium h-[36px]">
            {translations.TRANSACTIONS}
          </div>
          <div className="text-[#666D80] ">
            {translations.TRANSACTIONSDESCRIPTION}
          </div>
        </div>
        <div className="min-w-[10%] ">
          <div className="flex justify-end gap-x-2">
            <Button variant={"white"}>
              <Bell></Bell>
            </Button>
            <SelectLanguage></SelectLanguage>

            <AddTransactionDialog
              isOpen={isDialogOpen}
              setIsOpen={setIsDialogOpen}
            ></AddTransactionDialog>
          </div>
        </div>
      </div>
      <div className="mt-5"></div>
    </>
  );
}
export default Transactions;
