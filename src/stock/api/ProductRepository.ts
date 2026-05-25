import useAxios from '../../hooks/useAxios';
import { ProductType, Product } from '../models';

export class ProductRepository {

    axios = useAxios();

    getProducts(params?: { [key: string]: string }) {
        return this.axios.get<Product[]>(`/products`, params)
            .then(x => x.data);
    }

    getProductTypes(params?: { [key: string]: string }) {
        return this.axios.get(`/product_types`, params)
            .then(x => x.data);
    }


    getProductTypebyName(name: string) {
        return this.axios.get(`/product_types/name/${name}`)
            .then(x => x.data);
    }

    addProductType(product_type: ProductType) {
        return this.axios.post(`/product_types`, {
            product_type_name: product_type.product_name,
            dept_id: product_type.dept_id,
            price: product_type.product_price
        }).then(x => x.data);
    }

    deleteProductType(product_type_id: string) {
        return this.axios.delete(`/product_types/${product_type_id}`)
            .then(x => x.data);
    }

    deleteProduct = (product_id: string) =>
        this.axios.delete(`/products/${product_id}`).then(x => x.data);

}

