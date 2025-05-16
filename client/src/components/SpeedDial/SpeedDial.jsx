import React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Backdrop from "@mui/material/Backdrop";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { userLogOut } from "../../Store/Auth/AuthSliceReducers";

const UserSpeedDial = ({ user }) => {
  // for showing backdrop/blackish screen when focus on speed dial
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //options for showing speed dial actions
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: Orders },
    { icon: <PersonIcon />, name: "Profile", func: Profile },
    {
      icon: <ShoppingCartIcon />,
      name: `Cart`,
      func: Cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: LogoutUser },
  ];

  // console.log(user?.data?.role);

  //   If admin ios active then dashboard also displayed
  if (user?.user?.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: Dashboard,
    });
  }

  //   Functions for speed dial actions
  function Dashboard() {
    navigate("/admin-dashboard");
  }

  function Orders() {
    navigate("/user/orders");
  }
  function Profile() {
    navigate("/profile");
  }
  function Cart() {
    navigate("/cart");
  }
  function LogoutUser() {
    dispatch(userLogOut());
  }
  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="z-50 fixed right-3 top-20"
        icon={<PersonIcon className="text-white " />}
        FabProps={{
          sx: {
            bgcolor: "#f98622",
            "&:hover": {
              bgcolor: "#f98662",
            },
          },
        }}
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserSpeedDial;
