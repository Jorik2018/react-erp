import { Component } from 'react';
import { SalesList } from './SalesList';
import { Link } from 'react-router-dom';
import { SaleRepository } from '../api/SaleRepository';

export class SalesDashboard extends Component {

    salesRepository = new SaleRepository();

    state = {
        sale: []
    };

    onSearch(params) {
        this.salesRepository.getSales(params)
            .then(sale => {
                this.setState({ sale: sale.data });
            });
    }

    render() {
        return <>
            <ol className="breadcrumb border border-0 rounded mb-0">
                <li className="breadcrumb-item"><a href="/Home">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page"> Sales List </li>
            </ol>
            <h1 style={{ padding: 10 }}>Sales</h1>
            <SalesList sale={this.state.sale} />
            <Link to="/Home">
                <button type="button" className="btn btn-secondary btn-block">Go back</button>
            </Link>
        </>
    }

    componentDidMount() {
        this.onSearch();
    }

}