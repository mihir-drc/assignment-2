import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Globe } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { setLanguage } from "../store/slices/AuthSlice";

function SelectLanguage() {
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Select
      value={auth.language}
      onValueChange={(e) => dispatch(setLanguage(e))}
    >
      <SelectTrigger className="w-fit" icon={<Globe className="h-5 w-5" />}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Language</SelectLabel>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="fr">Français</SelectItem>
          <SelectItem value="hi">Hindi</SelectItem>
          <SelectItem value="gu">Gujarati</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectLanguage;
