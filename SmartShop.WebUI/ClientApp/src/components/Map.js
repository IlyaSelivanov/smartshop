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
        geolocation.getCurrentPosition((position) => {
            this.setState({
                center: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            })
        });
    }

    onMapClick(e) {
        if (this.props.onMapClick == null) {
            return;
        } else {
            this.props.onMapClick({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        }
    }

    render() {
        let GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
                defaultCenter={this.state.center}
                defaultZoom={15}
                onClick={this.onMapClick}
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