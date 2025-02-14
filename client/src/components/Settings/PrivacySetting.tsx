import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ChevronRight, Lock, Palette } from "lucide-react";
import SelectLanguage from "../SelectLanguage";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { setTheme, Translations } from "../../store/slices/AuthSlice";
import { Input } from "../ui/input";

function PrivacySetting() {
  const auth = useSelector((state: RootState) => state.auth);
  const { translations } = auth;
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="mt-5 w-full">
      <hr />
      <div className="flex my-6 gap-x-3 items-center">
        <div className="w-[27%] ">
          <div className="font-medium">
            {translations.CHANGE}&nbsp;{translations.PASSWORD}
          </div>
          <div className="text-sm text-[#676769]">
            {translations.PASSWORDDESC}
          </div>
        </div>
        <div className=" gap-x-3 items-center">
          <Input
            disabled
            type="password"
            value={11111111111}
            icon={<Lock size={15}></Lock>}
          ></Input>
          <Button variant={"outline"} className="mt-2">
            {translations.CHANGE}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PrivacySetting;
