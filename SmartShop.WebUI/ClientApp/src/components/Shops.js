import React, { Component } from 'react';

export class Shops extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shops: []
        };
    }

    componentDidMount() {
        fetch('api/Shops')
            .then(response => response.json)
            .then(data => {
                this.setState({ shops: data })
            })
            .catch((error) => { console.log(error); });
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}