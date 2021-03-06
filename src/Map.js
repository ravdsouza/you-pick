import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from 'react-google-maps';
import { compose, withProps } from 'recompose'

const Map = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDft_87yWQ-GKW9ZAoLTxgF6PW-qAolxaU",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) =>
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 43.5, lng: -80.55 }}
    >
        {(props.isMarkerShown) &&
          props.currentLocations.map((currentLocation) => <Marker onClick={() => props.onClickMarker(currentLocation.name)} key={currentLocation.id} position={{ lat: currentLocation.lat, lng: currentLocation.lng }}/>) 
        }
    </GoogleMap>
  )

export default Map;
