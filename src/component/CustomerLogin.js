import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import {Redirect} from "react-router-dom"

import Cookies from "js-cookie"

import { Spin, Icon, Card, Divider, List, Avatar } from 'antd';



const { Meta } = Card;

class CustomerLogin extends Component{

    constructor(props){
        super(props);

        this.state = {redirect: false};

        this.onFinish = this.onFinish.bind(this);
    }

    onFinish(values){

        const user = {
            firstName: values.firstName,
            phoneNumber: values.phoneNumber
        }

        axios.post('http://localhost:5000/consumers/add', user)
            .then(mongoRes =>{

                console.log(mongoRes)

                axios.get('http://localhost:5000/api/get_verification_service?friendly_name=Supply Me', user)
                    .then(getVerificationServiceRes =>{
                        console.log(getVerificationServiceRes)
                        const createdSid = getVerificationServiceRes.data.data.sid
                        const sendPhoneNumber = user.phoneNumber
                        console.log("http://localhost:5000/api/send_verification_token?sid=" + createdSid + "&phone_number=" + sendPhoneNumber)
                        axios.get("http://localhost:5000/api/send_verification_token?sid=" + createdSid + "&phone_number=" + sendPhoneNumber)
                            .then(sendTokenRes =>{

                                this.setState({user: user, redirect:true, sid: createdSid})
                                // Cookies.set('customerLogin',user,{expires:1})
                                // window.location.reload()
                            });
                        
                    });

            });
    
    }

    render(){

        if(this.state.redirect){
            return <Redirect to={{ pathname: '/verify', state: { user: this.state.user, sid: this.state.sid }}} />
        }

        return (
            <Card bordered={true} style={{ backgroundColor:'white', borderRadius:'15px', marginLeft: '10%', marginRight:'5%',marginTop:'10%'}}>
            <Meta
                title={<h1>Supply Me!</h1>}
                style={{color:'#1A2E33', textAlign:'center'}}
            />

            <Divider/>

            <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={this.onFinish}
            style={{textAlign:'center'}}
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
            <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                            placeholder="First Name" 
                            
                            />
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
            Distributors log in: <a href="/distributor">here</a>
            </Form.Item>
            
            </Form>
            </Card>
        );
    }
}

export default CustomerLogin;
