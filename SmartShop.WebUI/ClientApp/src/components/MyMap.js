import React, { Component } from 'react';
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';
import { Container, Row, Col } from 'reactstrap';

const geolocation = (
    navigator.geolocation || {
        getCurrentPosition: (success, failure) => {
            failure("Your browser doesn't support geolocation.");
        },
    }
);

export class MyMap extends Component {
    static displayName = MyMap.name;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            center: null
        };
    }

    componentDidMount() {
        geolocation.getCurrentPosition((position) => {
            this.setState({
                center: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            })
        });
    }

    render() {
        let GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
                defaultCenter={this.state.center}
                defaultZoom={15}
                onClick={(e) => {
                    console.log(e.latLng.lat());
                    console.log(e.latLng.lng());
                }}
            >
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