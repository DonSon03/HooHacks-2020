import React, { Component } from 'react';
import { Descriptions } from 'antd';

import { Card } from 'antd';

class UserInfo extends Component{

    constructor(props){
        super(props);
        this.state = this.props;
    }
    
    render(){
        return(

            <Card style={{ height: '50%', borderRadius:'15px', marginLeft: '10%', marginRight:'10%', marginTop:'5%' }}>
                <Descriptions title="Customer Info" bordered size='small' layout="vertical">
                <Descriptions.Item label="First Name">{this.props.firstName}</Descriptions.Item>
                <Descriptions.Item label="Phone Number">{this.props.phoneNumber}</Descriptions.Item>
            </Descriptions>
            </Card>
            
        )
    }
}

export default UserInfo;