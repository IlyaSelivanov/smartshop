import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Map } from './Map';

export class ShopForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shop_name: '',
            shop_address: '',
            shop_lat: '',
            shop_lng: '',
            saveDisabled: true
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.onMapClickHandle = this.onMapClickHandle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onBack = this.onBack.bind(this);
    }

    componentDidMount() {
        this.setState({
            shop_name: this.props.shopName,
            shop_address: this.props.shopAddress,
            shop_lat: this.props.shopLat,
            shop_lng: this.props.shopLng
        });
    }

    onNameChange(e) {
        this.setState({ shop_name: e.target.value });
        this.setState({ saveDisabled: false });
    }

    onAddressChange(e) {
        this.setState({ shop_address: e.target.value });
        this.setState({ saveDisabled: false });
    }

    onMapClickHandle(coords) {
        this.setState({ shop_lat: coords.lat, shop_lng: coords.lng });
        this.setState({ saveDisabled: false });
    }

    onSubmit(e) {
        e.preventDefault();

        const shop = {
            name: this.state.shop_name,
            address: this.state.shop_address,
            lat: this.state.shop_lat,
            lng: this.state.shop_lng
        };

        this.props.Submit(shop);
        this.setState({ saveDisabled: true });
    }

    onBack() {
        this.props.Back();
    }

    render() {
        return (
            <div>
                <h1>Shop Form</h1>
                <Row>
                    <Col>
                        <Map onMapClick={this.onMapClickHandle} />
                    </Col>
                    <Col>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" name="name" id="name" value={this.state.shop_name} onChange={this.onNameChange}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="address">Address</Label>
                                <Input type="text" name="address" id="address" value={this.state.shop_address} onChange={this.onAddressChange}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Row form>
                                    <Label>Coordinates:</Label>
                                </Row>
                                <Row form>
                                    <Col sm={1}>Lat: </Col>
                                    <Col>
                                        <Input type="text" name="lat" id="lat" value={this.state.shop_lat == null ? 'null' : this.state.shop_lat} readOnly></Input>
                                    </Col>
                                    <Col sm={1}>Lng: </Col>
                                    <Col>
                                        <Input type="text" name="lng" id="lng" value={this.state.shop_lng == null ? 'null' : this.state.shop_lng} readOnly></Input>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup row>
                                <Button id="save" color="primary" onClick={this.onSubmit} disabled={this.state.saveDisabled}>Save</Button>
                                <Button color="danger" onClick={this.onBack}>Back</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}