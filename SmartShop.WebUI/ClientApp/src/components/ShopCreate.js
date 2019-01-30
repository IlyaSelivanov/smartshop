import React, { Component } from 'react';
import { ShopForm } from './ShopForm';

export class ShopCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shop_name: '',
            shop_address: '',
            shop_lat: '',
            shop_lng: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onBack = this.onBack.bind(this);
    }

    onSubmit(shop) {
        fetch('api/Shops', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(shop)

        })
            .catch((error) => { console.log(error); });
    }

    onBack() {
        this.props.history.push('/shops');
    }

    render() {
        return (
            <ShopForm
                Submit={this.onSubmit}
                Back={this.onBack}
                shopName={this.state.shop_name}
                shopAddress={this.state.shop_address}
                shopLat={this.state.shop_lat}
                shopLng={this.state.shop_lng}
            ></ShopForm>
        );
    }
}