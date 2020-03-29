import React, { Component } from 'react';
import { Form, Switch, Button, Card, Divider } from 'antd';

const { Meta } = Card;

class Chooser extends Component{

    constructor(props){
        super(props);
    }

    onFinish(values){
        console.log(values);
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
            >
            <div style={{overflowY:'scroll', height: '35vh', marginBottom: '10%'}}>   
            {
                this.props.locations.map(
                    location =>
                    <Form.Item name={location.indexMap} label={location.tagName} valuePropName="unchecked" key={location.indexMap}>
                        <Switch />
                    </Form.Item>
                )
            }
            </div>
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