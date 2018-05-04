export type NoteMode = 'NEW' | 'ARCHIEVE' | 'COMMON'

export interface INote {
    id: number;
    title: string;
    body: string;
    archieved?: boolean;
}
