import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker/Marker'

import {K_SIZE} from './Marker/marker_style'

class Map extends Component {

    constructor(props){
        super(props);
    }

    render() {

        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
                defaultCenter={this.props.center}
                defaultZoom={11}
                >
                {
                    this.props.locations.map(
                        (location,index) => 
                        <Marker
                        key={index}
                        lat={location.geometry.location.lat}
                        lng={location.geometry.location.lng}
                        locationName={location.name + " (" + index + ")"}
                        text={index}
                        />
                    )
                }
               
                </GoogleMapReact>
            </div>
        );
    }
}
 
export default Map;