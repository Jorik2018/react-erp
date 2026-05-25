export interface Class {
    id: string,
    teacher: string,
    name: string
}

export interface TUser {
    class_name?: string;
    id: number;
    name: string;
    photo?: string;
    status?: string;
    username: string;
}

export interface School {
    id: number,
    school_id: string,
    name: string,
    manager: string,
    image: string,
    status: string,
    classes: Class[]
}
export interface Meeting {
    meetingID: string,
    meetingName: string,
    participantCount: number
}
export interface UserData {
    githubUsername: string,
    name: string
}