﻿import React, { Component } from 'react';
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';
import { Container, Row, Col } from 'reactstrap';

const geolocation = (
    navigator.geolocation || {
        getCurrentPosition: (success, failure) => {
            failure("Your browser doesn't support geolocation.");
        },
    }
);

export class Map extends Component {
    static displayName = Map.name;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            center: null
        };

        this.onMapClick = this.onMapClick.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
        if (this.props.Center !== undefined && this.props.Center.lat !== null) {
            this.setState({ center: this.props.Center })
        } else {
            geolocation.getCurrentPosition((position) => {
                this.setState({
                    center: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                })
            });
        }
    }

    onMapClick(e) {
        this.setState({ center: { lat: e.latLng.lat(), lng: e.latLng.lng() } });

        if (this.props.onMapClick === undefined) {
            return;
        } else {
            this.props.onMapClick(this.state.center);
        }
    }

    render() {
        let GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
                defaultCenter={this.state.center}
                defaultZoom={18}
                onClick={this.onMapClick}
            >
                <Marker position={this.state.center} />
            </GoogleMap>
        ));

        return (
            <Container>
                <Row>
                    <Col>
                        <GoogleMapExample
                            containerElement={<div style={{ height: `500px`, width: '500px' }} />}
                            mapElement={<div style={{ height: `100%` }}/>}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}