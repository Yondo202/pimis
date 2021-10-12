import React from "react";
import { Link } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import { FaChalkboardTeacher } from "react-icons/fa";
// import sidebarBg from 'components/admin/left_menu/bg_image/bg1.jpg'

export default function TrainerSidebar({ image, collapsed, rtl, toggled, handleToggleSidebar }) {
   return (
      <ProSidebar image={image ?? false} rtl={rtl} collapsed={collapsed} toggled={toggled} breakPoint="md" onToggle={handleToggleSidebar}>
         <SidebarHeader>
            <div className="headPar">
               <Link to="/">Сургалтын хөтөлбөр</Link>
            </div>
         </SidebarHeader>

         <SidebarContent >
            <Menu iconShape="circle">
               <SubMenu title="Сургалт" icon={<FaChalkboardTeacher />}>
                  <MenuItem>
                     <Link to="/trainings">Сургалтууд</Link>
                  </MenuItem>
                  <MenuItem>
                     <Link to="/training-requests">Захиалгат сургалтын хүсэлтүүд</Link>
                  </MenuItem>
                  <MenuItem>
                     <Link to="/training-report">Тайлан</Link>
                  </MenuItem>
               </SubMenu>

               {/* <SubMenu title="Тохиргоо" icon={<MdSettings />}>
                  <MenuItem>
                     <Link to="/training-report">Тайлан</Link>
                  </MenuItem>
               </SubMenu> */}
            </Menu>
         </SidebarContent>

         <SidebarFooter style={{ textAlign: "center" }}>
            <div className="sidebar-btn-wrapper" style={{ padding: "10px 24px" }}>© 2021 EDP</div>
         </SidebarFooter>
      </ProSidebar>
   );
};
