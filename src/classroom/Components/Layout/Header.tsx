import { useState, useEffect } from "react";

import Dashboard from "../Pages/Dashboard";
import Courses from "../Pages/Courses";
import CourseDetail from "../Pages/CourseDetail";

import { Route, Routes } from "react-router-dom";
import { Authenticator } from '@aws-amplify/ui-react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import Cohorts from "../Pages/Cohorts";
import ProfilePage from "../Pages/ProfilePage"
import Student from "../Pages/Student"

const Header = (props: { user: { username: string } }) => {

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (props && props.user && props.user.username === "testAdmin") {
      setIsAdmin(true);
    }
  }, [isAdmin]);

  return (
    <div>
      <div>
        <Routes>
          <Navbar color="dark">
            <NavbarBrand href="/" className="text-white">
              Classroom
            </NavbarBrand>
            {isAdmin ? (
              <Nav>
                <NavItem>
                  <NavLink className="text-white" href="/">
                    Dashboard
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="text-white" href="/profile">
                    Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="text-white" href="/courses">
                    Courses
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="text-white" href="/cohorts">
                    Cohorts
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="text-white" href="/findimage">
                    Zoom
                  </NavLink>
                </NavItem>
              </Nav>
            ) : (
              <Nav>
                <NavItem>
                  <NavLink className="text-white" href="/">
                    My Courses
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="text-white" href="/profile">
                    Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="text-white" href="/student">
                    Courses
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="text-white" href="/findimage">
                    Zoom
                  </NavLink>
                </NavItem>
              </Nav>
            )}
            <NavItem className="text-white " style={{ paddingLeft: "40%" }}>
              <i className="fa fa-user " aria-hidden="true"></i>
              &nbsp;
              {props.user.username} &nbsp;
            </NavItem>
            <Authenticator>
              {({ signOut }) => (
                <button onClick={signOut}>Sign out</button>
              )}
            </Authenticator>
          </Navbar>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/student" element={<Student />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/cohorts" element={<Cohorts />} />
          <Route path="/coursedetail" element={<CourseDetail />} />
        </Routes>
      </div>
    </div>
  );
};

export default Header;
