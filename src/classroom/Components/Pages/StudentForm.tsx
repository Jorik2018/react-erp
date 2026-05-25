import { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createStudents } from "../../graphql/mutations";
import "./UploadCourse.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

function StudentForm() {
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [studentCourseId, setStudentCourseId] = useState("");
  const [year, setYear] = useState("");
  const [grade, setGrade] = useState("");
  const [credits, setCredits] = useState("");
  const [alert, setAlert] = useState(false);

  const sendImageToDB = (image: { [key: string]: string }) => {
    API.graphql(graphqlOperation(createStudents, image))
      .then(() => console.log("image payload", image))
      .catch((err: Error) => console.error("db write error", err));
  };

  const handleFormSubmit = () => {
    console.log("inside handleFormSubmit");
    //storing image in S3
    const image = {
      id: studentId,
      studentCoursesId: studentCourseId,
      name: name,
      year: year,
      grade: grade,
      credits: credits,
    };
    console.log("image payload", image);
    setAlert(true);
    sendImageToDB(image);
  };

  return (
    <div className="jumbotron ">
      alert{alert}
      <Form onSubmit={handleFormSubmit}>
        <h1> Add Student </h1>
        <FormGroup>
          <Label for="Name">Name</Label>
          <Input
            type="text"
            value={name}
            placeholder=""
            onChange={({ target }) => setName(target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="ID">ID</Label>
          <Input
            type="text"
            value={studentId}
            placeholder=""
            onChange={({ target }) => setStudentId(target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Course ID">Course ID</Label>
          <Input
            type="text"
            value={studentCourseId}
            placeholder=""
            onChange={({ target }) => setStudentCourseId(target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Labels">Year</Label>
          <Input
            type="text"
            value={year}
            placeholder=""
            onChange={({ target }) => setYear(target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Grade">Grade</Label>
          <Input
            type="text"
            value={grade}
            placeholder=""
            onChange={({ target }) => setGrade(target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="credits">Credits</Label>
          <Input
            type="text"
            value={credits}
            placeholder=""
            onChange={({ target }) => setCredits(target.value)}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </div>
  );
}

export default StudentForm;
