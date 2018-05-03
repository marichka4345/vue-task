// @flow

export type NoteMode = 'NEW' | 'ARCHIEVED' | 'COMMON'

export interface INote {
    id: number;
    title: string;
    body: string;
    archieved?: boolean;
}
