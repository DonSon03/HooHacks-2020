import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import { MedicineBoxOutlined, PhoneOutlined } from '@ant-design/icons';

import { Spin, Icon, Card, Divider, List, Avatar } from 'antd';

import Cookies from "js-cookie"

const { Meta } = Card;

class DistributorLogin extends Component{

    constructor(props){
        super(props);
        this.state = {};

        this.onFinish = this.onFinish.bind(this);
    }

    onFinish(values){

        const user = {
            pharmacyName: values.pharmacyName,
            companyNumber: values.companyNumber
        }
        axios.post('http://localhost:5000/distributors/add', user)
          .then(res => {
              Cookies.set('distributorLogin',{uid:res.data,...user},{expires:1})
              window.location.reload()
          });
    }

    render(){
        return (
            <Card hoverable={true} bordered={true} style={{ backgroundColor:'white', borderRadius:'15px', marginLeft: '70%', marginRight:'5%',marginTop:'10%'}}>
            <Meta
                title={<div><h1>Supply Me!</h1><i>Distributors</i></div>}
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
            name="pharmacyName"
            rules={[
                {
                required: true,
                message: 'Please input your Pharmacy Name!',
                },
            ]}
            
            
            >
            <Input prefix={<MedicineBoxOutlined className="site-form-item-icon" />} 
                            placeholder="Pharmacy Name" 
                            
                            />
            </Form.Item>
            <Form.Item
            name="companyNumber"
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
            Customers log in <a href="/">here.</a>
            </Form.Item>
            
            </Form>
            </Card>
        );
    }
}

export default DistributorLogin;
