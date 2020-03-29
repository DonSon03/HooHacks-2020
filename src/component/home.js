import React, { Component } from 'react';

import Login from './Login'
import BGImage from '../assets/images/background.jpg'
import { Row, Col } from 'antd';

class Home extends Component{

    constructor(){
        super();
    }

    render(){
        return (

            <div className="App-header">
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