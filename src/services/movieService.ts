import axios from 'axios';

import type { Movie } from "../types/movie";
 
interface MoviesResponse {
   results: Movie[];
  total_pages: number;
}

export const fetchMovies = async(query: string, page: number): Promise<MoviesResponse> => {
const { data } = await axios.get<MoviesResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        query: query,
        page,
      },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    }
);
return data;
};
