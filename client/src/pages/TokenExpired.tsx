import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeToast } from "../store/slices/ToastSlice";
import { sendAgain, Translations } from "../store/slices/AuthSlice";
import { AppDispatch } from "../store/store";

import unionLogo from "../assets/union.svg";
import { useToast } from "../hooks/use-toast";
import { Headset, Mail, ShieldX } from "lucide-react";
import { Button } from "../components/ui/button";
import { Toaster } from "../components/ui/toaster";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import fetchName from "../components/ui/fetchName";
import { Input } from "../components/ui/input";
import SelectLanguage from "../components/SelectLanguage";

function TokenExpired() {
  const toastInfo = useSelector((state: any) => state.toast);
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: any) => state.auth);
  const { translations } = auth; // Fetch translations from Redux state

  const navigate = useNavigate();
  const { toast } = useToast();
  const formSchema = z.object({
    email: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await dispatch(sendAgain(JSON.stringify(values)));
    // if (res.payload.success) navigate("user");
  };
  useEffect(() => {
    if (toastInfo.isToastOpen) {
      console.log("toas");

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
                  <ShieldX />
                </div>
              </div>
            </div>
            <CardTitle className="mx-auto text-center font-medium text-2xl">
              {translations.TOKENEXPIRED}
            </CardTitle>
            <CardDescription className="mx-auto text-base text-center">
              {translations.TOKENEXPIREDDESCRIPTION}
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{fetchName(translations.EMAIL)}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Email "
                          icon={<Mail className="h-5 w-5"></Mail>}
                        ></Input>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="w-full mt-3">
                  <Button
                    type="submit"
                    className="  w-[30%]"
                    disabled={auth.processing}
                  >
                    {auth.processing ? translations.SENDING : translations.SEND}
                  </Button>
                </div>
              </form>
            </Form>
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

export default TokenExpired;
