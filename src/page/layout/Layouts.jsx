import img from '../../assets/licensed-image.jpg'
import React, { Suspense, useEffect, useState } from 'react';
import {
    UserAddOutlined,
    AppstoreOutlined,
    SettingOutlined,
    MenuOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Row, Layout, Menu, Col, notification, Avatar, Divider, Button, Spin } from 'antd';
import { Typography, Space, } from 'antd';
import '../../App.css';
import { persistor } from '../../store/ConfigStore';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogout } from '../../redux/actionCreate/ActionCreator';
import { AdminPrivateRouter } from '../../route/AdminRouter';
const { Text, } = Typography;
const { Header, Sider, Content } = Layout;

const Layouts = () => {
    const navigate = useNavigate()
    const firstName = useSelector(value => value.authToken.data.first_name)
    const email = useSelector(value => value.authToken.data.email)
    const location = useLocation()
    const [api, contextHolder] = notification.useNotification();
    const [collapsed, setCollapsed] = useState(false);
    const [tab, setTab] = useState("/dashboard")
    const dispatch = useDispatch()
    useEffect(() => {
        if(location.pathname.split("/")[1] === "edit"){
            setTab("")
        }
        if(location.pathname.split("/")[1] === "template"){
            setTab("/dashboard")
        }
    }, [location])

    const handleChange = () => {
        notification.success({
            message: 'Success',
            description: 'Logout sucessfully',
            placement: 'topRight'
        });
        navigate('/')
        dispatch(handleLogout(persistor.purge()))
    }

    return (
        <>
            {contextHolder}
            <Layout hasSider className='layout'>
                <Sider width={250} className='sider' trigger={null} collapsible collapsed={collapsed}>
                    {!collapsed ? <Row className='profile' >
                        <Row justify="space-evenly">
                            <Avatar shape="square" size={40} src={img} />
                            <Space className='text' direction='vertical' size='1'>
                                <Text className='jost' strong>{firstName}</Text>
                                <Text className='jost' underline>{email}</Text>
                            </Space>
                        </Row >
                        <Col>
                            <MenuOutlined className='menu-button' onClick={() => setCollapsed(!collapsed)} />
                        </Col>

                    </Row>
                        : <MenuOutlined className='menu-button1' onClick={() => setCollapsed(!collapsed)} />}
                    <Divider />
                    <Row className='siderrow'>
                        <Col span={24}>
                            <Menu
                                onClick={({ key }) => {
                                    setTab(key)
                                    navigate(key);
                                }}

                                theme="dark"
                                className='menu'
                                selectedKeys={[`${tab}`]}
                                items={[
                                    {
                                        key: "/dashboard",
                                        icon: <AppstoreOutlined />,
                                        label: 'Dashboard',


                                    },
                                    {
                                        key: '/adduser',
                                        icon: <UserAddOutlined />,
                                        label: 'Add user',
                                    },
                                    {
                                        key: '/settings',
                                        icon: <SettingOutlined />,
                                        label: 'Settings',
                                        disabled: true
                                    },
                                ]}
                            />
                        </Col>
                        <Col span={24} className='loggout'>
                            {!collapsed ? <Row justify={'center'}><Button size='large' block className='logout-button' icon={<LogoutOutlined />} onClick={() => handleChange()}>Logout</Button></Row>
                                : <Row justify={'center'}><Button size='large' block className='logout-button' icon={<LogoutOutlined />} onClick={() => { handleChange() }} /></Row>}
                        </Col>
                    </Row>
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            backgroundColor: 'rgb(42,42,42)'
                        }}
                    >
                        {tab === '/dashboard' && <Text className='texts'>Dashboard</Text>}
                        {location.pathname.split("/")[1] === "adduser" && <Text className='texts'>Add user</Text>}
                        {location.pathname.split("/")[1] === "edit" && <Text className='texts'>Edit user</Text>}
                    </Header>
                    <Content
                        className='content-body'
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                        }}
                    >

                        <Routes>
                            {AdminPrivateRouter.map((value, index) => {
                                let Component = value.component;
                                return (
                                    <Route
                                        key={`value-${index}`}
                                        path={`${value.path}`}
                                        element={
                                            <Suspense
                                                fallback={
                                                    <Row
                                                        justify="center"
                                                        style={{ lineHeight: "697px" }}
                                                    >
                                                        <Col>
                                                            <Spin size="large" />
                                                        </Col>
                                                    </Row>
                                                }
                                            >
                                                <Component />
                                            </Suspense>
                                        }
                                    />
                                )
                            })}
                        </Routes>
                    </Content>
                </Layout>
            </Layout >
        </>
    );
};
export default Layouts;