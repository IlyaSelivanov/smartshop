import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import { Map } from './Map'

//https://appdividend.com/2018/11/11/react-crud-example-mern-stack-tutorial/#11_Edit_and_Update_Functionality

export class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = { data: props.shop };

        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    onDelete(e) {
        this.props.onRemove(this.state.data);
    }

    onEdit(e) {
        this.props.onEdit(this.state.data);
    }

    render() {
        const divStyle = {
            'display': 'flex',
            'flexDirection': 'row',
            'justifyContent': 'space-around',
            'alignItems': 'center'
        }

        return (
            <tr key={this.state.data.id}>
                <td>{this.state.data.name}</td>
                <td>{this.state.data.address}</td>
                <td>
                    <div style={divStyle}>
                        <Link to={'/editShop/' + this.state.data.id} className="btn btn-primary">Edit</Link>
                        <Button outline color="danger" onClick={this.onDelete}>Delete</Button>
                    </div>
                </td>
            </tr>
        );
    }
}

export class ShopList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shops: [],
            loading: true,
            redirectToShopForm: false,
            shopToEdit: null
        };

        this.onAddShop = this.onAddShop.bind(this);
        this.onRemoveShop = this.onRemoveShop.bind(this);
    }

    componentDidMount() {
        fetch('api/Shops')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    shops: data,
                    loading: false
                })
            })
            .catch((error) => { console.log(error); });

        //console.log(this.props.location.state);
        //console.log(this.state.shops);
        //if (typeof this.props.location.state !== 'undefined') {
        //    let shops = this.state.shops;
        //    shops.push(this.props.location.state.newShop);
        //    this.setState({ shops: shops });
        //}
    }

    onAddShop() {
        console.log(this.state.shops);
    }

    onRemoveShop(shop) {
        fetch('api/Shops/' + shop.id, {
            method: 'DELETE'
        })
            .catch((error) => { console.log(error); });

        var array = [...this.state.shops];
        var index = array.indexOf(shop);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ shops: array });
        }
    }

    renderShopsTable(shops) {
        var remove = this.onRemoveShop;
        var edit = this.onEditShop;

        console.log(this.props.location.state);
        console.log(this.state.shops);

        return (
            <div>
                <div>
                    <h1>Shops</h1>
                </div>
                <div>
                    <Link to={'/createShop'} className="btn btn-primary">Add shop</Link>
                </div>
                <div>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {shops.map((shop) => {
                                return <Shop key={shop.id} shop={shop} onRemove={remove} onEdit={edit} />
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    render() {
        let content = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderShopsTable(this.state.shops);

        return (
            <div>
                {content}
            </div>
        );
    }
}

export class ShopEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToShopList: false,
            shop_name: '',
            shop_address: '',
            shop_lat: '',
            shop_lng: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.onMapClickHandle = this.onMapClickHandle.bind(this);
    }

    componentDidMount() {
        fetch('api/Shops/' + this.props.match.params.id, {
            mathod: 'GET'
        })
            .then(response => response.json())
            .then(data =>
                this.setState({
                    shop_name: data.name,
                    shop_address: data.address,
                    shop_lat: data.lat,
                    shop_lng: data.lng
                }))
            .catch(error => console.log(error));
    }

    onSubmit(e) {
        e.preventDefault();

        const shop = {
            name: this.state.shop_name,
            address: this.state.shop_address,
            lat: this.state.shop_lat,
            lng: this.state.shop_lng
        };

        fetch('api/Shops/' + this.props.match.params.id, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(shop)

        })
            .catch((error) => { console.log(error); });

        this.setState({ redirectToShopList: true })
    }

    onCancel(e) {
        this.setState({ redirectToShopList: true })
    }

    onNameChange(e) {
        this.setState({ shop_name: e.target.value });
    }

    onAddressChange(e) {
        this.setState({ shop_address: e.target.value });
    }

    onMapClickHandle(coords) {
        this.setState({ shop_lat: coords.lat, shop_lng: coords.lng });
    }

    render() {
        if (this.state.redirectToShopList) {
            return <Redirect to={{
                pathname: '/shops'
            }} />
        }

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
                                <Button color="primary" onClick={this.onSubmit}>Save</Button>
                                <Button color="danger" onClick={this.onCancel}>Cancel</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export class ShopCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToShopList: false,
            shop_name: '',
            shop_address: '',
            shop_lat: '',
            shop_lng: '',
            newShop: null
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.onMapClickHandle = this.onMapClickHandle.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const shop = {
            name: this.state.shop_name,
            address: this.state.shop_address,
            lat: this.state.shop_lat,
            lng: this.state.shop_lng
        };

        fetch('api/Shops', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(shop)

        })
            .catch((error) => { console.log(error); });

        this.setState({ redirectToShopList: true, newShop: shop })
    }

    onCancel(e) {
        this.setState({ redirectToShopList: true })
    }

    onNameChange(e) {
        this.setState({ shop_name: e.target.value });
    }

    onAddressChange(e) {
        this.setState({ shop_address: e.target.value });
    }

    onMapClickHandle(coords) {
        this.setState({ shop_lat: coords.lat, shop_lng: coords.lng });
    }

    render() {
        if (this.state.redirectToShopList) {
            return <Redirect to={{
                pathname: '/shops',
                state: { newShop: this.state.newShop }
            }} />
        }

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
                                <Button color="primary" onClick={this.onSubmit}>Save</Button>
                                <Button color="danger" onClick={this.onCancel}>Cancel</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}