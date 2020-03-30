import React, { Component } from 'react';

import DistributorLogin from './DistributorLogin'
import { Row, Col, Button,Card,Typography,Form,InputNumber,Input, notification} from 'antd';
import Cookies from 'js-cookie'
import { LogoutOutlined } from '@ant-design/icons';
import axios from 'axios'

const {Title} = Typography
const { TextArea } = Input
class Distributor extends Component{

    constructor(){
        super();
    }

    signout(){
        Cookies.remove("distributorLogin")
        window.location.reload()
    }

    componentDidMount(){
        const cookieInfo = JSON.parse(Cookies.get("distributorLogin"))
        console.log(cookieInfo)

        axios.get('http://localhost:5000/distributors/'+cookieInfo.uid._id)
            .then(res=>{
                this.setState({
                    user: cookieInfo,
                    address: cookieInfo.uid.address,
                    TPcount:res.data.toiletPaper,
                    HScount:res.data.handSanitizers,
                    Mcount:res.data.mask,
                    note:res.data.descriptions
                })
            })
    }

    onFinish(values){
        const cookieInfo = JSON.parse(Cookies.get("distributorLogin"))
        const updateVals = {
            toiletPaper:values.TPcount,
            mask:values.Mcount,
            handSanitizers:values.HScount,
            descriptions:values.note
        }
        axios.post("http://localhost:5000/distributors/update/"+cookieInfo.uid._id,updateVals)
            .then(res=>{
                window.location.reload()
            })

    }
    notify(){
        const cookieInfo = JSON.parse(Cookies.get("distributorLogin"))
        const phoneNumbers = cookieInfo.uid.phone_list;

        for(var number in phoneNumbers){
            const message = "Medical resources have been refilled at " + cookieInfo.uid.pharmacyName + " (Address: " + cookieInfo.uid.address + ")! Come pick up your supplies now!";
            axios.post("http://localhost:5000/api/send_sms/",
            {message: message , phone_number:phoneNumbers[number]})
            .then(res => {
                console.log(res);
            });
        }

        notification['success']({
            message: 'Success!',
            description: "Successfully notified customers!",
            duration: 3
        });

    }

    render(){
        if(this.state!=null){
            return (
                <div>
                    
                    <Card hoverable={true} title = {<Title level={1}>{this.state.user.uid.pharmacyName+" | Phone #"+this.state.user.uid.companyNumber}</Title>}
                        extra={<Button onClick={this.signout} icon={<LogoutOutlined />}></Button>}
                        bordered={true}
                        style={{ backgroundColor:'white', borderRadius:'15px',marginBottom:'5%', marginTop: '5%'}}
                    >
                        <Title level={3}>{"Address: "+this.state.address}</Title>
                        <Card>
                        <Form onFinish={this.onFinish} initialValues={{'TPcount':this.state.TPcount,Mcount:this.state.Mcount,HScount:this.state.HScount,note:this.state.note}}>

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

                            <span className="ant-form-text">Notes:</span>
                            <Form.Item name="note" noStyle>
                                <TextArea rows={7}/>
                            </Form.Item>

                            <div style={{display: 'flex',justifyContent:"flex-end",paddingTop:10}}>
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