import { Component } from 'react';
import { ProductsList } from './ProductsList';
import { Link } from 'react-router-dom';
import { ProductRepository } from '../api/ProductRepository';
import { ProductSearch } from './ProductSearch';

export class ProductsDashboard extends Component {

    productRepository = new ProductRepository();

    state = {
        products: []
    };

    onSearch(params: { product_type_name: string }) {
        this.productRepository.getProductTypebyName(params.product_type_name)
            .then(products => {
                this.setState({ products: products.data });
            });

    }

    getAllProducts() {
        this.productRepository.getProducts()
            .then(products => {
                this.setState({ products });
            });
    }

    render() {
        return <>
            <Link to="/addItem">
                <button className="btn float-right btn-primary">+</button>
            </Link>

            <ol className="breadcrumb border border-0 rounded mb-0">
                <li className="breadcrumb-item"><a href="/Home">Home</a></li>

                <li className="breadcrumb-item active" aria-current="page"> Products List </li>
            </ol>

            <ProductSearch onSearch={(params: { product_type_name: string }) => this.onSearch(params)}
                getAllProducts={() => this.getAllProducts()} />

            <h1 style={{ padding: 10 }}>What we carry:</h1>

            <ProductsList products={this.state.products} />
            <Link to="/Home">
                <button type="button" className="btn btn-secondary btn-block">Go back</button>
            </Link>

        </>
    }

    componentDidMount() {
        this.getAllProducts();
    }
}