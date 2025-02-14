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
import { addAccount, fetchAccounts } from "../../store/slices/AccountSlice";
import { useEffect } from "react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "../../lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Textarea } from "../ui/textarea";
import {
  addTransaction,
  fetchCategories,
  fetchRecievers,
  fetchRecieversAccounts,
} from "../../store/slices/TransactionSlice";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import AutoSuggest from "../ui/autocomplete";
interface AddTransactionDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function AddTransactionDialog({
  isOpen,
  setIsOpen,
}: AddTransactionDialogProps) {
  const auth = useSelector((state: RootState) => state.auth);
  const transaction = useSelector((state: RootState) => state.transaction);
  console.log(auth);

  const { translations } = auth;
  const dispatch = useDispatch<AppDispatch>();
  const accounts = useSelector((state: RootState) => state.account);
  const formSchema = z.object({
    userId: z.string(),
    amount: z.string(),
    bankAccountId: z.string(),
    transactionType: z.string(),
    timePeriod: z.string(),
    category: z.string(),
    description: z.string(),
    transactionDate: z.string(),
    currency: z.string(),
    recieverId: z.string(),
    recieverAccountId: z.string(),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: auth.id,
      amount: "",
      bankAccountId: "0",
      transactionType: "0",
      timePeriod: "0",
      category: "",
      description: "",
      transactionDate: "",
      currency: "",
      recieverId: "0",
      recieverAccountId: "0",
    },
  });
  const transactionType = form.watch("transactionType");
  const bankAccountId = form.watch("bankAccountId");
  const receiverId = form.watch("recieverId");
  console.log(auth);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    alert(JSON.stringify(form.getValues()));
    dispatch(addTransaction(JSON.stringify(values)));
  };
  useEffect(() => {
    dispatch(fetchAccounts());
  }, []);
  useEffect(() => {
    if (transactionType != "TRANSFER") {
      form.setValue("recieverId", "0");
      form.setValue("recieverAccountId", "0");
    }
  }, [transactionType]);
  useEffect(() => {
    dispatch(fetchRecievers(auth.id));
  }, []);
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  useEffect(() => {
    console.log(receiverId);

    if (receiverId != "0")
      dispatch(fetchRecieversAccounts({ id: receiverId, bankAccountId }));
  }, [receiverId, bankAccountId]);
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button>{translations.ADDTRANSACTION}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{translations.ADDTRANSACTION}</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translations.AMOUNT}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder={translations.AMOUNT} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bankAccountId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translations.BANK}</FormLabel>
                      <FormControl>
                        <Select {...field} onValueChange={field.onChange}>
                          <SelectTrigger className="min-h-fit">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px]">
                            <SelectItem value="0" disabled>
                              {translations.SELECTBANK}
                            </SelectItem>
                            {accounts.accounts.map((ele) => {
                              return (
                                <SelectItem
                                  key={ele.id}
                                  value={ele.id.toString()}
                                >
                                  <div className=" gap-x-2">
                                    <div className="font-bold">
                                      {ele.bankName}
                                    </div>
                                    <div className="text-sm">
                                      {ele.accountNumber.replace(
                                        /\d(?=\d{4})/g,
                                        "*"
                                      )}
                                    </div>
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
                <FormField
                  control={form.control}
                  name="transactionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translations.TRANSACTIONTYPE}</FormLabel>
                      <FormControl>
                        <Select {...field} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0" disabled>
                              {translations.SELECT}
                              {translations.TRANSACTIONTYPE}
                            </SelectItem>
                            <SelectItem value="DEPOSIT">
                              {translations.DEPOSIT}
                            </SelectItem>
                            <SelectItem value="WITHDRAW">
                              {translations.WITHDRAW}
                            </SelectItem>
                            <SelectItem value="TRANSFER">
                              {translations.TRANSFER}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {transactionType === "TRANSFER" && (
                  <>
                    <FormField
                      control={form.control}
                      name="recieverId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{translations.RECIEVER}</FormLabel>
                          <FormControl>
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="min-h-fit">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="max-h-[300px]">
                                <SelectItem value="0" disabled>
                                  {translations.RECIEVER}
                                </SelectItem>
                                {transaction.recievers.map((user) => (
                                  <SelectItem
                                    key={user.id}
                                    value={user.id.toString()}
                                  >
                                    <div className="flex items-center gap-x-2">
                                      <div hidden>{user.fullName}</div>

                                      <div>
                                        <Avatar>
                                          <AvatarImage src={auth.photo} />
                                          <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                      </div>
                                      <div>{user.fullName}</div>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {receiverId != "0" && (
                      <FormField
                        control={form.control}
                        name="recieverAccountId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{translations.ACCOUNT}</FormLabel>
                            <FormControl>
                              <Select {...field} onValueChange={field.onChange}>
                                <SelectTrigger className="min-h-fit">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="max-h-[300px]">
                                  {transaction.recieverAccount.length > 0 ? (
                                    <>
                                      <SelectItem value="0" disabled>
                                        {translations.SELECTBANK}
                                      </SelectItem>
                                      {transaction.recieverAccount.map(
                                        (acc) => (
                                          <SelectItem
                                            key={acc.id}
                                            value={acc.id.toString()}
                                          >
                                            <div className="gap-x-2">
                                              <div className="font-bold">
                                                {acc.bankName}
                                              </div>
                                              <div className="text-sm">
                                                {acc.accountNumber.replace(
                                                  /\d(?=\d{4})/g,
                                                  "*"
                                                )}
                                              </div>
                                            </div>
                                          </SelectItem>
                                        )
                                      )}
                                    </>
                                  ) : (
                                    <SelectItem value="0" disabled>
                                      {translations.NOBANKFOUND}
                                    </SelectItem>
                                  )}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </>
                )}

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translations.CATEGORY}</FormLabel>
                      <FormControl>
                        <AutoSuggest
                          value={field.value}
                          onChange={field.onChange}
                          options={transaction.categories}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="transactionDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translations.TRANSACTIONDATE}</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                <>{format(field.value, "PPP")}</>
                              ) : (
                                <span>{translations.PICKDATE}</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={new Date(field.value)}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translations.DESCRIPTION}</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={translations.DESCRIPTION}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="">
                  <Button type="submit" className="w-full mt-10">
                    {translations.ADDTRANSACTION}
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

export default AddTransactionDialog;
