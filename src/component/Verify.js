import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import {Redirect, withRouter} from "react-router-dom"

import Cookies from "js-cookie"

import { Card, Divider} from 'antd';

const { Meta } = Card;

class Verify extends Component{

    constructor(props){
        super(props);

        this.state = {authenticated: false};

        this.onFinish = this.onFinish.bind(this);
    }

    onFinish(value){

        const {user, sid} = this.props.location.state
        
        axios.get("http://localhost:5000/api/check_verification_token?sid="+sid+"&phone_number="+user.phoneNumber+"&code="+value.code)
            .then(checkTokenRes =>{
                console.log(checkTokenRes)
                if(checkTokenRes.data.data.status === "approved"){
                    Cookies.set('customerLogin',user,{expires:1})
                    this.setState({authenticated: true})
                }
            });
    }

    render(){

        if(this.state.authenticated){
            return <Redirect to={{ pathname: '/' }} />
        }
        
        return (
            <Card bordered={true} style={{ backgroundColor:'white', borderRadius:'15px', marginLeft: '10%', marginRight:'5%',marginTop:'10%'}}>
            <Meta
                title={<h1>Enter verification code</h1>}
                style={{color:'#1A2E33'}}
            />

            <Divider/>

            <Form
            name="normal_login"
            className="login-form"
            onFinish={this.onFinish}
            >
            
            <Form.Item
            name="code"
            >
            <Input
                prefix={<MessageOutlined className="site-form-item-icon" />}
                placeholder=""
            />
            </Form.Item>

            <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
                Submit
            </Button>
            </Form.Item>
            
            </Form>
            </Card>
        );
    }
}

export default withRouter(Verify);
