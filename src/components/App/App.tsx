import css from "./App.module.css"
import { useEffect, useState } from "react";
import SearchBar from "../SearchBox/SearchBox";
import {fetchNotes} from "../../services/noteService";
import toast, { Toaster } from 'react-hot-toast';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import type { Note } from "../../types/note";
import NoteForm from "../NoteForm/NoteForm";

import NoteList from "../NoteList/NoteList";



export default function App() {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const {data, isLoading, isSuccess} =  useQuery({
    queryKey: ["notes", query, currentPage],
    queryFn: fetchNotes,
  });
 

  return (
     <>
  <div className={css.app}>
	<header className={css.toolbar}>
		{/* Компонент SearchBox */}
		{/* Пагінація */}
	
  </header>
  
</div>
{data && isSuccess && data.notes.length > 0 && <NoteList notes={data.notes}/>}
     </>  
  );
}
