import React, { Component} from 'react';
// import shouldPureComponentUpdate from 'react-pure-render/function';

import { Modal, Button } from 'antd';

import {markerStyle, markerStyleHover} from './marker_style.js';
import axios from 'axios';

export default class Marker extends Component {
//   static propTypes = {
//     // GoogleMap pass $hover props to hovered components
//     // to detect hover it uses internal mechanism, explained in x_distance_hover example
//     $hover: Boolean,
//     text: String
//   };

  static defaultProps = {};

//   shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {visible: false,gid: props.gid}
  }

  componentDidMount(){
    axios.get('/distributors/google/'+this.state.gid)
      .then(res=>{
        this.setState({data:res.data, ...this.state})
      })
  }

    showModal = () => {
        this.setState({
        visible: true,
        });
    };

    handleOk = e => {
        this.setState({
        visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
        visible: false,
        });
    };

  render() {
    const style = this.props.$hover ? markerStyleHover : markerStyle;

    if(this.state.data == null){
      return (
        <div style={style}>
              
              <a href="#" onClick={this.showModal}>{this.props.text}</a>
              {/* <Button type="primary" onClick={this.showModal}>
              Open Modal
              </Button> */}
              <Modal
              title={this.props.locationName}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              >
              <p>Unfortunately, this place is not registered in our website...</p>
              </Modal>
        </div>
      );
    } else {
      return (
        <div style={style}>
              
              <a href="#" onClick={this.showModal}>{this.props.text}</a>
              {/* <Button type="primary" onClick={this.showModal}>
              Open Modal
              </Button> */}
              <Modal
              title={this.props.locationName}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              >
              <p>{"Address: "+this.state.data.address}</p>
              <p>{"Masks Count: "+this.state.data.mask}</p>
              <p>{"Hand Sanitizers Count: "+this.state.data.handSanitizers}</p>
              <p>{"Toilet Paper Count: "+this.state.data.toiletPaper}</p>
              </Modal>
        </div>
      );
    }
  }
}