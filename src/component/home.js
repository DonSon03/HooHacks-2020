import React, { Component } from 'react';

import Login from './Login'
import { Row, Col } from 'antd';

class Home extends Component{

    render(){
        return (

            <div className="home-style">
                <Row>
                    {/* <Col span={8}> */}
                    <Login/>
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

export default Home;