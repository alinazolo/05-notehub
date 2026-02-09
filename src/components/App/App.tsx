import css from "./App.module.css"
import { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import {fetchNotes} from "../../services/noteService";
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import NoteForm from "../NoteForm/NoteForm";
import Pagination from "../Pagination/Pagination";
import { useDebouncedCallback } from "use-debounce";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";


import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";



export default function App() {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
 const [perPage] = useState(12);
 const debouncedSetQuery = useDebouncedCallback(
  (value: string) => {
setQuery(value);
setCurrentPage(1);
    },
    300,
);

  const {data, isLoading, isError, isSuccess} =  useQuery({
    queryKey: ["notes", query, currentPage, perPage],
    queryFn: () => fetchNotes(
      {search: query, page: currentPage, perPage}),
      placeholderData: keepPreviousData,
  });
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
     <>
  <div className={css.app}>
	<header className={css.toolbar}>
		<SearchBox text={query} onSearch={debouncedSetQuery}/>
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
  {isLoading && <Loader/>}
  {isError && <ErrorMessage/>}
</div>
{data && isSuccess && data.notes.length > 0 && <NoteList notes={data.notes}/>}
     </>  
  );
}
