import React, { Component } from 'react';
import { Transfer } from 'antd';

class Chooser extends Component{

    constructor(props){
        super(props);
        this.state = {
            locations: this.props.locations
        }
    }

    filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

    handleChange = targetKeys => {
        this.setState({ targetKeys });
    };
    
    handleSearch = (dir, value) => {
        console.log('search:', dir, value);
    };
    
    render(){
        return(
            <Transfer
                dataSource={this.state.locations}
                showSearch
                filterOption={this.filterOption}
                targetKeys={this.state.locations}
                onChange={this.handleChange}
                onSearch={this.handleSearch}
                render={item => item.title}
            />
        )
    }

}

export default Chooser;