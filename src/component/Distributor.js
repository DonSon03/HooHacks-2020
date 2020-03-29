import React, { Component } from 'react';

import DistributorLogin from './DistributorLogin'
import { Row, Col } from 'antd';

class Distributor extends Component{

    constructor(){
        super();
    }

    render(){
        return (

            <div className="distributor-login-style">
                <Row>
                    <DistributorLogin/>
                </Row>
            </div>
        );
    }
}

export default Distributor;