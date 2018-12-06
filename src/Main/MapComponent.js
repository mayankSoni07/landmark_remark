import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import ServiceController from '../service';
import './MapComponent.css';

let self;

class MapComponent extends Component {

    constructor(props) {
        super(props);
        self = this;
        this.state = {
            infoVisible: false,
            isSearch: false, searchText: "",
            isSaveLocation: false, saveLocationText: "",
            loggedInUser: ServiceController.getLoggedInUser(1),
            userLocation: ServiceController.getLocationOfUser(1),
            otherUsers: ServiceController.getAllLogOutUsersWithLocation(1),
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
            return this.markerComponent(this.state.loggedInUser && this.state.loggedInUser.name, location, true);
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

    addNoteToCurrent(saveLocationText) {
        const result = ServiceController.addNotesToLocation(
            [this.state.currentLat, this.state.currentLong],
            saveLocationText,
            1
        )
        this.setState({ userLocation: result });
    }

    searchUser(searchText) {
        let searchResult = ServiceController.searchUser(searchText)
        let allOtherUsers = ServiceController.getAllLogOutUsersWithLocation(1);
        let newLoggedInUser = [];
        let newOtherUsers = [];
        searchResult && searchResult.map((result) => {
            if (result.id === self.state.loggedInUser.id)
                newLoggedInUser = result.location
            allOtherUsers && allOtherUsers.map((res) => {
                if (res.id === result.id)
                    newOtherUsers.push(res)
            })
        })
        self.setState({ userLocation: newLoggedInUser, otherUsers: newOtherUsers, infoVisible: false });
    }

    buttonSearchUser() {
        let obj = {};
        if (self.state.isSearch)
            obj["searchText"] = ""
        obj["isSearch"] = !self.state.isSearch;
        self.setState({ ...obj })
    }

    onSubmitSearch() {
        if (self.state.searchText)
            self.searchUser(self.state.searchText)
        else
            alert("Search input must not be empty.")
    }

    buttonSaveLocation() {
        let obj = {};
        if (self.state.isSaveLocation)
            obj["saveLocationText"] = ""
        obj["isSaveLocation"] = !self.state.isSaveLocation;
        self.setState({ ...obj })
    }

    onSubmitSaveLocation() {
        if (self.state.saveLocationText)
            self.addNoteToCurrent(self.state.saveLocationText)
        else
            alert("Add location input must not be empty.")
    }

    onReset() {
        let obj = {};
        obj["infoVisible"] = false;
        obj["isSearch"] = false;
        obj["searchText"] = "";
        obj["isSaveLocation"] = false;
        obj["saveLocationText"] = "";
        obj["loggedInUser"] = ServiceController.getLoggedInUser(1);
        obj["userLocation"] = ServiceController.getLocationOfUser(1);
        obj["otherUsers"] = ServiceController.getAllLogOutUsersWithLocation(1);

        self.setState({ ...obj })
    }

    render() {
        return (
            <div className="MapComponent">

                <button className="btn-black-right" type="button" onClick={() => self.onReset()}>
                    Reset
                </button>

                <button className="btn-black" type="button" onClick={() => self.buttonSaveLocation()}>
                    Add note to current Location
                </button>
                {self.state.isSaveLocation && <div>
                    <input placeholder="Enter Note text"
                        onChange={(text) => self.setState({ saveLocationText: text.target.value })}
                    />
                    <button className="btn-black" type="button" onClick={() => self.onSubmitSaveLocation()}>
                        Submit
                    </button>
                </div>}

                <button className="btn-black" type="button" onClick={() => self.buttonSearchUser()}>
                    Search User
                </button>
                {self.state.isSearch && <div>
                    <input placeholder="Enter search text"
                        onChange={(text) => self.setState({ searchText: text.target.value })}
                    />
                    <button className="btn-black" type="button" onClick={() => self.onSubmitSearch()}>
                        Submit
                    </button>
                </div>}

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
