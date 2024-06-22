export interface QuestionType {
    id:string,
    question: string,
    options: {[key:string]:string},
    timerEndTime: Date,
    timerTotalTime: number
}

export interface QEvent {
    target: { value: string },
    preventDefault: () => void
}

export type QuizAppStates = {
    status: string,
    username: string,
    isQM: boolean,
    roomstatus: string,
    question: string,
    options: {[key:string]:string},
    timerEndTime: Date,
    timerTotalTime: number,
    userlist: string[],
    roomcodeList: string[],
    questionList: QuestionType[],
    roomcode: string,
    result: {
        username: string;
        total: number;
    }[]
}