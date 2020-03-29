import React, { Component } from 'react';
import { Form, Switch, Button, Card, Divider, notification } from 'antd';
import axios from 'axios';

const { Meta } = Card;

class Chooser extends Component{

    constructor(props){
        super(props);
    }

    onFinish(values){
        
        for(var id in values){
            if(values[id]){
                axios.post('http://localhost:5000/distributors/updateCompanyPhoneList', {id:id, phoneNumber: values.phoneNumber})
                .then(res =>{
                    console.log(res)
                });
            }
        }

        notification['success']({
            message: 'Success!',
            description: "Successful subscribed to pharmacies!",
            duration: 3
        });
      
    }

    render(){
        return(
            <Card bordered={true} style={{ backgroundColor:'white', borderRadius:'15px', marginLeft: '10%', marginRight:'10%', height: '65vh',marginTop:'5%'}}>
            <Meta
                title={<h3><b>Nearest Pharmacies</b></h3>}
                style={{color:'#1A2E33'}}
            />

            <Divider/>
            <Form
                name="validate_other"
                onFinish={this.onFinish}
                initialValues={{
                    phoneNumber: this.props.phoneNumber,
                  }}
            >
            <div style={{overflowY:'scroll', height: '35vh', marginBottom: '10%'}}>   
            {
                this.props.locations.map(
                    location =>
                    <Form.Item name={location.id} label={location.tagName} valuePropName="checked" key={location.indexMap}>
                        <Switch />
                    </Form.Item>
                )
            }
            </div>
            <Form.Item name="phoneNumber" value={this.props.phoneNumber} style={{display:'none'}}>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" htmlType="submit">
                Get Notified!
                </Button>
            </Form.Item>
            </Form>
            </Card>
        )
    }

}

export default Chooser;