import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Products } from './components/Products';
import { Map } from './components/Map';
import { ShopList } from './components/ShopList';
import { ShopEdit } from './components/ShopEdit';
import { ShopCreate } from './components/ShopCreate';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetch-data' component={FetchData} />
                <Route path='/products' component={Products} />
                <Route path='/map' component={Map} />
                <Route path='/shops' component={ShopList} />
                <Route path='/editShop/:id' component={ShopEdit} />
                <Route path='/createShop' component={ShopCreate} />
            </Layout>
        );
    }
}
