import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const SideBarLink = ({ link, icon, title, sideBarOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  return title == "Logout" ? (
    <NavLink
      end
      to={link}
      style={({ isActive }) => {
        return isActive ? { backgroundColor: "white", height: 42 } : {};
      }}
      onClick={handleLogout}
      className={`px-2 gap-x-5 hover:text-darkblue hover:bg-white py-3 transition-all flex ${
        sideBarOpen ? "" : "justify-center "
      }`}
    >
      {icon}
      {sideBarOpen ? (
        <div className="mx-2 flex text-lg items-center">{title}</div>
      ) : (
        ""
      )}
    </NavLink>
  ) : (
    <NavLink
      end
      to={link}
      style={({ isActive }) => {
        return isActive
          ? {
              color: "#09122C",
              backgroundColor: "white",
              border: "1px solid #DFE1E7",
            }
          : {};
      }}
      className={` items-center  p-3 px-4 hover:border hover:border-[#DFE1E7] hover:text-black text-[#818898] hover:bg-white  my-1 rounded-lg transition-all flex ${
        sideBarOpen ? "    gap-x-5 h-[42px]" : "justify-center"
      }`}
    >
      <div>{icon}</div>
      {sideBarOpen ? (
        <div className="mx-2 flex font-semibold text-[0.9rem]  items-center">
          {title}
        </div>
      ) : (
        ""
      )}
    </NavLink>
  );
};

export default SideBarLink;
