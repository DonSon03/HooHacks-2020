import React, { Component } from 'react';
import { Empty } from 'antd';

class EmptyBox extends Component{

    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
            height: 60,
            }}
            description={
            <span>
                {this.props.message}
            </span>
            }
            style={{marginTop:'25%'}}
            >
            </Empty>
        )
    }

}

export default EmptyBox;