import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { Translations } from "../../store/slices/AuthSlice";

function AccountSetting() {
  const auth = useSelector((state: RootState) => state.auth);
  const { translations } = auth;
  return (
    <div className="mt-5 w-full">
      <hr />
      <div className="flex my-6 gap-x-3 items-center">
        <div className="w-[27%] font-medium">
          {translations.PROFILE}&nbsp;{translations.PHOTO}
        </div>
        <div className="flex gap-x-3 items-center">
          <Avatar>
            <AvatarImage src={auth.photo} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button variant={"white"}>{translations.CHANGE}</Button>
        </div>
      </div>
      <hr />
      <div className="flex my-6 gap-x-3 items-center">
        <div className="w-[27%] ">
          <div className="font-medium">{translations.FULLNAME}</div>
          <div className="text-sm text-[#676769]">
            {translations.FULLNAMEDESC}
          </div>
        </div>
        <div className=" gap-x-3 items-center">
          <div>{auth.name}</div>
          <Button className="p-0 text-sm font-semibold" variant={"ghost"}>
            {translations.EDIT} <ChevronRight></ChevronRight>
          </Button>
        </div>
      </div>
      <hr />
      <div className="flex my-6 gap-x-3 items-center">
        <div className="w-[27%] ">
          <div className="font-medium">{translations.EMAIL}</div>
          <div className="text-sm text-[#676769]">{translations.EMAILDESC}</div>
        </div>
        <div className=" gap-x-3 items-center">
          <div>{auth.email}</div>
          <Button className="p-0 text-sm font-semibold" variant={"ghost"}>
            {translations.EDIT} <ChevronRight></ChevronRight>
          </Button>
        </div>
      </div>
      <hr />
      <div className="flex my-6 gap-x-3 items-center">
        <div className="w-[27%] ">
          <div className="font-medium">{translations.PHONENUMBER}</div>
          <div className="text-sm text-[#676769]">
            {translations.PHONENUMBERDESC}
          </div>
        </div>
        <div className=" gap-x-3 items-center">
          <div>
            {auth.phone ? (
              auth.phone
            ) : (
              <div className="text-[#9c9c9e]">(99) 87675-76439</div>
            )}
          </div>
          <Button className="p-0 text-sm font-semibold" variant={"ghost"}>
            {translations.EDIT} <ChevronRight></ChevronRight>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AccountSetting;
