import React, { Component } from 'react';

import CustomerLogin from './CustomerLogin'
import Customer from './Customer'
import { Row, Col } from 'antd';
import Cookies from 'js-cookie'
import {withRouter} from "react-router-dom"

class CustomerHome extends Component{

    authLogin(){
        var cookieInfo = Cookies.get('customerLogin')
        if(cookieInfo == undefined){
            return false
        }
        //check if correct user
        if(JSON.parse(cookieInfo).firstName == "invalid"){
            Cookies.remove("customerLogin")
            return false
        }
        return true
    }

    render(){
        if(this.authLogin()){
            return (
                <Customer/>
            );
        } else {
            return (
                <div className="customer-login-style">
                    <Row>
                        <CustomerLogin/>
                    </Row>
                </div>
            )
        }
    }
}

export default withRouter(CustomerHome);