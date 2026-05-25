import { ReactNode } from "react";
import { connect } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ component, auth, children: ReactNode, ...rest }) => {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				auth ? (
					children
				) : (
					<Navigate
						to={{
							pathname: "/auth"
						}}
						state={{ from: location }}
					/>
				)
			}
		/>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
