import React, { Component } from 'react';

import DistributorLogin from './DistributorLogin'
import BGImage from '../assets/images/background.jpg'
import { Row, Col } from 'antd';

class Customer extends Component{

    constructor(){
        super();
    }

    render(){
        return (

            <div className="App-headers">
                <Row>
                    <DistributorLogin/>
                </Row>
            </div>
        );
    }
}

export default Customer;