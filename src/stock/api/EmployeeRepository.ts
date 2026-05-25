import useAxios from '../../hooks/useAxios';

export class EmployeeRepository {

    axios = useAxios();

    getEmployees() {
        return this.axios.get(`/users`).then(x => (x.data));
    }

    getEmployeesbyDept(dept_id: string) {
        return this.axios.get(`/users/department/${dept_id}`)
            .then(x => (x.data));
    }

    getEmployee = (id: string) => this.axios.get(`/users/${id}`)
        .then(x => (x.data));

    deleteEmployee(id: string) {
        return this.axios.delete(`/users/${id}`)
            .then(x => (x.data));
    }

    addEmployee(params: { [key: string]: string }) {
        return this.axios.post(`/users`, {
            first: params.first,
            last: params.last,
            email: params.email,
            password: params.password,
            type: params.type,
            dept_id: params.dept_id
        }).then(x => x.data);
    }
}