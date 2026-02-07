export interface Note {
    id: string;
    title: string;
    content: string;
    tag: string;
}

export type NoteId = Note['id'];