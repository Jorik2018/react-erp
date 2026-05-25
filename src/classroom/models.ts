export interface Obj {
    [key: string]: string | number | boolean | Obj
}

export interface Course {
    id: string,
    [key: string]: string | number
}

export interface Profile {
    id: string, src: string,
    description: string, accountType: string, name: string,
    file: { key: string }
}

export interface Student {
    id: string,
    name: string,
    year: number,
    courses: Course[],
    grade: string,
}

export interface StudentFormated {
    studentId: string,
    studentName: string,
    studentYear: number,
    studentCourse: Course[],
    studentGrade: string,
}