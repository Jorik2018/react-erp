import { useState, useEffect } from "react";
import StudentsTable from "./StudentsTable";
import {
  listStudentss,
} from "../../graphql/queries";
import StudentForm from "./StudentForm";
import { Student, StudentFormated } from "../../models";
import { generateClient } from "aws-amplify/api";

export default function Cohorts() {

  const client = generateClient();

  useEffect(() => {
    getallStudentsToState();
  }, []);

  const [students, setStudents] = useState([] as StudentFormated[]);

  const getallStudentsToState = () => {
    console.log(client.graphql({ query: listStudentss }));
    const result = { data: { listStudentss: { items: [] as Student[] } } }
    toFormatedStudents(result.data.listStudentss.items)
      .then((studentArray) => {
        setStudents(studentArray);
      });
  };

  const toFormatedStudents = (students: Student[]) => Promise.resolve(students.map(
    ({ id, name, year, courses, grade }: Student) => (({
      studentId: id,
      studentName: name,
      studentYear: year,
      studentCourse: courses,
      studentGrade: grade,
    }))
  ));

  return (
    <div>
      <StudentForm />
      <h2>Cohorts</h2>
      <StudentsTable students={students} />
    </div>
  );

}
