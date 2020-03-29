import React, { Component } from 'react';
import Map from './Map'
import { Input } from 'antd';
import EmptyMap from './EmptyMap';
import Chooser from './Chooser'
import { Row, Col } from 'antd';

const { Search } = Input;

class Customer extends Component{

    constructor(){
        super();
        this.state = {usedSearch: false, address: ""}
        this.onSearch = this.onSearch.bind(this);
    }

    componentDidMount(){

    }

    onSearch(value){
        this.setState({
            usedSearch: true,
            address: value
        });
    }

    render(){
        return(
            <div>
        
            {this.state.usedSearch 
                ? <Search placeholder="input search text" disabled /> 
                : <Search placeholder="input search text" onSearch={value => this.onSearch(value)} enterButton />}
            
            {this.state.usedSearch ? <Map address={this.state.address}/> : <EmptyMap />}
            
            </div>
        )
    }

}

export default Customer;