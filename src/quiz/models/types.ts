export interface QuestionType {
    id: string,
    question: string,
    options: { [key: string]: string },
    timerEndTime: Date,
    timerTotalTime: number
}

export interface QEvent {
    target: { name: string, value: string },
    preventDefault: () => void
}

export type Room = {
    id: string,
    name: string,
    description: string;
}

export type QuizAppStates = {
    status: string,
    username: string,
    isQM: boolean,
    roomstatus: string,
    question: string,
    options: { [key: string]: string },
    timerEndTime: Date,
    timerTotalTime: number,
    userlist: string[],
    roomcodeList: Room[],
    questionList: QuestionType[],
    roomcode: string,
    result: {
        username: string;
        total: number;
    }[]
}