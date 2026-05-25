import { useEffect } from "react";
import { Routes, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomePage from "./pages/home-page/HomePage";
import HeaderBlock from "./components/header-block/HeaderBlock";
import FooterBlock from "./components/footer-block/FooterBlock";
import CourseDetailPage from "./pages/course-detail-page/CourseDetailPage";
import AuthPage from "./pages/auth-page/AuthPage";
import CourseLessonPage from "./pages/course-lesson-page/CourseLessonPage";
import HeroSection from "./components/hero-section/HeroSection";
import DashboardPage from "./pages/dashboard-page/DashboardPage";
import ModuleActionPage from "./pages/module-actions-page/ModuleActionPage";
import LessonActionPage from "./pages/lesson-action-page/LessonActionPage";
import UpdateLessonTeacherNotePage from "./pages/update-lesson-techers-note/UpdateLessonTeacherNotePage";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
//Auth Utils
import setAuthToken from "./util/setAuthToken";
import { loadUser } from "./redux/auth/auth.actions";
import { getAllCourse } from "./redux/course/course.actions";
import PrivateRoute from "./util/PrivateRoute";

if (localStorage.token) {
	setAuthToken(localStorage.token);
}
function App({ authState: { isAuthenticated } }: { authState: { isAuthenticated: boolean } }) {
	useEffect(() => {
		store.dispatch(loadUser());
		store.dispatch(getAllCourse());
	}, []);
	return (<>
		<HeaderBlock />
		<HeroSection />
		<Routes>
			<Route path="/" Component={HomePage} />
			<Route
				path="/auth"
				Component={() => (isAuthenticated ? <Redirect to="/" /> : <AuthPage />)}
			/>
			<Route
				path="/course-detail/:courseId"
				Component={CourseDetailPage}
			/>
			<PrivateRoute path="/dashboard">
				<DashboardPage />
			</PrivateRoute>
			<PrivateRoute path="/lesson/:courseId">
				<CourseLessonPage />
			</PrivateRoute>
			<PrivateRoute path="/course-module-action/:courseId">
				<ModuleActionPage />
			</PrivateRoute>
			<PrivateRoute path="/course-lesson-action/:courseId/:moduleId">
				<LessonActionPage />
			</PrivateRoute>
			<PrivateRoute path="/course-lesson-note-update/:courseId/:moduleId/:lessonId">
				<UpdateLessonTeacherNotePage />
			</PrivateRoute>
		</Routes>
		<FooterBlock />
	</>,
	);
}

const mapStateToProps = (state: { auth: boolean }) => ({
	authState: state.auth,
});

const ConnectedApp = connect(mapStateToProps)(App);

const App2 = () => <Provider store={store}>
	<PersistGate persistor={persistor}>

		<ConnectedApp />

	</PersistGate>
</Provider>;
export default App2;
