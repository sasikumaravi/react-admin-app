import { Col, Input, Form, Row, Button, Radio, Select, Image, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import '../../index.css';
import { UploadOutlined, SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function AddUser() {
  const token = useSelector(value => value.authToken.data.token)
  const [form] = Form.useForm()
  const [status, setStatus] = useState(true)
  const [render, setRender] = useState(false)
  const [baseImage64, setBaseImage64] = useState("")
  const [fileName, setFileName] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [storedValue, setStoredValue] = useState([])
  const navigate = useNavigate()
  const [api, contextHolder] = notification.useNotification();
  let { id } = useParams();

  const roleOptions = [
    {
      value: 'Frontend Developer',
    },

    {
      value: 'Backend Developer',
    },
    {
      value: 'Fullstack Developer',
    },
    {
      value: 'HR',
    },
    {
      value: 'BDE',
    },
  ];
  const countryOptions = [
    {
      value: 'India',
    },
    {
      value: 'Japan',
    },
    {
      value: 'China',
    },
    {
      value: 'England',
    },
  ];
  const stateOptions = [
    {
      value: 'Tamilnadu',
    },
    {
      value: 'Mumbai',
    },
    {
      value: 'Delhi',
    },
    {
      value: 'Kolkata',
    },
  ];
  const cityOptions = [
    {
      value: 'Chennai',
    },
    {
      value: 'Sydney',
    },
    {
      value: 'Joburg',
    },
    {
      value: 'Texas',
    },
  ];
  const options = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  useEffect(() => {
    form.resetFields()
  }, [id])


  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader && reader.readAsDataURL(file);
      reader.onload = () => { resolve(reader.result); setFileName(file) };
      reader.onerror = (error) => reject(error);
    });

  const handleFileChange = async (e) => {
    const files = e.target.files[0]
    setFileName(files)
    const result = await getBase64(files)
    setBaseImage64(result)
    setStatus(false)
  };

  const handleAfterFileupload = async () => {
    const formData = new FormData()
    formData.append('file', fileName);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      }
    }
    try {
      let responseData = await axios.post('https://admin-app-bdsu.onrender.com/image/uploads', formData, config);
      setImageUrl(responseData.data.url);
      setStoredValue({ ...storedValue, imageurl: responseData.data.url })
    }
    catch (err) {
      // console.log(err);
    }
  }


  const onCreate = async (values) => {
    if (imageUrl === "" && !id) {
      return (
        notification.error({
          message: 'Error',
          description: "Image url must be attached",
          placement: 'topRight'
        })
      )
    }

    const { first_name, last_name, email, gender, role, address, country, state, city, imageurl } = values;
    id ? await axios.patch(`https://admin-app-bdsu.onrender.com/api/v1/users/${id}`, { first_name, last_name, email, gender, role, address, country, state, city, imageurl: storedValue.imageurl }, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        if (res.data.success) {
          notification.success({
            message: 'Success',
            description: "User updated successfully",
            placement: 'topRight'
          });
        }
        ; navigate('/dashboard')
      }).catch((err) => {
        console.log(err)
      })
      : await axios.post("https://admin-app-bdsu.onrender.com/api/v1/users/new", { first_name, last_name, email, gender, role, address, country, state, city, imageurl: imageUrl }, { headers: { "Authorization": `Bearer ${token}` } })
        .then(res => {
          if (res.data.success) {
            notification.success({
              message: 'Success',
              description: "New user created success",
              placement: 'topRight'
            });
          }
          ; navigate('/dashboard')
        }).catch((err) => {
          console.log(err)
        }
        )
  }

  useEffect(() => {
    if (id) {
      axios.get(`https://admin-app-bdsu.onrender.com/api/v1/users/${id}`, { headers: { "Authorization": `Bearer ${token}` } }).then(res => {
        ; setStoredValue(res.data.data[0]); form.setFieldsValue({
          first_name: storedValue.first_name,
          last_name: storedValue.last_name,
          address: storedValue.address,
          country: storedValue.country,
          city: storedValue.city,
          email: storedValue.email,
          gender: storedValue.gender,
          role: storedValue.role,
          state: storedValue.state,
          imageurl: storedValue.imageurl
        });
        setRender(true)
      }
      ).catch(err => {
        // console.log('error @ add user', err)
      }
      )
    }
  }, [render])

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => onCreate(values)}
        className='adduser-form'
      >
        <Row justify={'space-between'}>
          <Col span={11}>
            <Form.Item
              label="First Name"
              name="first_name"
              className='user-label'
              rules={[
                {
                  required: true,
                  message: "first name is required"
                }, {
                  pattern: /^[A-Za-z\\s]+$/,
                  message: "First name should contain only aplhabets"
                }
              ]}
            >
              <Input size='large' />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[
                {
                  required: true,
                  message: "Last name is required"
                }, {
                  pattern: /^[A-Za-z\\s]+$/,
                  message: "first name should contain only aplhabets"
                }
              ]}
            >
              <Input size='large' />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={'space-between'}>
          <Col span={11}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please enter email!',
                },
                {
                  pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Please valid email!',
                },

              ]}
            >
              <Input size='large' />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item className='label' label="Gender" name="gender" rules={[{
              required: true,
              message: 'Please enter gender!',
            }]}>
              <Radio.Group
                className='radio'
                size='large'
                block
                options={options}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={'space-between'}>
          <Col span={11}>
            <Form.Item
              className='label'
              label="Role"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Please enter the role"
                }
              ]}

            >
              <Select size="large"
                placeholder="Select a role"

                style={{
                  width: '100%',
                }}
                options={roleOptions}
              />

            </Form.Item>
          </Col>
          <Col span={11}>
            {id ? <Form.Item
              name="file-upload"
              label="Image"
            >
              <Row justify={'space-between'}>
                <input type="file" className='files-choose' onChange={handleFileChange} name="imageurl" />
                {(id && baseImage64 === "" && storedValue.imageurl!==undefined) && <Image height={60} width={50} src={storedValue.imageurl} />}
                {baseImage64 && <Image
                  width={50} height={60}
                  src={baseImage64}
                />}
                <Button size='large' disabled={status} onClick={handleAfterFileupload} className='upload' >Upload Image</Button>
              </Row>
            </Form.Item> : <Form.Item
              name="file-upload"
              label="Image"
              rules={[
                {
                  required: true,
                  message: 'Please upload image'
                }
              ]}
            >
              <Row justify={'space-between'}>
                <input type="file" onChange={handleFileChange} className='files-choose' name="imageurl" />
                {(id && baseImage64 === "") && <img height={60} width={50} src={storedValue.imageurl} alt="" />}
                {baseImage64 && <Image
                  width={50} height={60}
                  src={baseImage64}
                />}
                <Button size='large' disabled={status} onClick={handleAfterFileupload} className='upload' >Upload Image</Button>
              </Row>
            </Form.Item>}
          </Col>
        </Row>
        <Row justify={'space-between'}>
          <Col span={24}>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: 'Please enter address'
                },
              ]}
            >
              <Input.TextArea rows={6} />
            </Form.Item>
          </Col>
          <Col span={1}>
          </Col>
        </Row>
        <Row justify={'space-between'}>
          <Col span={7}>
            <Form.Item
              className='label'
              label="Country"
              name="country"
              rules={[
                {
                  required: true,
                  message: "Please enter the country"
                }
              ]}

            >
              <Select size="large"
                placeholder="Select a country"

                style={{
                  width: '100%',
                }}
                options={countryOptions}
              />

            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              className='label'
              label="State"
              name="state"
              rules={[
                {
                  required: true,
                  message: "Please enter the state"
                }
              ]}

            >
              <Select size="large"
                placeholder="Select a state"

                style={{
                  width: '100%',
                }}
                options={stateOptions}
              />

            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              className='label'
              label="City"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please enter the city"
                }
              ]}

            >
              <Select size="large"
                placeholder="Select a city"

                style={{
                  width: '100%',
                }}
                options={cityOptions}
              />

            </Form.Item>
          </Col>
        </Row>
        <Col>
          {id ? <Form.Item>
            <Button size='large' block className='submit-butn' htmlType="submit">
              Update <SendOutlined />
            </Button>
          </Form.Item> : <Form.Item>
            <Button size='large' className='submit-butn' block htmlType="submit">
              Submit <SendOutlined />
            </Button>
          </Form.Item>}
        </Col>

      </Form>
    </>
  )
}
export default AddUser;


