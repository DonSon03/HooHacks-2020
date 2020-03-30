import React, { Component } from 'react';

import DistributorLogin from './DistributorLogin'
import Distributor from './Distributor'
import { Row, Col } from 'antd';
import Cookies from 'js-cookie'

class DistributorHome extends Component{

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
                <div className="distributor-dashboard-style">
                    <Distributor/>
                </div>
            );
        } else {
            return (
                <div className="distributor-login-style">
                    <Row>
                        <DistributorLogin/>
                    </Row>
                </div>
            )
        }
    }
}

export default DistributorHome;