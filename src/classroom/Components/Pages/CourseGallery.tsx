import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import DeleteIcon from "@mui/icons-material/Delete";
import "./CourseGallery.css";
import { Course } from "../../models";

function CourseGallery(props:{courses:Course[],deleteCourse:(id:string)=>void}) {
  return (
    <div className=" card-list ">
      {props.courses.map(course => (
        <div className="" key={course.id}>
          <Card className="jumbotron m-2" style={{ backgroundColor: "pink" }}>
            <CardBody>
              <CardTitle tag="h5">{course.coursename}</CardTitle>

              <CardText>
                Course Description: {course.coursedescription}
              </CardText>
              <CardText>Category: {course.category}</CardText>
              <CardText>
                Students Enrolled: {course.studentsenrolled}
              </CardText>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Created By : {course.creator}
                <br />
                last Updated :{course.updatedAt}
              </CardSubtitle>
              <CardSubtitle>
                <DeleteIcon
                  onClick={() => {
                    props.deleteCourse(course.id);
                  }}
                />
              </CardSubtitle>
            </CardBody>
          </Card>
          <br />
        </div>
      ))}
    </div>
  );
}

export default CourseGallery;
