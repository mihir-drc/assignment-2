import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBarLink from "./SidebarLink";
import {
  Activity,
  ArrowRightLeft,
  ChartCandlestick,
  ChevronLeft,
  ChevronRight,
  Cog,
  Headset,
  HomeIcon,
  LogOut,
  MessageCircleQuestion,
  Users,
  X,
} from "lucide-react";
import logoIcon from "../assets/union.png";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "../hooks/use-toast";
import { closeToast } from "../store/slices/ToastSlice";
import { AppDispatch, RootState } from "../store/store";
import { Toaster } from "./ui/toaster";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";
function Home() {
  const navigate = useNavigate();
  const [sideBarOpen, setsideBarOpen] = useState(true);
  const [cardOpen, setcardOpen] = useState(true);
  const auth = useSelector((state: RootState) => state.auth);
  const toastInfo = useSelector((state: RootState) => state.toast);
  const dispatch = useDispatch<AppDispatch>();

  const { translations } = auth;
  const sideBarLinks = {
    Main: [
      {
        link: "",
        icon: (
          <HomeIcon size={sideBarOpen ? 20 : 17} className="my-auto"></HomeIcon>
        ),
        title: translations.DASHBOARD,
        sideBarOpen: sideBarOpen,
      },
      {
        link: "recieptents",
        icon: <Users size={sideBarOpen ? 20 : 17} className="my-auto"></Users>,
        title: translations.RECIEPTENTS,
        sideBarOpen: sideBarOpen,
      },

      {
        link: "investments",
        icon: (
          <ChartCandlestick
            size={sideBarOpen ? 20 : 17}
            className="my-auto"
          ></ChartCandlestick>
        ),
        title: translations.INVESTMENTS,
        sideBarOpen: sideBarOpen,
      },
      {
        link: "transactions",
        icon: <ArrowRightLeft size={sideBarOpen ? 20 : 17} />,
        title: translations.TRANSACTIONS,
        sideBarOpen: sideBarOpen,
      },
      {
        link: "healthscore",
        icon: (
          <Activity size={sideBarOpen ? 20 : 17} className="my-auto"></Activity>
        ),
        title: translations.HEALTHSCORE,
        sideBarOpen: sideBarOpen,
      },
    ],
    Others: [
      {
        link: "setting",
        icon: <Cog className="my-auto" size={sideBarOpen ? 20 : 17}></Cog>,
        title: translations.SETTINGS,
        sideBarOpen: sideBarOpen,
      },
      {
        link: "gethelp",
        icon: (
          <MessageCircleQuestion
            size={sideBarOpen ? 20 : 17}
            className="my-auto"
          ></MessageCircleQuestion>
        ),
        title: translations.GETHELP,
        sideBarOpen: sideBarOpen,
      },
    ],
  };
  useEffect(() => {
    if (toastInfo.isToastOpen) {
      toast(toastInfo.toastInfo);
      dispatch(closeToast());
    }
  }, [toastInfo.isToastOpen]);
  return (
    <div className={`flex flex-row flex-1 `}>
      <Toaster></Toaster>
      <div
        className={`md:static  md:top-auto h-full overflow-y-auto z-20 
        min-h-screen shadow-2xl transition-all duration-300 ${
          sideBarOpen ? "w-[18%]" : "w-[4%]"
        }`}
      >
        <div className="flex justify-between mt-3 items-center  ps-2  ">
          {sideBarOpen ? (
            <div
              className="flex items-center mx-2 gap-x-3 hover:cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              <div>
                <img
                  src={logoIcon}
                  alt="logo"
                  className="rounded-full w-7  h-w-7"
                />
              </div>

              <div className="text-sm font-semibold whitespace-nowrap">
                Finance App
              </div>
            </div>
          ) : (
            ""
          )}
          <div
            className={`hover:cursor-pointer bg-white rounded-full flex items-center justify-center shadow-md p-2 ${
              sideBarOpen ? "mx-2" : "mx-1"
            }`}
            onClick={() => {
              setsideBarOpen((prev) => {
                return !prev;
              });
            }}
          >
            {sideBarOpen ? (
              <ChevronLeft size={15} />
            ) : (
              <ChevronRight size={15}></ChevronRight>
            )}
          </div>
        </div>
        <div className="mt-6">
          {sideBarLinks &&
            Object.entries(sideBarLinks).map((ele, index) => {
              return (
                <div className={`${sideBarOpen ? "px-3" : "px-2"}`} key={index}>
                  <div className="text-xs my-2 text-[#818898] font-medium">
                    {sideBarOpen && translations[ele[0].toUpperCase()]}
                  </div>
                  {ele[1].map((links, ind) => {
                    return (
                      <SideBarLink
                        key={ind}
                        icon={links.icon}
                        link={links.link}
                        title={links.title}
                        sideBarOpen={sideBarOpen}
                      ></SideBarLink>
                    );
                  })}
                </div>
              );
            })}
          <div className="absolute ms-2 bottom-2">
            <Card hidden={!cardOpen} className="w-[250px] bg-[#F6F8FA] my-2">
              <CardHeader className="py-4 px-3">
                <CardTitle className="flex  justify-between">
                  <div className="flex items-center gap-x-2">
                    <Headset></Headset>
                    {translations.NEEDSUPPORT}
                  </div>
                  <div
                    onClick={() => {
                      setcardOpen(false);
                    }}
                    className="hover:cursor-pointer"
                  >
                    <X size={17}></X>
                  </div>
                </CardTitle>
                <CardDescription className="">
                  {translations.CONTACTSUPPORT}
                  <Button variant={"white"} className="w-full mt-2">
                    {translations.CONTACTUS}
                  </Button>
                </CardDescription>
              </CardHeader>
            </Card>
            <div
              className={`${sideBarOpen ? "" : "hidden"} px-2 py-2 w-[250px]`}
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-x-5 items-center">
                  <Avatar>
                    <AvatarImage src={auth.photo} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="text-[0.9rem]">
                    <div className="font-semibold">{auth.name}</div>
                    <div className="text-sm font-light w-[140px] overflow-scroll">
                      {auth.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center ">
                  <Menubar className="border-0 shadow-none bg-inherit">
                    <MenubarMenu>
                      <MenubarTrigger className="p-1 m-0  border-2 shadow-md border-[#DFE1E7] rounded-full hover:cursor-pointer">
                        <ChevronRight></ChevronRight>
                      </MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem
                          className="gap-x-5"
                          onClick={() => {
                            navigate("setting");
                          }}
                        >
                          <Cog></Cog>
                          {translations.SETTINGS}
                        </MenubarItem>
                        <MenubarSeparator></MenubarSeparator>
                        <MenubarItem
                          className="text-red-500 gap-x-5 focus:text-red-500 hover:text-red-500 "
                          onClick={() => {
                            localStorage.clear();
                            window.open("/", "_self");
                          }}
                        >
                          <LogOut></LogOut>
                          {translations.LOGOUT}
                        </MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex-1 bg-white h-screen overflow-auto">
        <div className="px-8  flex-1 pt-6">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default Home;
