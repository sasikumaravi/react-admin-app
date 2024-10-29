import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Typography, Col, notification } from 'antd';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../redux/actionCreate/ActionCreator';
const { Title } = Typography;

const Login = () => {
  window.addEventListener('popstate', () => {
    navigate('/template')
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const dataFetching = async (values) => {
    try {
      const rawResponse = await fetch('https://admin-app-bdsu.onrender.com/api/v1/admin/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: values.email, password: values.password })
      });
      const content = await rawResponse.json();
      if (!content.success) {
        notification.error({
          message: 'Error',
          description: `Invalid credential`,
          placement: 'topRight',
        });
      }
      if (content.success) {
        navigate('/template')
        notification.success({
          message: 'Success',
          description: `${content?.message}`,
          placement: 'topRight'
        });

      }
      dispatch(fetchData(content))
    }
    catch (err) {
      // console.log(err);
    }
  };

  return (<>
    {contextHolder}
    <Row className='body' justify='center'>

      <Row className='forms-login' justify='space-evenly'>
        <Col span={1}></Col>
        <Col span={22} xs={20} sm={20} md={16} >
          <Form
            form={form}
            layout="vertical"
            onFinish={(values) => { dataFetching(values) }}

          >
            <Row justify='center'><Title className="jost">LOGIN</Title></Row>
            <Form.Item
              label="Email"
              name="email"
              className='form-item'
              rules={[
                {
                  required: true,
                },
                {
                  pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Please valid email!',
                },

              ]}
            >
              <Input className='input' size='large' />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              className='form-items'
              rules={[
                {
                  required: true,
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
            <Row justify="end" className='anchor'>
              <a href="">Forgot password?</a>
            </Row>

            <Form.Item className='form-item'>
              <Button size='large' className='button-login' block type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <Row justify='center'>

              <Form.Item className="jost ref">
                Dont't have an account? <a href="/register">sign up</a>
              </Form.Item>
            </Row>
          </Form>
        </Col>
        <Col span={1}></Col>
      </Row>
    </Row>
  </>
  )
}
export default Login;
