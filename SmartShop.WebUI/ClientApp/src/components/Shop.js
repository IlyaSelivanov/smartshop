import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

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