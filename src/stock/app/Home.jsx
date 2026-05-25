import { Link } from 'react-router-dom';

export const Home = () => {
    return (<>
        <div className="container">
            <div>
                <Link to="/stock/ProductsList">
                    <button className="btn btn-block btn-primary btn-lg">Inventory</button>
                </Link>
            </div>
            <div className="row">
                <div className="col">
                    <Link to="/stock/Departments">
                        <button className="btn btn-block btn-secondary btn-lg">Departments</button>
                    </Link>
                </div>
                <div className="col">
                    <Link to="/stock/Sales">
                        <button className="btn btn-block btn-secondary btn-lg">Sales</button>
                    </Link>
                </div>
            </div>
        </div>
    </>
    );
}
