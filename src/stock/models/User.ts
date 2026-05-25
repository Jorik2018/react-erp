export class User {

    constructor(
        public id: string,
        public type: string,
        public dept_id: number,
        public email: string,
        public password: string,
        public first: string,
        public last: string
    ) {}

}
