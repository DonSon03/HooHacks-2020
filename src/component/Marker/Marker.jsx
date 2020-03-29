import React, { Component} from 'react';
// import shouldPureComponentUpdate from 'react-pure-render/function';

import { Modal, Button } from 'antd';

import {markerStyle, markerStyleHover} from './marker_style.js';

export default class MyGreatPlaceWithHover extends Component {
  static propTypes = {
    // GoogleMap pass $hover props to hovered components
    // to detect hover it uses internal mechanism, explained in x_distance_hover example
    $hover: Boolean,
    text: String
  };

  static defaultProps = {};

//   shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {visible: false}
  }

    showModal = () => {
        this.setState({
        visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
        visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
        visible: false,
        });
    };

  render() {
    const style = this.props.$hover ? markerStyleHover : markerStyle;

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
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            </Modal>
       </div>
    );
  }
}