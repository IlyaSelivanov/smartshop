import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Shop } from './Shop';

export class ShopList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shops: [],
            loading: true,
            nameSortOrder: 1
        };

        this.onRemoveShop = this.onRemoveShop.bind(this);
        this.onNameHeaderClick = this.onNameHeaderClick.bind(this);
        this.onAddressHeaderClick = this.onAddressHeaderClick.bind(this);
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

    onNameHeaderClick() {
        let arrShops = this.state.shops;

        switch (this.state.nameSortOrder) {
            case 1:
                arrShops.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
                break;
            case -1:
                arrShops.sort((a, b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0));
                break;
        }

        this.setState({ nameSortOrder: this.state.nameSortOrder * (-1) });
        this.forceUpdate();
    }

    onAddressHeaderClick() {
        let arrShops = this.state.shops;

        switch (this.state.nameSortOrder) {
            case 1:
                arrShops.sort((a, b) => (a.address > b.address) ? 1 : ((b.address > a.address) ? -1 : 0));
                break;
            case -1:
                arrShops.sort((a, b) => (a.address < b.address) ? 1 : ((b.address < a.address) ? -1 : 0));
                break;
        }

        this.setState({ nameSortOrder: this.state.nameSortOrder * (-1) });
        this.forceUpdate();
    }

    renderShopsTable(shops) {
        var remove = this.onRemoveShop;
        var edit = this.onEditShop;

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
                                <th onClick={this.onNameHeaderClick}>Name</th>
                                <th onClick={this.onAddressHeaderClick}>Address</th>
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