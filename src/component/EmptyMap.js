import React, { Component } from 'react';
import { Empty } from 'antd';

class EmptyMap extends Component{
    
    render(){
        return(
            <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
            height: 60,
            }}
            description={
            <span>
                Enter in an address to see surrounding Pharmacies.
            </span>
            }
            >
            </Empty>
        )
    }

}

export default EmptyMap;