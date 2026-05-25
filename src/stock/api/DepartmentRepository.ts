import useAxios from '../../hooks/useAxios';

export class DepartmentRepository {

    axios = useAxios();

    getDepartments(params?: { [key: string]: string }) {
        return this.axios.get(`/departments`, { params })
            .then(x => x.data);
    }

    getDepartment = (id: string) => this.axios.get(`/departments/${id}`).then(x => x.data);

    //DELETE /departments/{id}
    deleteDepartment(id: string) {
        return this.axios.delete(`/departments/${id}`)
            .then(x => x.data);
    }

}