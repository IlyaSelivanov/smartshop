import React, { Component } from 'react';
import { Button } from 'reactstrap';

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
            'flex-direction': 'row',
            'justify-content': 'space-around',
            'align-items': 'center'
        }

        return (
            <tr key={this.state.data.id}>
                <td>{this.state.data.name}</td>
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
            loading: true
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
        this.props.history.push("/");
    }

    renderShopsTable(shops) {
        var remove = this.onRemoveShop;
        var edit = this.onEditShop;

        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {shops.map((shop) => {
                        return <Shop key={shop.id} shop={shop} onRemove={remove} onEdit={edit} />
                    })}
                </tbody>
            </table>
        );
    }

    render() {
        let content = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderShopsTable(this.state.shops);

        return (
            <div>
                <h1>Shops</h1>
                {content}
            </div>
        );
    }
}