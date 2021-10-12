import React, { useState } from 'react';
import styled, { keyframes } from "styled-components" 
import 'components/admin/left_menu/styles/ReportStyle.scss';
import { IntlProvider } from 'react-intl';
// import { Link } from "react-router-dom";
import { Link,Switch, Route, useHistory } from 'react-router-dom'
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent } from "react-pro-sidebar";
import { GiBackForth } from "react-icons/gi";
import { AiOutlineSelect } from "react-icons/ai";
import { CgRowFirst,CgRowLast } from "react-icons/cg";
import  { TopMenu } from "./TopMenu"

const ReportLayout = ({ collapsed, toggled, handleToggleSidebar }) => {
    const [ childData, setChildData ] = useState(null);
    const [ cond, setCond ] = useState(false);
    const clickHandle = el =>{ setChildData(el); setCond(prev=>!prev) }

    return (
        <>
            <Container className="ReportLayout">
                <div className="leftMenu">
                    <IntlProvider >
                        <ProSidebar collapsed={collapsed} toggled={toggled} breakPoint="md" onToggle={handleToggleSidebar}>
                                <SidebarHeader>
                                    <div className="headPar"><Link to="/report" >Тайлагнал</Link></div>
                                </SidebarHeader>
                                <SidebarContent >
                                    <Menu iconShape="circle">
                                        {data.map((el, ind)=>{
                                            return(
                                                <SubMenu key={ind} title={el.title} icon={el.icon}>
                                                    {el.child.map((el,ind)=> <MenuItem key={ind}><Link onClick={()=>clickHandle(el)} to="/report">{el.title}</Link> </MenuItem>)}
                                                </SubMenu> 
                                            )
                                        })}
                                    </Menu>
                                </SidebarContent>
                        </ProSidebar>
                    </IntlProvider>
                </div>
                <div className="MainPar">
                <TopMenu childData={childData} cond={cond} />
                </div>
            </Container>
        </>
    )
}

export default ReportLayout;

const animate = keyframes`
    0% { transform:translateX(-300px); opacity:0; }
    100% { transform:translateX(0px); opacity:1; }
`
const Container = styled.div`
    /* background-color:red; */
    width:100%;
    .leftMenu{
        animation: ${animate} 0.4s ease;
        .pro-sidebar {
            width:280px !important;
            .pro-menu.shaped .pro-menu-item > .pro-inner-item > .pro-icon-wrapper {
                animation: ${animate} 0.8s ease;
            }
        }
        
        .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item > .pro-item-content {
            animation: ${animate} 0.8s ease;
        }
    }
    .MainPar{
        width:100%;
        max-width:100%;
    }
    @media only screen and (max-width:1400px){
        .leftMenu{
            .pro-sidebar{
                width:220px !important;
            }
        }
    }
`

const data = [
   
    { title: "Хандсан байгууллагууд",  icon: <AiOutlineSelect /> , child : [
        { title: "Байгууллагууд", //Хэдэн байгууллага хандсанг ААН, Кластераар харуулах
            items: [
                { titles: "Нэрсийн жагсаалтаар", url: "step-one/nersiinjagsaaltaar" , },
                { titles: "Салбараар", url:"step-one/sectors", },
            ]
        },
      ]
    },

    { title: "1-р шат",  icon: <CgRowFirst /> , child : [
        { title: "Шалгуур хангасан байгууллагууд", //Хэдэн байгууллага шалгуур хангасныг ААН, кластераар харуулах
            items: [
                { titles: "Нэрсийн жагсаалтаар" , url:"hedenbaiguullaga", },
                { titles: "Салбараар" },
                { titles: "Ажилчдын тооны ангиллаар"  },
                { titles: "Борлуулалтын хэмжээгээр"  },
                { titles: "Экспортын хэмжээгээр харуулах"  },
                { titles: "Санхүүжилтийн хүсэлтийн хэмжээгээр"  },
                { titles: "Төсөл хэрэгжүүлэх хугацаагаар"  },
                { titles: "Үйл ажиллагаа явуулсан хугацаагаар"  },
            ]
        },

        { title: "Шалгуур хангаагүй байгууллагууд", // Хэдэн байгууллага шалгуур хангаагүйг шалтгаанаар нь харуулах
            items: [
                { titles: "Нэрсийн жагсаалтаар"  },
                { titles: "Татгалзсан шалтгааны төрлөөр"  },
                { titles: "Салбараар"  },
                { titles: "Ажилчдын тооны ангиллаар"  },
                { titles: "Борлуулалтын хэмжээгээр"  },
                { titles: "Экспортын хэмжээгээр харуулах"  },
                { titles: "12 сараас дээш татварын өртэй эсэх, өрийн үлдэгдлийн хэмжээгээр"  },
                { titles: "12 сараас дээш НДШ өр төлбөртэй эсэх, өрийн үлдэгдлийн хэмжээгээр"  },
                { titles: "Монголбанкны муу зээлийн түүхтэй эсэхээр"  },
                { titles: "Үйл ажиллагаа явуулсан хугацаагаар"  },
            ]
        },
      ]
    },

    { title: "2-р шат", icon: <CgRowLast /> , child : [
        { title: "2-р шатанд тэнцсэн болон хандсан байгууллагууд" , //Уг шатанд тэнцсэн болон хандсан байгууллагуудын тоог харуулах ААН болон кластераар
            items: [
                { titles: "Нэрсийн жагсаалтаар"  },
                { titles: "Салбараар"  },
                { titles: "Ажилчдын тоогоор"  },
                { titles: "Борлуулалтын хэмжээгээр"  },
                { titles: "Экспортын хэмжээгээр "  },
                { titles: "Санхүүжилтийн хүсэлтийн хэмжээгээр"  },
                { titles: "Санхүүжилтийн хүсэлтийн төрлөөр"  },
                { titles: "Үнэлгээний хорооны хурлаар орох шалгуур хангасан байгууллагын тоогоор"  },
            ] 
        },
        { title: "Үнэлгээний хороонд танилцуулагдсан байгууллагууд", //Хэдэн байгууллага Үнэлгээний хороонд танилцуулагдсаныг харуулах /ААН, кластераар/
            items: [
                { titles: "Үнэлгээний хорооны шийдвэрээр тэнцсэн байгууллага /тоо/"  },
                { titles: "Нэрсийн жагсаалтаар"  },
                { titles: "Салбараар"  },
                { titles: "Ажилчдын тооны ангиллаар"  },
                { titles: "Экспортын хэмжээгээр"  },
                { titles: "Санхүүжилтийн хүсэлтийн хэмжээгээр"  },
                { titles: "Төсөл хэрэгжүүлэх хугацаагаар"  },
                { titles: "Үйл ажиллагаа явуулсан хугацаагаар"  },
                { titles: "Экспортын гол нэрийн бүтээгдэхүүнээр"  },
                { titles: "Экспортын улсуудаар"  },
                { titles: "Зорилтот экспортын улс болон экспортын орлогын өсөлтөөр"  },
                { titles: "Төслийн хүрээнд экспортлох бүтээгдэхүүн болон экспортын өсөлтөөр"  },
                { titles: "Тэнцсэн болон гэрээ байгуулсанаар"  },
            ] 
        },
        { title: "2-р үе шатнаас түтгэлзсэн байгууллагууд", // Хэдэн байгууллага 2-р үе шатнаас түтгэлзсэнийг харуулах
            items: [
                { titles: "Түтгэлзсэн шалтгаанаар"  },
                { titles: "Нэрсийн жагсаалтаар"  },
                { titles: "Салбараар"  },
                { titles: "Тэнцсэн боловч гэрээ байгуулаагүй байгууллагуудыг нэрсийн жагсаалтаар"  },
            ] 
        },
      ] 
    },

    { title: "Гүйцэтгэл, буцаан олголт", icon: <GiBackForth /> , child : [
        { title: "Гэрээний тайлан /компаниар/" ,
            items: [
                { titles: "Нийт гэрээ байгуулсан байгууллагыг гэрээний дүн болон хийгдэж эхэлсэн ажлаар"  },
                { titles: "Гэрээний дүн болон тайлан илгээсэн хүсэлтийн дүнтэй харьцуулснаар"  },
                { titles: "Гэрээний дүн болон тайлангийн хяналт хийгдэж зөвшөөрөгдсөн дүнгээр "  },
                { titles: "Гэрээний дүн болон буцаан олголтын дүнтэй харьцуулж харуулсан"  },
            ] 
        },
        { title: "Хүсэлт гаргасан болон дууссан ажлын тайлан",
            items: [
                { titles: "Шалгагдаж буй ажлыг чанарын шалгалт болон баримтын шалгалтын хамт компаниар харуулах"  },
                { titles: "Чанар, санхүүгийн баримтанд тэнцсэн ажлыг компаниар"  },
                { titles: "Буцаан олголт хийгдсэн ажлыг компаниар"  },
              
            ] 
        },
        { title: "Хаагдсан гэрээг /компаниар/" ,
            items: [
                { titles: "Шалгуурт тэнцээгүй буюу татгалзсан ажлыг компаниар"  },
                { titles: "Хууран мэхлэх ажиллагаа явуулсан буюу хар жагсаалтанд орсон компанийг нэрсээр"  },
                { titles: "Хууран мэхлэх ажиллагаа явуулсан буюу хар жагсаалтанд орсон туслан гүйцэтгэгч компанийг нэрсээр харуулах"  },
            ] 
        },
      ]
    },

]