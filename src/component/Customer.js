import React, { Component } from 'react';
import Map from './Map'
import { Input,Button,Typography} from 'antd';
import EmptyMap from './EmptyMap';
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
        this.state = {usedSearch: false, address: "", lat: null, lng: null, locations: []}
        this.onSearch = this.onSearch.bind(this);
    }

    componentDidMount(){

    }

    signout(){
        Cookies.remove('customerLogin')
        window.location.reload()
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
                            locations: locations,
                            user: JSON.parse(Cookies.get("customerLogin"))
                        })
                        
                    }
                );
            }
        );

    }

    render(){
        return(
            <div>
                <Button onClick={this.signout}>signout</Button>
                <Title>{}</Title>
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
                        <UserInfo firstName={this.state.user.firstName} phoneNumber={this.state.user.phoneNumber}/>
                    </Row>
                    <Row>
                        <Chooser locations={this.state.locations} />
                    </Row>
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