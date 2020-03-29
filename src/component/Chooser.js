import React, { Component } from 'react';
import { Transfer } from 'antd';

class Chooser extends Component{

    constructor(props){
        super(props);
        this.state = {
            targetKeys: this.props.targetKeys
        }
    }

    filterOption = (inputValue, location) => 
        // const name = location.name + " (" + index + ")";
        location.name.indexOf(inputValue) > -1;
    

    handleChange = targetKeys => {
        this.setState({ targetKeys });
    };
    
    handleSearch = (dir, value) => {
        console.log('search:', dir, value);
    };
    
    render(){
        return(
            <Transfer
                dataSource={this.props.locations}
                showSearch
                filterOption={this.filterOption}
                targetKeys={this.state.targetKeys}
                onChange={this.handleChange}
                onSearch={this.handleSearch}
                render={item => item.title}
            />
        )
    }

}

export default Chooser;