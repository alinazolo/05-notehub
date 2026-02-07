import axios from 'axios';

import type { Note, NoteId } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api/";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
 
export const fetchNotes = async () => {
  const {data} = await axios.get<FetchNotesResponse>("/notes",
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    }
  );
  return data;
};

export const deleteNote = async (id: NoteId) => {
const { data } = await axios.delete<Note>(`/notes/${id}`,
     {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    }
);
return data;
};