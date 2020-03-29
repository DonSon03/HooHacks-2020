import React, { Component } from 'react';

import DistributorLogin from './DistributorLogin'
import { Row, Col, Button,Card,Typography,Form,InputNumber} from 'antd';
import Cookies from 'js-cookie'
import { LogoutOutlined } from '@ant-design/icons';

const {Title} = Typography
class Distributor extends Component{

    constructor(){
        super();
    }

    signout(){
        Cookies.remove("distributorLogin")
        window.location.reload()
    }

    componentDidMount(){
        console.log(JSON.parse(Cookies.get("distributorLogin")))
        console.log("doneee")
        this.setState({
            user: JSON.parse(Cookies.get("distributorLogin")),
            address: '843-23 Gyeongseo-dong, Seo-gu, Incheon, South Korea',
            TPcount:100,
            HScount:200,
            Mcount:654,
        })
    }
    onFinish(values){
        window.location.reload()
    }
    notify(){
        console.log("notify")
    }

    render(){
        if(this.state!=null){
            return (
                <div>
                    
                    <Card hoverable={true} title = {<Title level={1}>{this.state.user.pharmacyName+" "+this.state.user.companyNumber}</Title>}
                        extra={<Button onClick={this.signout} icon={<LogoutOutlined />}></Button>}
                        bordered={true}
                        style={{ backgroundColor:'white', borderRadius:'15px', marginLeft: '20%', marginRight:'20%',marginTop:'5%'}}
                    >
                        <Title level={3}>{this.state.address}</Title>
                        <Card>
                        <Form onFinish={this.onFinish} initialValues={{'TPcount':this.state.TPcount,Mcount:this.state.Mcount,HScount:this.state.HScount}}>

                            <Form.Item label={<span className="ant-form-text">You currently have </span>}>
                                <Form.Item name="Mcount" noStyle>
                                    <InputNumber min={0}/>
                                </Form.Item>
                                <span className="ant-form-text"> masks</span>
                            </Form.Item>

                            <Form.Item label={<span className="ant-form-text">You currently have </span>}>
                                <Form.Item name="HScount" noStyle>
                                    <InputNumber min={0}/>
                                </Form.Item>
                                <span className="ant-form-text"> hand sanitizers</span>
                            </Form.Item>

                            <Form.Item label={<span className="ant-form-text">You currently have </span>}>
                                <Form.Item name="TPcount" noStyle>
                                    <InputNumber min={0}/>
                                </Form.Item>
                                <span className="ant-form-text"> toilet paper</span>
                            </Form.Item>

                            <div style={{display: 'flex',justifyContent:"flex-end"}}>
                                <div style={{paddingRight:10}}>
                                    <Form.Item >
                                        <Button htmlType="submit">Update</Button>
                                    </Form.Item>
                                </div>
                                <Button onClick={this.notify}>Notify!</Button>
                            </div>
                        </Form>
                        </Card>

                    

                    </Card>
                </div>
            );
        } else {
            return(<div></div>)
        }
        
    }
}

export default Distributor;