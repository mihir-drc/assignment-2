import { useLocation, useNavigate } from "react-router-dom";

import unionLogo from "../assets/union.svg";
import { useToast } from "../hooks/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Headset, Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import { Toaster } from "../components/ui/toaster";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeToast } from "../store/slices/ToastSlice";
import { AppDispatch, RootState } from "../store/store";

import SelectLanguage from "../components/SelectLanguage";
import { Translations } from "../store/slices/AuthSlice";
function MailSent() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const toastInfo = useSelector((state: RootState) => state.toast);
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const { translations } = auth;
  const verified = queryParams.get("verified");

  const navigate = useNavigate();

  const { toast } = useToast();
  useEffect(() => {
    if (toastInfo.isToastOpen) {
      toast(toastInfo.toastInfo);
      dispatch(closeToast());
    }
  }, [toastInfo.isToastOpen]);
  useEffect(() => {
    if (verified) {
      toast({
        variant: "success",
        description: "Account verified",
      });
    }
  }, []);

  return (
    <div className="h-screen w-[91%] mx-auto">
      <Toaster />

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
      {/* <div
        className="relative w-[60%] mx-auto rounded-full  bg-cover bg-center"
        style={{
          backgroundImage: `url('src/assets/pattern.png')`,
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
        }}
      > */}
      <div className="min-h-[80%] flex items-center">
        <Card className="w-[33%] mx-auto p-1">
          <CardHeader>
            <div className="mx-auto">
              <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-b from-[#ECEFF3] to-white flex items-center justify-center">
                <div className="h-[48px] w-[48px] rounded-full flex justify-center items-center shadow-lg bg-white">
                  <Mail></Mail>
                </div>
              </div>
            </div>
            <CardTitle className="mx-auto text-center font-medium text-2xl">
              {translations.CHECKMAIL}
            </CardTitle>
            <CardDescription className="mx-auto text-base text-center">
              {translations.FORSECURITY}
              email{translations.CLICKLINK}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* {translations.NOTGETTINGMAIL}
            <div>{translations.SENDAGAIN)}</div> */}
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between h-[10%] items-center">
        <div className="text-[#666D80]">{translations.FOOTERPRODUCT}</div>
        <div>
          <Button variant={"white"}>
            <Headset></Headset>
            {translations.GETHELP}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MailSent;
