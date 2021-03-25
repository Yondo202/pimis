import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { GiProgression } from "react-icons/gi";

const Aside = ({ handleToggleSidebar }) => {

  const intl = useIntl();
  return (
    <ProSidebar onToggle={handleToggleSidebar}>
      <SidebarHeader>
        <div className="headPar" >
          <Link to="/">Салбарууд</Link>
        </div>
      </SidebarHeader>

      <SidebarContent >
        {/* <Menu iconShape="circle">
          <MenuItem icon={<FaTachometerAlt />} suffix={<span className="badge red">{intl.formatMessage({ id: "new" })}</span>}>
            {intl.formatMessage({ id: "dashboard" })}
          </MenuItem>
          <MenuItem icon={<FaGem />}> {intl.formatMessage({ id: "components" })}</MenuItem>
        </Menu> */}
        <Menu iconShape="circle">
          <SubMenu title="Түншлэлийн хөтөлбөр" icon={<GiProgression />}>
            <MenuItem>  <Link to="/projects"> Бүртгүүлсэн байгууллагууд</Link> </MenuItem>
            <MenuItem>Санхүүжилт</MenuItem>
            <MenuItem><Link to="/meetings">Үнэлгээний хорооны уулзалт</Link></MenuItem>
            <MenuItem><Link to="/maindecision">Үнэлгээний хорооны шийдвэр</Link></MenuItem>
          </SubMenu>
          {/* prefix={<span className="badge gray">3</span>} */}
          <SubMenu title="Сургалт" icon={<FaChalkboardTeacher />}>
            <MenuItem>Зохион байгуулах хүсэлт</MenuItem>
            <MenuItem>Сургалтууд</MenuItem>
            <SubMenu title="Тайлангууд">
              <MenuItem>{intl.formatMessage({ id: "submenu" })} 3.3.1 </MenuItem>
              <MenuItem>{intl.formatMessage({ id: "submenu" })} 3.3.2 </MenuItem>
              <MenuItem>{intl.formatMessage({ id: "submenu" })} 3.3.3 </MenuItem>
            </SubMenu>
          </SubMenu>

          <SubMenu title="Тохиргоо" icon={<MdSettings />}>
            <MenuItem>
              <Link to="/users">Хэрэглэгчид</Link>{" "}
            </MenuItem>
            <MenuItem>
                <Link to="/epd-information" >Төслийн нэгжийн мэдээлэл</Link>
             </MenuItem>
            <SubMenu title="Түншлэлийн хөтөлбөр">
              <MenuItem>{intl.formatMessage({ id: "submenu" })} 3.1 </MenuItem>
              <MenuItem>{intl.formatMessage({ id: "submenu" })} 3.2 </MenuItem>
            </SubMenu>
            <SubMenu title="Сургалт">
              <MenuItem>Сургалтын байгууллагууд</MenuItem>
              <MenuItem>Сургалтын төрлүүд</MenuItem>
            </SubMenu>
            <SubMenu title="Даатгал">
              <MenuItem>Тохиргоо -1</MenuItem>
            </SubMenu>
          </SubMenu>
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: "center" }}>
        <div className="sidebar-btn-wrapper" style={{ padding: "10px 24px" }}>   {" "} sectors{" "} </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Aside;
