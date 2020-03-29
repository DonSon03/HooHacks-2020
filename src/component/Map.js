import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker/Marker'

import {K_SIZE} from './Marker/marker_style'

class Map extends Component {

    constructor(props){
        super(props);
        this.state = {
            address: this.props.address,
            center:{
            lat: 37.410120,
            lng: -122.109270,
            },
            locations: []
        };
    }

    componentDidMount(){

        const geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+this.state.address+"&key=" + process.env.REACT_APP_GOOGLE_MAPS_KEY;
        const nearbyURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+this.state.address+"&key=" + process.env.REACT_APP_GOOGLE_MAPS_KEY;

        fetch(geocodeURL)
            .then(res => res.json())
            .then(
            (geocodeResult) => {
                
                fetch(nearbyURL)
                    .then(res => res.json())
                    .then(
                    (nearbyResult) => {
                        
                        this.setState({
                            lat: geocodeResult.results[0].geometry.location.lat,
                            lng: geocodeResult.results[0].geometry.location.lng,
                            locations: nearbyResult.results
                        })

                    },
                    (error) => {
                        console.log(error)
                    }
                )

            },
            (error) => {
                console.log(error)
            }
        )

    }

    // static defaultProps = {
    //     center: {
    //     lat: 59.95,
    //     lng: 30.33
    //     },
    //     zoom: 11
    // };
 
    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
                defaultCenter={this.state.center}
                defaultZoom={11}
                >
                {
                    this.state.locations.map(
                        (location,index) => 
                        <Marker
                        lat={location.geometry.location.lat}
                        lng={location.geometry.location.lng}
                        locationName={location.name}
                        text={index}
                        />
                    )
                }
               
                </GoogleMapReact>
            </div>
            // <div style={{ height: '100vh', width: '100%' }}>
            //     <GoogleMapReact
            //     bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
            //     defaultCenter={this.props.center}
            //     defaultZoom={this.props.zoom}
            //     hoverDistance={K_SIZE / 2}
            //     >
            //     <Marker
            //     // <AnyReactComponent
            //         lat={59.955413}
            //         lng={30.337844}
            //         text="1"
            //         locationName="Wowzies"
            //     />
            //     </GoogleMapReact>
            // </div>
        );
    }
}
 
export default Map;