import React, { Component } from 'react';
// import { connect } from "react-redux";
// import { bindActionCreators } from 'redux';

// import { testAction } from '../redux/actions';
// import './MapComponent.css';

import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

let self;

class MapComponent extends Component {

    constructor(props) {
        super(props);
        self = this;
        this.state = {
            kholDo: false
        };
    }

    showPosition(position) {
        console.log(position)
        self.setState({ currentLat: position.coords.latitude, currentLong: position.coords.longitude });
    }

    componentDidMount() {
        console.log(this);
        navigator.geolocation.getCurrentPosition(this.showPosition);
    }

    render() {
        // console.log('test reducer : ', this.props.test)
        return (
            <div className="MapComponent">
                <p>
                    MapComponent Component
                </p>
                {self.state.currentLong &&
                    <Map google={this.props.google} zoom={14}
                        initialCenter={{
                            lat: self.state.currentLat,
                            lng: self.state.currentLong
                        }}
                    >

                        <Marker
                            title={'The marker`s title will appear as a tooltip.'}
                            name={'Khatam'}
                            position={{ lat: self.state.currentLat, lng: self.state.currentLong }}
                            onClick={(props, marker, e) => {
                                console.log("Marker 1 : ", props, marker, e)
                                self.setState({ markerProp: props, marker: marker, markerE: e, kholDo: true })
                            }}
                            onMouseover={(props, marker, e) => {
                                console.log("Marker 1, mousehouver : ", self.state.markerProp, props, marker, e)
                                if (!self.state.markerProp) {
                                    self.setState({ markerProp: props, marker: marker, markerE: e, kholDo: true })
                                } else {
                                    if (self.state.markerProp.name !== props.name)
                                        self.setState({ markerProp: props, marker: marker, markerE: e, kholDo: true })
                                }
                            }}
                        />

                        <Marker
                            title={'title 2.'}
                            name={'AMAN'}
                            position={{ lat: 37.759703, lng: -122.428093 }}
                            onClick={(props, marker, e) => {
                                console.log("Marker 2 : ", props, marker, e)
                                self.setState({ markerProp: props, marker: marker, markerE: e, kholDo: true })
                            }}
                            onMouseover={(props, marker, e) => {
                                console.log("Marker 2, mousehouver : ", self.state.markerProp, props, marker, e)
                                if (!self.state.markerProp) {
                                    self.setState({ markerProp: props, marker: marker, markerE: e, kholDo: true })
                                } else {
                                    if (self.state.markerProp.name !== props.name)
                                        self.setState({ markerProp: props, marker: marker, markerE: e, kholDo: true })
                                }
                            }}
                        />
                        <InfoWindow
                            marker={self.state.marker}
                            visible={self.state.kholDo}
                            onClose={() => {
                                self.setState({ kholDo: false })
                            }}
                        >
                            <div>
                                <h1>{self.state.markerProp && self.state.markerProp.name}</h1>
                            </div>
                        </InfoWindow>

                    </Map>}
            </div>
        );
    }
}

// const mapStateToProps = state => {
//     return {
//         test: state.testReducer.test
//     }
// }

// const mapDispatchToProps = (dispatch, getState) => bindActionCreators({
//     testAction
// }, dispatch);

// Map = connect(mapStateToProps, mapDispatchToProps)(Map)
export default GoogleApiWrapper({
    apiKey: ("AIzaSyDL2ykzdT6SCFE6wFyZLg2x5lQGEPTKQyA")
})(MapComponent)
// export default MapComponent;
