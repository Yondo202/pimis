import React, { useContext } from "react";
import Ctx from "context/UserContext"
import { Link } from "react-router-dom";
// import { MenuColor, MainFontSize, fontFamily } from "../ThemeAdmin";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { MdSettings } from "react-icons/md";
import { AiOutlineMonitor } from "react-icons/ai";
import { BiExport } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { GiProgression } from "react-icons/gi";
// import sidebarBg from "./bg_image/bg1.jpg";

const Aside = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
  const { userInfo } = useContext(Ctx);

  return (
    <ProSidebar image={image ?? false} rtl={rtl} collapsed={collapsed} toggled={toggled} breakPoint="md" onToggle={handleToggleSidebar}>
      <SidebarHeader>
        <div className="headPar" >
          <Link to="/"> Экспортыг дэмжих төсөл</Link>
        </div>
      </SidebarHeader>

      <SidebarContent >
        <Menu iconShape="circle">
            {MenuData.map((el,ind)=>{
               if(userInfo?.role==="edpadmin")
               return <FilterMenu el={el} ind={ind} />

              if(userInfo?.role==="holbootoi_yamd") //zugeer harna
                return el.title==="Мониторинг"?<FilterMenu el={el} ind={ind} />:<div />
                
              if(userInfo?.role==="monitoring") // bugdiin hiine 
                return el.title==="Мониторинг"?<FilterMenu el={el} ind={ind} />:<div />

              if(userInfo?.role==="tosliin_zohitsuulagch") // zugeer harna
                return <FilterMenu el={el} ind={ind} />

              if(userInfo?.role==="ahlah_bhsh")
                return <FilterMenu el={el} ind={ind} />

              if(userInfo?.role==="bh_zovloh") // zowhon harna
                return el.title==="Түншлэлийн хөтөлбөр"?<FilterMenu el={el} ind={ind} />:<div />

              if(userInfo?.role==="bh_ded_zovloh") // zowhon harna
                return el.title==="Түншлэлийн хөтөлбөр"?<FilterMenu el={el} ind={ind} />:<div />

              if(userInfo?.role==="vdd_zovloh")
                return el.title==="Даатгал"?<FilterMenu el={el} ind={ind} />:<div />

              //huuliin_zowloh todorhoigui
              //Санхүү - sanhuujilt gesen tsesiig harna,
              //hudaldanavah_ajillagaa /todorhoigui

              if(userInfo?.role==="dedbureldhuun_heseg_zovloh")
                return el.title==="Тайлан"?<FilterMenu el={el} ind={ind} />:<div />

              if(userInfo?.role==="SPSiin_mergejilten")
                return el.title==="Тайлан оруулах"?<FilterMenu el={el} ind={ind} />:<div />
                  
                return <div />
            })}
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: "center" }}>
        <div className="sidebar-btn-wrapper" style={{ padding: "10px 24px" }}>   {" "}  © 2021 EDP{" "} </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Aside;


const FilterMenu = ({ el, ind }) =>{
  return(
        <SubMenu key={ind} title={el.title} icon={el.icon}>
            {el.MenuChild?.map((elem,ind)=>{
              return(
                <MenuItem key={ind}>
                  <Link to={elem.link}>{elem.text}</Link>
                </MenuItem>
              )
            })}
            {el.SubMenu?.map((elem,ind)=>{
              return(
                <SubMenu key={ind} title={elem.text}>
                  {elem.subChild?.map((elChild, indx)=>{
                    return(
                      <MenuItem key={indx}>
                        <Link to={elChild.link}>{elChild.text}</Link>
                      </MenuItem>
                    )
                  })}
                </SubMenu>
              )
            })}
        </SubMenu>
  )
}

const MenuData = [
  { title:"Түншлэлийн хөтөлбөр", 
    icon:<GiProgression />,
    MenuChild:[
    { link:"/projects", text:"Бүртгүүлсэн байгууллагууд" },
    { link:"/meetings", text:"Сонгон шалгаруулалтын багийн хурал гэснээр солих" },
    { link:"/maindecision", text:"Сонгон шалгаруулалтын багийн хурлын шийдвэр" },
    { link:"/pps-report", text:"Явцын үнэлгээний тайлан" },
    { link:"/report", text:"Тайлан" },
    ] 
  },

  { title:"Сургалт", 
    icon:<FaChalkboardTeacher />,
    MenuChild:[ 
      { link:"/trainings", text:"Сургалтууд" },
      { link:"/training-requests", text:"Захиалгат сургалтын хүсэлтүүд" },
      { link:"/training-report", text:"Тайлан" },
    ] 
  },
  { title:"Даатгал", 
    icon:<FiBookOpen />,
    MenuChild:[ 
      { link:"/insurance", text:"Байгууллагуудын жагсаалт" },
      { link:"/insurance-report", text:"Явцын үнэлгээний тайлан" },
    ],
    SubMenu:[
      { text:"Даатгал", subChild:[ { link:"/insurance-types", text:"Даатгалын бүтээгдэхүүнүүд тохируулах"  } ] }
    ]
  },
  { title:"Мониторинг", 
    icon:<AiOutlineMonitor />,
    MenuChild:[ 
      { link:"/result-measure", text:"Төслийн үр дүнг хэмжих" },
    ],
    SubMenu:[
      { text:"Үндсэн тайлангууд", subChild:[
         { link:"/monitoring-report/0", text:"Хяналт-шинжилгээний тайлан" },
         { link:"/progress-report", text:"Явцын үнэлгээний тайлан" },
         { link:"/evaluation-report/0", text:"Үнэлгээний тайлан" },
         { link:"/completion-report/0", text:"Эцсийн тайлан" },
      ] }
    ]
  },
  { title:"Экспортын мэдээлэл", 
    icon:<BiExport />,
    MenuChild:[ 
      { link:"/export-data", text:"Байгууллагуудын жагсаалт" },
    ],
  },
  { title:"Тохиргоо", 
    icon: <IoSettingsOutline />,
    MenuChild:[
      { link:"/users", text:"Хэрэглэгчид" },
      { link:"/epd-information", text:"Төслийн нэгжийн мэдээлэл" },
      { link:"/", text:"Түншлэлийн хөтөлбөр" },
      { link:"/holidays", text:"Амралтын өдөр сонгох" },
      { link:"/accept-periods", text:"Нээлттэй хугацаа тохируулах" },
      { link:"/laboratories", text:"Лаборторууд" },
      { link:"/currency-rates", text:"Ханшийн мэдээлэл оруулах" },
    ],
    SubMenu:[
      { text:"Сургалт", subChild:[
         { link:"/trainer-organizations", text:"Сургалт зохион байгуулагч байгууллагууд" },
         { link:"/training-questionnaire", text:"Сургалтын үнэлгээний асуумжууд" },
      ] }
    ]
  },


  { title:"Тайлан", 
    icon: <IoSettingsOutline />,
    MenuChild:[
      { link:"/dedburelhuun", text:"Явцын үнэлгээний тайлан" },
    ],
  },

  { title:"Тайлан оруулах", 
    icon: <IoSettingsOutline />,
    MenuChild:[
      { link:"/spsmergijelten", text:"Явцын үнэлгээний тайлан" },
    ],
  },
]
