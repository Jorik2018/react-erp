import useAxios from '../../hooks/useAxios';

export class SaleRepository {

    axios = useAxios();

    getSales(params: { [key: string]: string }) {
        return this.axios.get(`/sales`, { params })
            .then(x => (x.data));
    }

    getSale = (id: string) => this.axios.get(`/sales/${id}`).then(x => (x.data))

    deleteSales(id: string) {
        return this.axios.delete(`/sales/${id}`)
            .then(x => x.data)
    }
}
