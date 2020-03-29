import React, { Component } from 'react';

import CustomerLogin from './CustomerLogin'
import { Row, Col } from 'antd';

class CustomerHome extends Component{

    render(){
        return (

            <div className="customer-login-style">
                <Row>
                    {/* <Col span={8}> */}
                    <CustomerLogin/>
                    {/* </Col>
                    <Col span={8}>
                    </Col>
                    <Col span={8}>
                        
                    </Col> */}
                </Row>

            </div>
            
        );
    }
}

export default CustomerHome;