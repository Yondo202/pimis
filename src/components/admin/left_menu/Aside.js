import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MenuColor, MainFontSize, fontFamily } from "../ThemeAdmin";
import { useIntl } from "react-intl";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import sidebarBg from "./bg_image/bg1.jpg";
import UserContext from '../../../context/UserContext'


const Aside = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
  const ctxUser = useContext(UserContext);

  useEffect(() => {
    let role = localStorage.getItem("role");
    console.log(role);
  }, [ctxUser.userInfo.id]);

  const intl = useIntl();
  return (
    <ProSidebar image={image ? sidebarBg : false} rtl={rtl} collapsed={collapsed} toggled={toggled} breakPoint="md" onToggle={handleToggleSidebar}>
      <SidebarHeader>
        <div className="headPar" >
          <Link to="/"> Экспортыг дэмжих төсөл</Link>
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
<<<<<<< HEAD
            <MenuItem><Link to="/projects"> Бүртгүүлсэн байгууллагууд</Link> </MenuItem>
            <MenuItem><Link to="/financing">Санхүүжилт</Link></MenuItem>
            <MenuItem><Link to="/meetings">Үнэлгээний хорооны уулзалт</Link></MenuItem>
            <MenuItem><Link to="/maindecision">Үнэлгээний хорооны шийдвэр</Link></MenuItem>
            <MenuItem><Link to="/report">Тайлан</Link></MenuItem>
=======
            <MenuItem>
              <Link to="/projects"> Бүртгүүлсэн байгууллагууд</Link>
            </MenuItem>
            <MenuItem>Санхүүжилт</MenuItem>
            <MenuItem>
              <Link to="/meetings">Үнэлгээний хорооны уулзалт</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/maindecision">Үнэлгээний хорооны шийдвэр</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/report">Тайлан</Link>
            </MenuItem>
>>>>>>> e922941075de5f03b45f1661f79e4698f1cbc8a4
          </SubMenu>
          {/* prefix={<span className="badge gray">3</span>} */}
          <SubMenu title="Сургалт" icon={<FaChalkboardTeacher />}>
            <MenuItem>
              <Link to="/trainings">Сургалтууд</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/training-requests">Захиалгат сургалтын хүсэлтүүд</Link>
            </MenuItem>
            <SubMenu title="Тайлангууд">
              <MenuItem>{intl.formatMessage({ id: "submenu" })} 3.3.1 </MenuItem>
              <MenuItem>{intl.formatMessage({ id: "submenu" })} 3.3.2 </MenuItem>
              <MenuItem>{intl.formatMessage({ id: "submenu" })} 3.3.3 </MenuItem>
            </SubMenu>
          </SubMenu>

          <SubMenu title="Тохиргоо" icon={<MdSettings />}>
            <MenuItem>
              <Link to="/users">Хэрэглэгчид</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/epd-information" >Төслийн нэгжийн мэдээлэл</Link>
            </MenuItem>
            <SubMenu title="Түншлэлийн хөтөлбөр">
              <MenuItem>{intl.formatMessage({ id: "submenu" })} 3.1 </MenuItem>
              <MenuItem>{intl.formatMessage({ id: "submenu" })} 3.2 </MenuItem>
            </SubMenu>
            <SubMenu title="Сургалт">
              <MenuItem>
                <Link to="/training-questionnaire">Сургалтын үнэлгээний асуумжууд</Link>
              </MenuItem>
            </SubMenu>
            <SubMenu title="Даатгал">
              <MenuItem>Тохиргоо -1</MenuItem>
            </SubMenu>
            <MenuItem>
              <Link to="/holidays">Амралтын өдөр сонгох</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/accept-periods">Нээлттэй хугацаа тохируулах</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/currency-rates">Ханшийн мэдээлэл оруулах</Link>
            </MenuItem>
          </SubMenu>
          {/* {ctxUser.userInfo.role==="edpadmin"?<SubMenu title="Тохиргоо" icon={<MdSettings />}> </SubMenu>
          :<SubMenu ></SubMenu>} */}
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: "center" }}>
        <div className="sidebar-btn-wrapper" style={{ padding: "10px 24px" }}>   {" "}  © 2021 EDP{" "} </div>
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
