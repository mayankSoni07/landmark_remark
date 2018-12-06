import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import ServiceController from '../service';


class MapComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            infoVisible: false,
            loggedInUser: ServiceController.getLoggedInUser(1),
            userLocation: ServiceController.getLocationOfUser(1),
            otherUsers: ServiceController.getAllLogOutUsersWithLocation(1)
        };
    }

    showPosition(position) {
        this.setState({ currentLat: position.coords.latitude, currentLong: position.coords.longitude });
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
    }

    genrateMarkersForLoggedOutUser() {
        return this.state.otherUsers.map((user) => {
            return user.location.map((location) => {
                return this.markerComponent(user.name, location, false);
            });
        });
    }

    genrateMarkersForLoggedInUser() {
        return this.state.userLocation.map((location) => {
            return this.markerComponent(this.state.loggedInUser.name, location, true);
        });
    }

    markerComponent(username, location, isLoggedInUser) {
        return (
            <Marker
                title={`${username} Loaction`}
                name={location.text}
                position={{ lat: location.cordinate[0], lng: location.cordinate[1] }}
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
                key={location.cordinate[0]}
                icon={{
                    url: isLoggedInUser ? require('./markerRed.png') : require('./markerBlue.png'),
                    scaledSize: { width: 50, height: 50 }
                }}
            />)
    }

    addNoteToCurrent() {
        const result = ServiceController.addNotesToLocation(
            [this.state.currentLat, this.state.currentLong],
            'Hey! My Current Location',
            1)
        this.setState({ userLocation: result });
    }

    render() {
        return (
            <div className="MapComponent">
                <p>
                    MapComponent Component
                </p>
                <button type="button" onClick={this.addNoteToCurrent.bind(this)}>Add note to current Location</button>
                {this.state.currentLong &&
                    <Map google={this.props.google} zoom={7}
                        initialCenter={{
                            lat: this.state.currentLat,
                            lng: this.state.currentLong
                        }}
                    >
                        {this.genrateMarkersForLoggedInUser()}
                        {this.genrateMarkersForLoggedOutUser()}

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


export default GoogleApiWrapper({
    apiKey: ("AIzaSyBnOC2cYnLyaaYXtnd_IEQWZLkqvg0tqoE")
})(MapComponent)
// export default MapComponent;
