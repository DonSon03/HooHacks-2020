import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';

import { Spin, Icon, Card, Divider, List, Avatar } from 'antd';

const { Meta } = Card;

class CustomerLogin extends Component{

    constructor(props){
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: '',
            phoneNumber: ''
        };

        this.onFinish = this.onFinish.bind(this);
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        })
    }

    onChangePhoneNumber(e) {
        this.setState({
            phoneNumber: e.target.value
        })
    }
    
    onSubmit(e) {
        e.preventDefault();
    
        const user = {
            firstName: this.state.firstName,
            phoneNumber: this.state.phoneNumber
        }
        console.log(user);
        axios.post('http://localhost:5000/consumers/add', user)
          .then(res => console.log(res.data));
    
        this.setState({
          firstName: '',
          phoneNumber: ''
        })
    }

    onFinish(values){
        console.log(values);
    }

    render(){
        return (
            <Card bordered={true} style={{ backgroundColor:'white', borderRadius:'15px', marginLeft: '10%', marginRight:'5%',marginTop:'10%'}}>
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

                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>First Name: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.firstName}
                            onChange={this.onChangeFirstName}
                        />
                    </div>

                    <div className="form-group"> 
                        <label>Phone Number: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.phoneNumber}
                            onChange={this.onChangePhoneNumber}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>

                </Form>
            </Card>
        );
    }
}

export default CustomerLogin;
