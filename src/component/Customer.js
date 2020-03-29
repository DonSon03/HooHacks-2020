import React, { Component } from 'react';
import Map from './Map'
import { Input,Typography} from 'antd';
import EmptyBox from './EmptyBox';
import Chooser from './Chooser'
import UserInfo from './UserInfo'
import { Row, Col } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie'


const {Title} = Typography

const { Search } = Input;

class Customer extends Component{

    constructor(){
        super();
        this.state = {usedSearch: false, address: "", lat: null, lng: null, locations: [], user: JSON.parse(Cookies.get("customerLogin"))}
        this.onSearch = this.onSearch.bind(this);
    }

    componentDidMount(){

    }

    onSearch(address){

        const drugStoreQuery = "drug store near " + address

        const proxyurl = "https://cors-anywhere.herokuapp.com/"
        const geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=" + process.env.REACT_APP_GOOGLE_MAPS_KEY;
        const nearbyURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+drugStoreQuery+"&key=" + process.env.REACT_APP_GOOGLE_MAPS_KEY;

        axios.get(proxyurl + geocodeURL)
            .then(geocodeResult => {
                axios.get(proxyurl + nearbyURL)
                    .then(nearbyResult => {

                        const locations = nearbyResult.data.results
                        
                        for(var i = 0; i < locations.length; i++){
                            locations[i].tagName = locations[i].name + " (" + (i+1) + ")";
                            locations[i].indexMap = i+1;
                        }

                        this.setState({
                            usedSearch: true,
                            address: address,
                            lat: geocodeResult.data.results[0].geometry.location.lat,
                            lng: geocodeResult.data.results[0].geometry.location.lng,
                            locations: locations
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
            
            
            <Row>
                <Col span={16}>
                {this.state.usedSearch ? 
                <Map address={this.state.address} center={{lat: this.state.lat, lng: this.state.lng}} locations={this.state.locations}/>
                : 
                <EmptyBox message="Enter in an address to see surrounding pharmacies."/>
                }
                </Col>
                <Col span={8}>
                    <Row>
                        <UserInfo firstName={this.state.user.firstName} phoneNumber={this.state.user.phoneNumber}/>
                    </Row>
                    <Row>
                        {this.state.usedSearch ? 
                        <Chooser locations={this.state.locations} />
                        : 
                        <EmptyBox message="Enter in an address to see the list of nearby pharmacies."/>
                        }
                    </Row>
                </Col>
            </Row>
            
            </div>
        );
    }
}

export default Customer;