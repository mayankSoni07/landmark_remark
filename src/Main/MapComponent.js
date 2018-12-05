import React, { Component } from 'react';
// import { connect } from "react-redux";
// import { bindActionCreators } from 'redux';

// import { testAction } from '../redux/actions';
// import './MapComponent.css';

import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            infoVisible: false
        };
    }

    showPosition(position) {
        this.setState({ currentLat: position.coords.latitude, currentLong: position.coords.longitude });
    }

    componentDidMount() {
        console.log(this);
        navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
    }

    render() {
        // console.log('test reducer : ', this.props.test)
        return (
            <div className="MapComponent">
                <p>
                    MapComponent Component
                </p>
                {this.state.currentLong &&
                    <Map google={this.props.google} zoom={14}
                        initialCenter={{
                            lat: this.state.currentLat,
                            lng: this.state.currentLong
                        }}
                    >

                        <Marker
                            title={'The marker`s title will appear as a tooltip.'}
                            name={'Khatam'}
                            position={{ lat: this.state.currentLat, lng: this.state.currentLong }}
                            onClick={(props, marker, e) => {
                                console.log("Marker 1 : ", props, marker, e)
                                this.setState({ markerProp: props, marker: marker, markerE: e, infoVisible: true })
                            }}
                            onMouseover={(props, marker, e) => {
                                console.log("Marker 1, mousehouver : ", this.state.markerProp, props, marker, e)
                                if (!this.state.markerProp) {
                                    this.setState({ markerProp: props, marker: marker, markerE: e, infoVisible: true })
                                } else {
                                    if (this.state.markerProp.name !== props.name)
                                        this.setState({ markerProp: props, marker: marker, markerE: e, infoVisible: true })
                                }
                            }}
                        />

                        <Marker
                            title={'title 2.'}
                            name={'AMAN'}
                            position={{ lat: 37.759703, lng: -122.428093 }}
                            onClick={(props, marker, e) => {
                                this.setState({ markerProp: props, marker: marker, markerE: e, infoVisible: true })
                            }}
                            onMouseover={(props, marker, e) => {
                                if (!this.state.markerProp) {
                                    this.setState({ markerProp: props, marker: marker, markerE: e, infoVisible: true })
                                } else {
                                    if (this.state.markerProp.name !== props.name)
                                        this.setState({ markerProp: props, marker: marker, markerE: e, infoVisible: true })
                                }
                            }}
                        />
                        <InfoWindow
                            marker={this.state.marker}
                            visible={this.state.infoVisible}
                            onClose={() => {
                                this.setState({ infoVisible: false })
                            }}
                        >
                            <div>
                                <h1>{this.state.markerProp && this.state.markerProp.name}</h1>
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
