import React, { Component } from 'react';
import { ShopForm } from './ShopForm';

export class ShopEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            shop_name: '',
            shop_address: '',
            shop_lat: '',
            shop_lng: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onBack = this.onBack.bind(this);
    }

    componentDidMount() {
        fetch('api/Shops/' + this.props.match.params.id, {
            mathod: 'GET'
        })
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    isLoading: false,
                    shop_name: data.name,
                    shop_address: data.address,
                    shop_lat: data.lat,
                    shop_lng: data.lng
                })
            })
            .catch(error => console.log(error));
    }

    onSubmit(shop) {
        fetch('api/Shops/' + this.props.match.params.id, {
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
        if (this.state.isLoading) {
            return <p>Loading..</p>;
        }

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