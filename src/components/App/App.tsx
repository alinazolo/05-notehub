import css from "./App.module.css"
import { useEffect, useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import {fetchNotes} from "../../services/noteService";
import toast, { Toaster } from 'react-hot-toast';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import type { Note } from "../../types/note";
import NoteForm from "../NoteForm/NoteForm";
import Pagination from "../Pagination/Pagination";
import { useDebouncedCallback } from "use-debounce";


import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";



export default function App() {
  const [search, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
 const [perPage] = useState(12);
 const debouncedSetQuery = useDebouncedCallback(setQuery, 300);

  const {data, isLoading, isSuccess} =  useQuery({
    queryKey: ["notes", search, currentPage, perPage],
    queryFn: () => fetchNotes(
      {search, page: currentPage, perPage}),
  });

  const handleSearch = (newQuery: string) => {
setQuery(newQuery);
setCurrentPage(1);
  }
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
     <>
  <div className={css.app}>
	<header className={css.toolbar}>
		<SearchBox text={search} onSearch={debouncedSetQuery}/>
    {isSuccess && (
    <Pagination page={currentPage} totalPages={data.totalPages} onPageChange={setCurrentPage}/>
    )}
    <button className={css.button} onClick={openModal}>Create note +</button>
    {isModalOpen && (
      <Modal onClose={closeModal}>
        <NoteForm onClose={closeModal}/>
      </Modal>
    )}
  </header>
  
</div>
{data && isSuccess && data.notes.length > 0 && <NoteList notes={data.notes}/>}
     </>  
  );
}
