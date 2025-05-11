import { useState } from "react";
import { Outlet } from "react-router-dom";

const DashBoardLayout = () => {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div className="w-full min-h-[200vh] relative flex">
      {/* panel  */}
      <div className="lg:w-[300px] hidden lg:block text-black fixed h-screen bg-red-700">
        panel
      </div>
      {/* main  */}
      <div className="w-full lg:w-[calc(100%-300px)] lg:ml-[300px] text-start bg-red-400 text-white">
        main
      </div>
      <Outlet />
    </div>
  );
};
export default DashBoardLayout;
