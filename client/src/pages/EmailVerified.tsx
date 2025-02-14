import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeToast } from "../store/slices/ToastSlice";
import { AppDispatch } from "../store/store";

import unionLogo from "../assets/union.svg";
import { useToast } from "../hooks/use-toast";
import { Headset, MailCheck } from "lucide-react";
import { Button } from "../components/ui/button";
import { Toaster } from "../components/ui/toaster";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import SelectLanguage from "../components/SelectLanguage";
import { Translations } from "../store/slices/AuthSlice";

function EmailVerified() {
  const toastInfo = useSelector((state: any) => state.toast);
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: any) => state.auth);
  const { translations } = auth;

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (toastInfo.isToastOpen) {
      toast(toastInfo.toastInfo);
      dispatch(closeToast());
    }
  }, [toastInfo.isToastOpen]);

  return (
    <div className="h-screen w-[91%] mx-auto">
      <Toaster />

      {/* Header with Language Selector */}
      <div className="flex items-center justify-between mx-auto h-[10%]">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="cursor-pointer"
        >
          <img src={unionLogo} alt="Logo" className="w-16 h-16" />
        </div>
        <div className="flex">
          <SelectLanguage></SelectLanguage>
        </div>
      </div>

      {/* Main Card */}
      <div className="min-h-[80%] flex items-center">
        <Card className="w-[33%] mx-auto p-1">
          <CardHeader>
            <div className="mx-auto">
              <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-b from-[#ECEFF3] to-white flex items-center justify-center">
                <div className="h-[48px] w-[48px] rounded-full flex justify-center items-center shadow-lg bg-white">
                  <MailCheck />
                </div>
              </div>
            </div>
            <CardTitle className="mx-auto font-medium text-2xl">
              {translations.EMAILVERIFIED}
            </CardTitle>
            <CardDescription className="mx-auto text-base text-center">
              {translations.YOUREMAILADDRESS} email{" "}
              {translations.FUTURELOGINUSE}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => navigate("/")} className="w-[90%]">
              {translations.CONTINUE}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="flex justify-between h-[10%] items-center">
        <div className="text-[#666D80]">{translations.FOOTERPRODUCT}</div>
        <div>
          <Button variant={"white"}>
            <Headset />
            {translations.GETHELP}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EmailVerified;
