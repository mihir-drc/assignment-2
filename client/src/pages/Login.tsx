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
import { Input } from "../components/ui/input";
import { Lock, Mail, User2 } from "lucide-react";
import { Button } from "../components/ui/button";

import { Checkbox } from "../components/ui/checkbox";
import { Toaster } from "../components/ui/toaster";
import { useDispatch, useSelector } from "react-redux";
import { closeToast } from "../store/slices/ToastSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { useEffect } from "react";
import { login, Translations } from "../store/slices/AuthSlice";
import { AppDispatch } from "../store/store";
import SelectLanguage from "../components/SelectLanguage";
function Login() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const auth = useSelector((state: any) => state.auth);
  const verified = queryParams.get("verified");
  const toastInfo = useSelector((state: any) => state.toast);
  const navigate = useNavigate();
  const goToRegister = () => {
    navigate("register");
  };
  const { translations } = auth;

  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const formSchema = z.object({
    email: z.string(),
    password: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await dispatch(login(JSON.stringify(values)));
    if (res.payload.success) navigate("user");
  };
  useEffect(() => {
    if (verified) {
      toast({
        variant: "success",
        description: "Account verified",
      });
    }
  }, []);
  useEffect(() => {
    if (toastInfo.isToastOpen) {
      toast(toastInfo.toastInfo);
      dispatch(closeToast());
    }
  }, [toastInfo.isToastOpen]);

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
          {translations.DONTHAVEACCOUNT}
          <span
            className="mx-1 font-bold underline whitespace-nowrap hover:cursor-pointer w-fit"
            onClick={goToRegister}
          >
            {translations.REGISTER}
          </span>
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
                  <User2></User2>
                </div>
              </div>
            </div>
            <CardTitle className="mx-auto font-medium text-2xl">
              {translations.LOGINTOYOURACCOUNT}
            </CardTitle>
            <CardDescription className="mx-auto text-base">
              {translations.ENTERYOURDETAILSTOLOGIN}
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                      <FormLabel>{translations.EMAIL}</FormLabel>
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translations.PASSWORD}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          placeholder="Password "
                          icon={<Lock className="h-5 w-5"></Lock>}
                        ></Input>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between py-2">
                  <div className="flex gap-x-1 items-center">
                    <Checkbox></Checkbox>
                    {translations.REMEMBERME}
                  </div>
                  <div className="hover:underline hover:text-red-500 hover:cursor-pointer">
                    {translations.FORGOTPASSWORD}
                  </div>
                </div>
                <div>
                  <Button type="submit" className="w-full">
                    {translations.SIGNIN}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between h-[10%] items-center">
        <div className="text-[#666D80]">{translations.FOOTERPRODUCT}</div>
        <div>
          <SelectLanguage></SelectLanguage>
        </div>
      </div>
    </div>
  );
}

export default Login;
