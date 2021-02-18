import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MenuColor, MainFontSize, fontFamily } from "../ThemeAdmin";

import { useIntl } from "react-intl";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import { FaTachometerAlt, FaGem, FaList, FaRegLaughWink, FaHeart, FaUsers } from "react-icons/fa";
import sidebarBg from "./bg_image/bg1.jpg";

const Aside = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
  const intl = useIntl();
  return (
    <ProSidebar image={image ? sidebarBg : false} rtl={rtl} collapsed={collapsed} toggled={toggled} breakPoint="md" onToggle={handleToggleSidebar}>
      <SidebarHeader>
        <div
          style={{
            backgroundColor:"white",
            padding: "4px 3px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <img style={{width:`100%`}} src="/head.jpg" alt="edp" />
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
          <SubMenu title="Түншлэлийн хөтөлбөр" icon={<FaRegLaughWink />}>
            <MenuItem>Бүртгүүлсэн байгууллагууд</MenuItem>
            <MenuItem>Дэмжлэг хүссэн өргөдлийн маягтууд</MenuItem>
            <MenuItem>Санхүүжилт</MenuItem>
          </SubMenu>
          {/* prefix={<span className="badge gray">3</span>} */}
          <SubMenu  title="Сургалт" icon={<FaHeart />}>
            <MenuItem>Зохион байгуулах хүсэлт</MenuItem>
            <MenuItem>Сургалтууд</MenuItem>
            <SubMenu title="Тайлангууд">
              <MenuItem>{intl.formatMessage({ id: "submenu" })} 3.3.1 </MenuItem>
              <MenuItem>{intl.formatMessage({ id: "submenu" })} 3.3.2 </MenuItem>
              <MenuItem>{intl.formatMessage({ id: "submenu" })} 3.3.3 </MenuItem>
            </SubMenu>
          </SubMenu>
          <SubMenu title="Тохиргоо">
            <MenuItem>
              <Link to="/users">Хэрэглэгчид</Link>{" "}
            </MenuItem>
            <MenuItem> Төслийн нэгжийн мэдээлэл </MenuItem>
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
        <div className="sidebar-btn-wrapper" style={{ padding: "20px 24px" }}>
          {" "}
          footer{" "}
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Aside;

const LeftMenuParent = styled.div`
  font-size: ${MainFontSize};
  width: 270px;
  height: 100vh;
  background-color: ${MenuColor};
  font-family: ${fontFamily};
  position: relative;
`;
