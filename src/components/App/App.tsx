import css from "./App.module.css"
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import {fetchMovies} from "../../services/movieService";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';




export default function App() {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {data, isLoading, isError, isSuccess} =  useQuery({
    queryKey: ["movies", query, currentPage],
    queryFn: () => fetchMovies(query, currentPage),
    enabled: query.trim().length > 0,
    placeholderData: keepPreviousData,
  });
  const handleSearch = (newQuery: string) => {
setQuery(newQuery);
setCurrentPage(1);
  }
  
  useEffect(() => {
if(data && data.results.length === 0) {
  toast.error("No movies found for your request");
}
  }, [data])
 

  return (
     <>
     <Toaster/>
     <SearchBar onSubmit={handleSearch}/>
     {isSuccess && data.results.length > 0 && data.total_pages > 1 && ( 
<ReactPaginate
pageCount={data.total_pages}
pageRangeDisplayed={5}
marginPagesDisplayed={1}
onPageChange={({ selected }) => setCurrentPage(selected + 1)}
forcePage={currentPage - 1}
containerClassName={css.pagination}
activeClassName={css.active}
nextLabel="→"
previousLabel="←"
renderOnZeroPageCount={null}
/>
)}
     {isLoading && <Loader/>}
     {isError && <ErrorMessage/>}
     {isSuccess && data && data.results.length > 0 && <MovieGrid onSelect={setSelectedMovie} movies={data.results}/>}
     {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
     </>  
  );
}
