import React, { Component } from 'react';
import Map from './Map'
import { Input,Typography} from 'antd';
import EmptyBox from './EmptyBox';
import Chooser from './Chooser'
import UserInfo from './UserInfo'
import { Row, Col } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie'
import { isCompositeComponent } from 'react-dom/test-utils';


const {Title} = Typography

const { Search } = Input;

class Customer extends Component{

    constructor(){
        super();
        this.state = {usedSearch: false, address: "", lat: null, lng: null, locations: [], user: JSON.parse(Cookies.get("customerLogin"))}
        this.onSearch = this.onSearch.bind(this);
        this.findPhoneNumber = this.findPhoneNumber.bind(this);
    }

    componentDidMount(){

    }

    findPhoneNumber(dbLocations, location){
        for(var i = 0; i < dbLocations.length; i++){
            let dbLocation = dbLocations[i];
            if(location.id === dbLocation.unique_id){
                return dbLocation.companyNumber;
            }
        }
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

                        axios.get("http://localhost:5000/distributors/")
                            .then(distributorResult => {

                                const googleLocations = nearbyResult.data.results;
                                const dbLocations =  distributorResult.data;

                                const dbIds = dbLocations.map(pharmacy => pharmacy.unique_id)
                                const googleIds = googleLocations.map(location => location.id)
                                const intersectionIds = dbIds.filter(x => googleIds.includes(x));

                                const dbFinalLocations = dbLocations.filter(location => intersectionIds.includes(location.unique_id))
                                const finalLocations = googleLocations.filter(location => intersectionIds.includes(location.id))

                                for(var i = 0; i < finalLocations.length; i++){
                                    finalLocations[i].tagName = finalLocations[i].name + " (" + (i+1) + ")";
                                    finalLocations[i].indexMap = i+1;
                                    finalLocations[i].phoneNumber = this.findPhoneNumber(dbFinalLocations, finalLocations[i]);
                                }

                                this.setState({
                                    usedSearch: true,
                                    address: address,
                                    lat: geocodeResult.data.results[0].geometry.location.lat,
                                    lng: geocodeResult.data.results[0].geometry.location.lng,
                                    locations: finalLocations,
                                    user: JSON.parse(Cookies.get("customerLogin"))
                                })
                                
                            }
                        );

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
                        <Chooser locations={this.state.locations} phoneNumber={this.state.user.phoneNumber}/>
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