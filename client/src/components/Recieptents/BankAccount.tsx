import React from "react";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Translations } from "../../store/slices/AuthSlice";
import { getCurrencySymbol } from "../../helpers/getCurrencySymbol";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { BankAccountInterface } from "../../interface/Interface";

function BankAccount({ acc }: { acc: BankAccountInterface }) {
  const auth = useSelector((state: RootState) => state.auth);
  const [balanceVisible, setBalanceVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleViewBalance = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBalanceVisible(true);
    }, 1000);
  };
  const { translations } = auth;

  return (
    <div className="p-5 border my-2 rounded-md" key={acc.id}>
      <div className="flex justify-between">
        <div>
          <div className="font-semibold text-xl">{acc.bankName}</div>
        </div>

        <div>
          <Badge>{translations[acc.accountType]}</Badge>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex gap-x-10">
          <div>
            {translations.ACCOUNTNUMBER} :&nbsp;
            {acc.accountNumber.replace(/\d(?=\d{4})/g, "*")}
          </div>
          <div>
            {translations.IFSCCODE} : {acc.ifsccode}
          </div>
        </div>
        <div className="">
          {balanceVisible ? (
            <div className="text-lg font-semibold">
              {acc.balance} {getCurrencySymbol(acc.currency)}
            </div>
          ) : (
            <Button
              onClick={handleViewBalance}
              variant={"white"}
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : ""}
              {translations.VIEWBALANCE}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BankAccount;
