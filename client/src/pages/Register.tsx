import { useNavigate } from "react-router-dom";

import unionLogo from "../assets/union.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Lock, Mail, User, UserPlus } from "lucide-react";
import { Button } from "../components/ui/button";

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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { register, Translations } from "../store/slices/AuthSlice";
import { Toaster } from "../components/ui/toaster";
import SelectLanguage from "../components/SelectLanguage";
function Register() {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const { translations } = auth;
  const dispatch = useDispatch<AppDispatch>();
  const formSchema = z.object({
    email: z.string(),
    password: z.string(),
    name: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const goToLogin = () => {
    navigate("/");
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await dispatch(register(JSON.stringify(values)));
    if (res.payload.success) navigate("/linksent");
  };

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
            className="mx-1 whitespace-nowrap font-bold underline hover:cursor-pointer w-fit"
            onClick={goToLogin}
          >
            {translations.LOGIN}
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
      <div className="min-h-[80%] items-center flex max-h-[80%]">
        <Card className="w-[33%] h-[10%]  mx-auto p-1">
          <CardHeader className="h-[30%]">
            <div className="mx-auto">
              <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-b from-[#ECEFF3] to-[#f1f3f562] flex items-center justify-center">
                <div className="h-[48px] w-[48px] rounded-full flex justify-center items-center shadow-lg bg-white">
                  <UserPlus></UserPlus>
                </div>
              </div>
            </div>
            <CardTitle className="mx-auto font-medium text-2xl">
              {translations.CREATENEWACCOUNT}
            </CardTitle>
            <CardDescription className="mx-auto text-base">
              {translations.ENTERYOURDETAILSTOREGISTER}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[50%] overflow-auto">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translations.FULLNAME}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Full Name "
                          icon={<User className="h-5 w-5" />}
                        ></Input>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          {...field}
                          type="password"
                          placeholder="Password "
                          icon={<Lock className="h-5 w-5"></Lock>}
                        ></Input>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <Button
                    disabled={auth.processing}
                    type="submit"
                    className="w-full"
                  >
                    {auth.processing
                      ? translations.SIGNINGUP
                      : translations.SIGNUP}
                  </Button>
                </div>
              </form>
              <div className="mx-auto text-[#666D80] font-light w-[90%] text-center mt-5">
                {translations.REGISTERFOOTER}
              </div>
              <div className="underline font-semibold text-center mt-5">
                {translations.TERMSCONDITION}
              </div>
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

export default Register;
