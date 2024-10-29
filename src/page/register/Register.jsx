import React from 'react'
import '../../App.css';
import { Form, Input, Button, Row, Typography, Col, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;
export default function Register() {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const onCreate = (values) => {
    (async () => {
      try {
        const rawResponse = await fetch('https://admin-app-bdsu.onrender.com/api/v1/admin/new', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ first_name: values.first_name, last_name: values.last_name, email: values.email, password: values.password })
        });
        const content = await rawResponse.json();
        if (content.success) {
          message.success(`${content.message}`);
          navigate('/');
        } else {
          message.error(`${content.message}`)
        }
      }
      catch (error) {
        // console.log(error);
      }
    })();
    form.resetFields();
  };

  return (
    <Row className='body' >
      <Row className='forms' justify='center'>
        <Col span={1}></Col>
        <Col span={16} xs={20} sm={20} md={8} lg={27} xl={32}>
          <Form
            form={form}
            autoComplete="off"
            layout="vertical"
            onFinish={(values) => onCreate(values)}
            className='reg-form'
          >
            <Row justify='center'><Title className="jost">REGISTER</Title></Row>
            <Form.Item
              label="First Name"
              name="first_name"
              className="jost"
              rules={[
                {
                  required: true,
                }, {
                  pattern: /^[A-Za-z\\s]+$/,
                  message: "first name should contain only aplhabets"
                }
              ]}
            >
              <Input size='large' className='input' />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[
                {
                  required: true,
                }, {
                  pattern: /^[A-Za-z\\s]+$/,
                  message: "first name should contain only aplhabets"
                }
              ]}
            >
              <Input size='large' />
            </Form.Item>
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
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter password"
                }, {
                  pattern: /[A-Z]/,
                  message: 'Password must contain atleast one Uppercase letter'
                },
                {
                  pattern: /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
                  message: "Password should contain atleast one special character"
                },
                {
                  pattern: /^[a-zA-Z0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]{8,}$/,
                  message: 'Password should contain atleast 8 digits'
                }
              ]}
            >
              <Input size='large' />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirm_password"
              rules={[
                {
                  required: true,
                  message: "Please enter the confirm password"
                }, ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password size='large' iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            </Form.Item>
            <Form.Item>
              <Button size='large' className='button' block type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <Row justify='center'>
              <Form.Item className="jost">
                Already have an account? <a href="/">sign in</a>
              </Form.Item>
            </Row>
          </Form>
        </Col>
      </Row>
    </Row>
  )
}
