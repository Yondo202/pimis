import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import { BsArrowsAngleExpand } from "react-icons/bs"

const Aside = ({ handleToggleSidebar, data, setSelectSectors, setShowSectors }) => {
  const [ datas, setDatas ] = useState(null);

  useEffect(()=>{
   let parent = data?.filter(el=> el.id > 999);
    parent.map(elem=>{
      let final = [];
        data?.map(el=>{ if(elem.id === el.parentId){ final.push(el); } });
      elem["child"] = final;
    })
    if(data){setDatas(parent); }
  },[])
  const intl = useIntl();

  const clickHandle = (el) =>{ setSelectSectors(el); setShowSectors(false); }
  
  return (
    <ProSidebar onToggle={handleToggleSidebar}>
      <SidebarContent >
        <Menu iconShape="circle">
          {/* { data?.filter().map((el,i)=>{
            
          })} */}
          {datas?.map((el,i)=>{
            return(
              <SubMenu title={el.bdescription_mon} icon={<BsArrowsAngleExpand />}>
               { el.child.map((elem,ind)=>{
                 return(
                  <MenuItem onClick={()=>clickHandle(elem.bdescription_mon)} styled={{paddingLeft:30}}>{elem.bdescription_mon}</MenuItem>
                 )
               })}
              </SubMenu>
            )
          }) }
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
};

export default Aside;
