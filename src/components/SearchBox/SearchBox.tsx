import css from "./SearchBox.module.css";

    interface SearchBarProps {
    text: string;
    onSearch: (newSearchQuery: string) => void;
}

export default function SearchBar({text, onSearch}: SearchBarProps ) {
const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
}


    return (
    <input
  className={css.input}
  defaultValue={text}
  type="text"
  placeholder="Search notes"
  onChange={handleChange}
 />

);
}