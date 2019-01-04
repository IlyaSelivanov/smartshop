import React, { Component } from 'react';

export class Products extends Component {
    static displayName = Products.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };

        fetch('api/Products/List')
            .then(response => response.json())
            .then(data => {
                this.setState({ products: data, loading: false });
            });
    }

    static renderProductsTable(products) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product =>
                        <tr key={product.name}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Products.renderProductsTable(this.state.products);

        return (
            <div>
                <h1>Products</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }
}