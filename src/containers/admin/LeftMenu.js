import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { MenuColor,MainFontSize,fontFamily } from '../../components/admin/ThemeAdmin'
// import 'antd/dist/antd.css';
// import { Menu, Switch, Divider } from 'antd';
// import {  MailOutlined, CalendarOutlined, AppstoreOutlined, SettingOutlined} from '@ant-design/icons';


import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

// const { SubMenu } = Menu;

function LeftMenu() {
    // const [mode, setMode] = React.useState('inline');
    // const [theme, setTheme] = React.useState('dark');

    // const changeMode = value => {
    //     setMode(value ? 'vertical' : 'inline');
    // };

    // const changeTheme = value => {
    //     setTheme(value ? 'light' : 'dark');
    // };
    return (
        <LeftMenuParent>
            <div className="headPar"> <Link to="/admin" className="item">EDP</Link> </div>

            <ProSidebar>
                <Menu iconShape="square">
                    <MenuItem >Dashboard</MenuItem>
                    <SubMenu title="Components" >
                    <MenuItem>Component 1</MenuItem>
                    <MenuItem>Component 2</MenuItem>
                    </SubMenu>
                </Menu>
            </ProSidebar>


            {/* <Menu
                style={{ width: 256 }}
                // defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode={mode}
                theme={theme}
            >
                <Menu.Item key="1" icon={<MailOutlined />}>
                  Navigation One 
                </Menu.Item>
                <Menu.Item key="2" icon={<CalendarOutlined />}>
                  Navigation Two
                </Menu.Item>
                <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Navigation Two">
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                    <SubMenu key="sub1-2" title="Submenu">
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                    </SubMenu>
                </SubMenu>
                    <SubMenu key="sub2" icon={<SettingOutlined />} title="Navigation Three">
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                </SubMenu>
            </Menu> */}

            {/* <div className="footer">
                <Switch onChange={changeMode} /> Горим
                <Divider type="vertical" />
                <Switch onChange={changeTheme} /> Өнгө
            </div> */}
        </LeftMenuParent>
    )
}

export default LeftMenu

const LeftMenuParent = styled.div`
    font-size:${MainFontSize};
    width:270px;
    height:100vh;
    background-color:${MenuColor};
    font-family:${fontFamily};
    position:relative;
    .ant-menu{
        width:100% !important;
    }
    .headPar{
        border-bottom:1px solid rgba(255,255,255,0.2);
        background-color:${MenuColor};
        display:flex;
        justify-content:start;
        align-items:center;
        height:40px;
        margin-bottom:11px;
        .item{
            padding-left:24px;
            font-weight:600;
            color:#FFFFFFA6;
            font-size:19px;
        }
    }

    .footer{
        position:absolute;
        bottom:10px;
        left:0px;
        padding-left:24px;
        color:rgba(255,255,255, 0.4);
    }
`
