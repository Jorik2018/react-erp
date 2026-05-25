export interface Contact {
    id?: string,
    name?: string, email?: string, phone?: string
}

export type Dispatch = (args: { [key: string]: string }) => void;
