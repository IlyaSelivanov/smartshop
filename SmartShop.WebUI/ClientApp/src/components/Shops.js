import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router'

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
                        <Button outline color="success" onClick={this.onEdit}>Edit</Button>
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
            redirectToEdit: false,
            shopToEdit: null
        };

        this.onRemoveShop = this.onRemoveShop.bind(this);
        this.onEditShop = this.onEditShop.bind(this);
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
    }

    onRemoveShop(shop) {
        console.log('remove');
        console.log(shop);
    }

    onEditShop(shop) {
        console.log('edit');
        console.log(shop);

        this.setState({ redirectToEdit: true, shopToEdit: shop });
    }

    renderShopsTable(shops) {
        const redirect = this.state.redirectToEdit;

        if (redirect) {
            return <Redirect to={{
                pathname: '/editShop',
                state: { shop: this.state.shopToEdit }
            }}
            />
        }

        var remove = this.onRemoveShop;
        var edit = this.onEditShop;

        return (
            <div>
                <h1>Shops</h1>
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

export class ShopForm extends Component {
    constructor(props) {
        super(props);
        this.state = { shop: this.props.location.state.shop };

        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
    }

    onSubmit(e) {
        console.log("Shop Form onSubmit()");
    }

    onNameChange(e) {
        let shop = this.state.shop;
        shop.name = e.target.value;

        this.setState({ shop: shop });
    }

    onAddressChange(e) {
        let shop = this.state.shop;
        shop.address = e.target.value;

        this.setState({ shop: shop });
    }

    render() {
        return (
            <div>
                <h1>Shop Form</h1>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={this.state.shop.name} onChange={this.onNameChange}></Input>                        
                    </FormGroup>
                    <FormGroup>
                        <Label for="adress">Address</Label>
                        <Input type="text" name="address" id="address" value={this.state.shop.address} onChange={this.onAddressChange}></Input>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}