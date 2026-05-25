import { Component } from 'react';
import { DepartmentsList } from './DepartmentsList';
import { DepartmentRepository } from './../api/DepartmentRepository';
import { EmployeeRepository } from './../api/EmployeeRepository';
import { Link } from 'react-router-dom';

export class DepartmentsDashboard extends Component {

    departmentRepository = new DepartmentRepository();

    employeeRepository = new EmployeeRepository();

    state = {
        departments: []
    };

    // viewEmployees(dept_id){
    //     // TODO: display list of all employees with that dept_id
    //     this.departmentRepository.getEmployees(dept_id)
    //         .then(employees =>{
    //             employees.forEach(employee =>{
    //                 let 
    //             })
    //         })
    // // }
    goToEdit(id?: string) {
        console.log(id);
        //this.setState({redirect: '/editEmployee'});
    }


    render() {
        return <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/Home">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Departments</li>
                </ol>
            </nav>
            <h1> Departments</h1>
            <DepartmentsList departments={this.state.departments} goToEdit={() => this.goToEdit()} />
            <Link to={{ pathname: "/addEmployee" }}
                state={{ departments: this.state.departments }}
            >
                <button type="button" className="btn btn-primary btn-block">Add an Employee</button>
            </Link>
            <Link to="/Home">
                <button type="button" className="btn btn-secondary btn-block">Go back</button>
            </Link>
        </>
    }

    componentDidMount() {
        this.departmentRepository.getDepartments()
            .then(departments => {
                this.setState(this.state.departments = departments.data);
            });
    }

}