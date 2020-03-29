import React, { Component } from 'react';

import DistributorLogin from './DistributorLogin'
import Distributor from './Distributor'
import { Row, Col } from 'antd';
import Cookies from 'js-cookie'

class CustomerHome extends Component{

    authLogin(){
        var cookieInfo = Cookies.get('distributorLogin')
        if(cookieInfo == undefined){
            return false
        }
        //check if correct user
        if(JSON.parse(cookieInfo).firstName == "invalid"){
            Cookies.remove("distributorLogin")
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

export default CustomerHome;