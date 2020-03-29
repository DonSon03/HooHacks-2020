import React, { Component } from 'react';

class UserInfo extends Component{

    constructor(props){
        super(props);
        this.state = this.props;
    }
    
    render(){
        return(
            <Descriptions title="Customer Info">
                <Descriptions.Item label="First Name">{this.props.firstName}</Descriptions.Item>
                <Descriptions.Item label="Last Name">{this.props.lastName}</Descriptions.Item>
                <Descriptions.Item label="Phone Number">{this.props.phoneNumber}</Descriptions.Item>
                <Descriptions.Item label="Address">
                {this.props.address}
                </Descriptions.Item>
            </Descriptions>
        )
    }
}

export default UserInfo;