import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ChevronRight, Palette } from "lucide-react";
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

function AppSetting() {
  const auth = useSelector((state: RootState) => state.auth);
  const { translations } = auth;
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="mt-5 w-full">
      <hr />
      <div className="flex my-6 gap-x-3 items-center">
        <div className="w-[27%] ">
          <div className="font-medium">{translations.LANGUAGE}</div>
          <div className="text-sm text-[#676769]">
            {translations.LANGUAGEDESC}
          </div>
        </div>
        <div className="flex gap-x-3 items-center">
          <SelectLanguage></SelectLanguage>
        </div>
      </div>
      <hr />
      <div className="flex my-6 gap-x-3 items-center">
        <div className="w-[27%] ">
          <div className="font-medium">{translations.THEME}</div>
          <div className="text-sm text-[#676769]">{translations.THEMEDESC}</div>
        </div>
        <div className="flex gap-x-3 items-center">
          <Select
            value={auth.mode}
            onValueChange={(e) => dispatch(setTheme(e))}
          >
            <SelectTrigger
              className="w-fit"
              icon={<Palette className="h-5 w-5" />}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{translations.THEME}</SelectLabel>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="light">Light</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export default AppSetting;
