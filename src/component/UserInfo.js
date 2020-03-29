import React, { Component } from 'react';
import { Descriptions, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

import Cookies from 'js-cookie'

import { Card } from 'antd';

class UserInfo extends Component{

    constructor(props){
        super(props);
        this.state = this.props;
    }

    signout(){
        Cookies.remove('customerLogin')
        window.location.reload()
    }
    
    render(){
        return(

            <Card title={"Welcome " + this.props.firstName} extra={<Button onClick={this.signout} icon={<LogoutOutlined />}></Button>} style={{ height: '50%', borderRadius:'15px', marginLeft: '10%', marginRight:'10%', marginTop:'5%' }}>
                <Descriptions bordered size='small' layout="horizontal">
                {/* <Descriptions.Item label="First Name">{this.props.firstName}</Descriptions.Item> */}
                <Descriptions.Item label="Phone Number">{this.props.phoneNumber}</Descriptions.Item>
                </Descriptions>
            </Card>
            
        )
    }
}

export default UserInfo;