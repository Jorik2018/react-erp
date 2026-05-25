import './App.css';
import { DepartmentsDashboard } from './DepartmentsDashboard';
import { Home } from './Home';
import { ProductsDashboard } from './ProductsDashboard';
import { ProductDisplay } from './ProductDisplay';
import { Routes, Route } from 'react-router-dom';
import { ItemEditorDashboard } from './ItemEditorDashboard';
import { SalesDashboard } from './SalesDashboard';
import { EmployeeEditor } from './EmployeeEditor';
import { InfoEditor } from './InfoEditor';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => <Routes>
  <Route path="/" Component={Home} />
  <Route path="/addItem" Component={ItemEditorDashboard} />
  <Route path="/ProductsList" Component={ProductsDashboard} />
  <Route path="/Departments" Component={DepartmentsDashboard} />
  <Route path="/Products/:id" Component={ProductDisplay} />
  <Route path="/Sales" Component={SalesDashboard} />
  <Route path="/addEmployee" Component={EmployeeEditor} />
  <Route path="/editEmployee" Component={InfoEditor} />
</Routes>;

export default App;
