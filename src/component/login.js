import React, { Component } from 'react';

import { Form, Input, Button } from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';

import { Spin, Icon, Card, Divider, List, Avatar } from 'antd';

const { Meta } = Card;

class Login extends Component{

    constructor(){
        super();
        this.state = {};
        this.onFinish = this.onFinish.bind(this);
    }

    onFinish(values){
        console.log(values);
    }

    render(){
        return (

            <Card bordered={true} style={{ backgroundColor:'white', borderRadius:'15px', marginLeft: '18%', marginRight:'5%',marginTop:'12%'}}>
                <Meta
                    title={<h1>Supply Me!</h1>}
                    style={{color:'#1A2E33'}}
                />

                <Divider/>
                
                <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.onFinish}
                >
                <Form.Item
                name="firstName"
                rules={[
                    {
                    required: true,
                    message: 'Please input your First Name!',
                    },
                ]}
                >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="First Name" />
                </Form.Item>
                <Form.Item
                name="phoneNumber"
                rules={[
                    {
                    required: true,
                    message: 'Please input your Phone Number!',
                    },
                ]}
                >
                <Input
                    prefix={<PhoneOutlined className="site-form-item-icon" />}
                    placeholder="Phone Number"
                />
                </Form.Item>
                
                <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                <br></br>
                <br></br>
                Or <a href="/signup">register now!</a>
                </Form.Item>
                </Form>
        
            </Card>
        );
    }
}

export default Login;

// import React,{useState} from 'react';
// import FormPage from "./FormPage";

// export default function App() {
//   const [onWait,setOnWait] = useState(false)
//   const [isDist,setIsDist] = useState(false)

//   function handlePhoneNumSubmit(event){
//     event.preventDefault();
//     //send info to backend
//     console.log(event)
//     console.log(new FormData(event.target))
//     console.log("phonNum Entered")
//     setOnWait(true)
//   }

//   function handleCodeSubmit(event){
//     event.preventDefault();

//     //send info to backend
//     console.log(new FormData(event.target))
//     console.log("Code Entered")


//   }

//   return (
//     <div>
//       <FormPage />
//       <h2>Login</h2>
//       {onWait ? 
        
//         <form onSubmit={handleCodeSubmit}>
//           <label>Code</label>
//           <input name="codenumber" type="number"/>
//           <button>send!</button>
//         </form>
//       :
//         <form onSubmit={handlePhoneNumSubmit}>
//           <label>Phone number</label>
//           <input name="phonenumber" type="number"/>
//           <button>send!</button>
//         </form>
//       }
//     </div>
//   );
// }
