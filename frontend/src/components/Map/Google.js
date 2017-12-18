import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
 
export class MapContainer extends Component {
  render() {
    const googleStyle = {
      width: '100%',
      height: '100%'
    }
    return (
      <Map 
        style={style} 
        google={this.props.google} 
        initialCenter={{
          lat: 32.37302558666005,
          lng: 119.42665999999997
        }}
        zoom={14}>
        <Marker onClick={this.onMarkerClick}
                name={'Gloompie\'s location'} />
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyC66NzkYcyOru4ucjH6tKMXfDTXqP8lzU8')
})(MapContainer)