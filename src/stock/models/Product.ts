export class Product {

    constructor(
        public product_id: string,
        public product_type_id: string,
        public dept_id: number,
        public order_id: number,
        public sale_id: number,
        public exp_date: string,
        public location: string,
        public in_stock: number,
        public product_type_name: string,
        public dept_name: string,
        public price: string
    ) { }

}