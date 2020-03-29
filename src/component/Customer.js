import React, { Component } from 'react';
import Map from './Map'
import { Input } from 'antd';
import EmptyMap from './EmptyMap';
import Chooser from './Chooser'
import UserInfo from './UserInfo'
import { Row, Col } from 'antd';
import axios from 'axios';

const { Search } = Input;

class Customer extends Component{

    constructor(){
        super();
        this.state = {usedSearch: false, address: "", lat: null, lng: null, locations: []}
        this.onSearch = this.onSearch.bind(this);
    }

    componentDidMount(){

    }

    onSearch(address){

        const drugStoreQuery = "drug store near " + address

        const proxyurl = "https://cors-anywhere.herokuapp.com/"
        const geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=" + process.env.REACT_APP_GOOGLE_MAPS_KEY;
        const nearbyURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+drugStoreQuery+"&key=" + process.env.REACT_APP_GOOGLE_MAPS_KEY;

        console.log(geocodeURL)
        console.log(nearbyURL)

        axios.get(proxyurl + geocodeURL)
            .then(geocodeResult => {
                axios.get(proxyurl + nearbyURL)
                    .then(nearbyResult => {
                        console.log(geocodeResult)
                        console.log(nearbyResult)

                        this.setState({
                            usedSearch: true,
                            address: address,
                            lat: geocodeResult.data.results[0].geometry.location.lat,
                            lng: geocodeResult.data.results[0].geometry.location.lng,
                            locations: nearbyResult.data.results
                        })
                    }
                );
            }
        );

    }

    render(){
        return(
            <div>
        
            {this.state.usedSearch 
                ? <Search placeholder="input search text" disabled /> 
                : <Search placeholder="input search text" onSearch={value => this.onSearch(value)} enterButton />}
            
            {this.state.usedSearch ? 
            <Row>
                <Col span={16}>
                <Map address={this.state.address} center={{lat: this.state.lat, lng: this.state.lng}} locations={this.state.locations}/>
                </Col>
                <Col span={8}>
                    <Row>
                        <UserInfo firstName='Edwin' lastName='Yu' phoneNumber='2403867154' address={this.state.address}/>
                    </Row>
                    {/* <Row>
                        <Chooser locations={this.state.locations} targetKeys={this.state.locations.map((location,index)=>location.name + " (" + index + ")")}/>
                    </Row> */}
                </Col>
            </Row>
             : 
             <EmptyMap />
             }
            
            </div>
        );
    }
}

export default Customer;