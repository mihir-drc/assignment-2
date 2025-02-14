import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { currencies } from "../../assets/currencies";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addAccount } from "../../store/slices/AccountSlice";
import { Translations } from "../../store/slices/AuthSlice";
interface AddAccountDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function AddAccountDialog({ isOpen, setIsOpen }: AddAccountDialogProps) {
  const auth = useSelector((state: RootState) => state.auth);
  const { translations } = auth;
  const dispatch = useDispatch<AppDispatch>();

  const formSchema = z.object({
    userId: z.string(),
    accountNumber: z.string(),
    accountType: z.string(),
    balance: z.string(),
    currency: z.string(),
    bankName: z.string(),
    ifsccode: z.string(),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: auth.id,
      accountNumber: "",
      accountType: "0",
      balance: "",
      currency: "0",
      bankName: "",
      ifsccode: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    dispatch(addAccount(JSON.stringify(values)));
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button>{translations.ADDBANKACCOUNT}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{translations.ADDACCOUNT}</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translations.BANKNAME}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder={translations.BANKNAME} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ifsccode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translations.IFSCCODE}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder={translations.IFSCCODE} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translations.ACCOUNTNUMBER}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={translations.ACCOUNTNUMBER}
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Type</FormLabel>
                      <FormControl>
                        <Select {...field} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0" disabled>
                              {translations.SELECTTYPE}
                            </SelectItem>
                            <SelectItem value="SAVING">
                              {translations.SAVING}
                            </SelectItem>
                            <SelectItem value="CURRENT">
                              {translations.CURRENT}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="balance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translations.BALANCE}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={translations.BALANCE}
                          type="number"
                          step="100"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translations.CURRENCY}</FormLabel>
                      <FormControl>
                        <Select {...field} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px]">
                            <SelectItem value="0" disabled>
                              {translations.SELECTCURRENCY}
                            </SelectItem>
                            {currencies.map((ele) => {
                              return (
                                <SelectItem key={ele.code} value={ele.code}>
                                  <div className="flex items-center gap-x-2">
                                    <div hidden>{ele.name}</div>
                                    <img src={ele.flag} alt="" />
                                    <div>({ele.countryCode})</div>
                                    <div>{ele.name}</div>
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="">
                  <Button type="submit" className="w-full mt-10">
                    {translations.ADDACCOUNT}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default AddAccountDialog;
