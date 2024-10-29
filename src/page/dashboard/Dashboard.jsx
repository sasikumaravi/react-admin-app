import React, { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined, AppstoreOutlined, BarsOutlined, } from '@ant-design/icons';
import { Card, Col, Row, notification, Table, Modal, Space, Typography, Divider, Tag, Badge, Button, Segmented, Spin, Tooltip } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

const { Text } = Typography;
const Dashboard = () => {
    const token = useSelector(value => value.authToken.data.token)
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([])
    const [viewData, setViewData] = useState('card')
    const [status, setStatus] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    const [id, setId] = useState("")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    let filteredData = data.filter(value => value.id === id)

    const columns = [
        {
            title: 'Name',
            dataIndex: 'first_name',
            key: 'fname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender) => {
                return (
                    gender === "male" ? <Tag className='male-tag'>
                        {gender}
                    </Tag> : <Tag className='female-tag'>
                        {gender}
                    </Tag>
                )
            },

        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'x',
            render: (data) => <Row > <Button className='edit-button' onClick={() => navigate(`/edit/${data}`)}><EditOutlined /></Button> <Button className='delete-button delete' onClick={() => handleDelete(data)} ><DeleteOutlined /></Button></Row>,
        },
    ];


    let statistics = data.reduce((acc, curr, index) => {
        const { gender, role } = curr;
        if (gender === 'male') {
            acc.male += 1;
        } else if (gender === 'female') {
            acc.female += 1;
        }

        switch (role) {
            case 'Frontend Developer':
                acc.frontend += 1;
                break;
            case 'Backend Developer':
                acc.backend += 1;
                break;
            case 'Fullstack Developer':
                acc.fullstack += 1;
                break;
            case 'BDE':
                acc.bde += 1;
                break;
            case 'HR':
                acc.hr += 1;
                break;
        }

        return { ...acc, total: index + 1 };

    }, { male: 0, female: 0, total: 0, frontend: 0, backend: 0, hr: 0, bde: 0, fullstack: 0 });

    const cardData = [
        {
            label: 'Total',
            icon: <i className="ri-group-line icon"></i>,
            content: statistics.total
        },
        {
            label: 'Male',
            icon: <i className="ri-user-3-line icon"></i>,
            content: statistics.male
        },
        {
            label: 'Female',
            icon: <i className="ri-user-3-line icon"></i>,
            content: statistics.female
        },
        {
            label: 'Frontend',
            icon: <i className="ri-layout-5-line icon"></i>,
            content: statistics.frontend
        },
        {
            label: 'Backend',
            icon: <i className="ri-archive-drawer-line icon"></i>,
            content: statistics.backend
        },
        {
            label: 'HR',
            icon: <i className="ri-linkedin-fill icon"></i>,
            content: statistics.hr
        },
        {
            label: 'BDE',
            icon: <i className="ri-money-dollar-circle-line icon"></i>,
            content: statistics.bde
        },
        {
            label: 'Fullstack',
            icon: <i className="ri-stack-line icon"></i>,
            content: statistics.fullstack
        },


    ]

    const handleDelete = (id) => {
        axios.delete(`https://admin-app-bdsu.onrender.com/api/v1/users/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {
                setStatus(true); if (res.data.success) {
                    notification.success({
                        message: 'Success',
                        description: 'Users deleted success',
                        placement: 'topRight'
                    });
                }
            })
            .catch(err => {
                // console.log(err)
            }
            )
    }

    useEffect(() => {
        setLoading(true);
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        axios.get('https://admin-app-bdsu.onrender.com/api/v1/users', config).then(res => { setData(res.data.data); setLoading(false); }
        ).catch(err => console.log(err))
    }, [status])

    return (
        <>
            {contextHolder}
            <Row gutter={[16, 16]} className='dashboard-body'>
                {cardData.map(items => {
                    return (
                        <Col span={6}>
                            <Card>
                                <Row justify='space-around'>
                                    <Space direction='vertical'>
                                        {items.icon}
                                        <Text className='total'>{items.label}</Text>
                                    </Space>
                                    <Text className='count'>{items.content}</Text>
                                </Row>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
            <Divider className='divider' />
            <Row justify='space-between'><Text className='texts'>USERS</Text> <Segmented
                onChange={(values) => setViewData(values)}
                options={[

                    {
                        value: 'card',
                        icon: <AppstoreOutlined />,
                    },
                    {
                        value: 'table',
                        icon: <BarsOutlined />,
                    },

                ]}
            /></Row>
            {viewData === 'card' ? <Row gutter={[16, 16]}>
                {data.map(value => {
                    return (

                        <Col span={4} key={value.id}>
                            <Card
                            loading={loading}
                                style={{
                                    height: 192,
                                    width: 164,
                                    background: 'black',
                                    border: '1px solid grey',

                                }}
                            >
                                <Col className="col-card">
                                    <img
                                        alt="example"
                                        src={value.imageurl}
                                        className='card-image'
                                        onClick={() => { setOpen(true); setId(value.id) }}

                                    />
                                    <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
                                        <Tooltip placement="top" title={value.first_name}>
                                            <Text ellipsis className='first-name-text'>{value.first_name} {value.last_name}</Text>
                                        </Tooltip>
                                    </Space>
                                    <Space className='div-parent' direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
                                        <Tooltip placement="top" title={value.email}>
                                            <Text className='email-text'>{value.email}</Text>
                                        </Tooltip>
                                    </Space>
                                    <Space className='space-col' direction="horizontal" style={{ width: '100%', justifyContent: 'space-around' }}>
                                        <EditOutlined className='edit-button' onClick={() => navigate(`/edit/${value.id}`)} />
                                        <DeleteOutlined onClick={() => handleDelete(value.id)} className='delete-button' />
                                    </Space>
                                </Col>
                            </Card>
                        </Col>

                    )
                })}
            </Row> : <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={{ pageSize: 3 }}
            />}
            {filteredData.map(value => {
                return (
                    <Modal
                        key={value.id}
                        open={open}
                        onCancel={() => setOpen(false)}
                        destroyOnClose
                        className='modal'
                    >
                        <Text ellipsis={true} className='card-text'>{value.first_name} {value.last_name}</Text><Tag className='tag-content' color="#2d38b6"><i class="ri-user-3-fill"></i>{value.role}</Tag>
                        <img
                            alt="example"
                            src={value.imageurl}
                            className='card-image'
                            style={{
                                height: 100,
                                width: 100,
                                padding: 4,
                                border: 'solid 1px grey',
                                position: 'absolute',
                                top: 110,
                                left: 0,
                                zIndex: 1

                            }}

                        />
                        <Badge.Ribbon text={value.gender === 'male' ? <i class="ri-men-line"></i> : <i class="ri-women-line"></i>}>
                            <Card
                                onClick={() => setOpen(true)}
                                style={{
                                    height: 300,
                                    width: 400,
                                    background: 'rgba(43, 43, 43, 1)',
                                    margin: 'auto',
                                    marginTop: 60,
                                    zIndex: 0
                                }}
                            >
                                <Col className="col-card">
                                    <Space direction="horizontal" style={{ width: '100%' }}>
                                        <Text ellipsis={true} strong className='first-name-text'>Name:</Text><Text className='first-name-text-value'>{value.email}</Text>
                                    </Space>
                                    <Space direction="horizontal" style={{ width: '100%' }}>
                                        <Text ellipsis={true} strong className='first-name-text'>Address:</Text><Text className='first-name-text-value'>{value.address}</Text>
                                    </Space>
                                    <Space direction="horizontal" style={{ width: '100%' }}>
                                        <Text ellipsis={true} strong className='first-name-text'>Created at:</Text><Text className='first-name-text-value'>{value.created_at}</Text>
                                    </Space>

                                    <Space classNames='modal-button' className='space-col' direction="horizontal" style={{ width: '100%', justifyContent: 'space-between', marginTop: '130px' }}>
                                        <Button className='edit-button' onClick={() => navigate(`/edit/${value.id}`)} ><EditOutlined /> Edit</Button>
                                        <Button className='delete-button' onClick={() => handleDelete(value.id)} ><DeleteOutlined /> Delete</Button>
                                    </Space>
                                </Col>
                            </Card>
                        </Badge.Ribbon>
                    </Modal >
                )
            })
            }
        </>
    )
};
export default Dashboard;