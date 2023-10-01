import { useState } from "react";
import SwapiService from "../services/swapiService";
import HelperService from "../services/helperService";

type Props = {
  setCharacters: Function;
  setPages: Function;
  setIsLoading: Function;
  setIsError: Function;
  setErrorMessage: Function;
};

type State = {
  searchTerm: string;
  filters: {
    homeworld: string;
    film: string;
    species: string;
  };
};

const SearchFilter = ({
  setCharacters,
  setPages,
  setIsLoading,
  setIsError,
  setErrorMessage,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState<State["searchTerm"]>("");
  // const [filters, setFilters] = useState({
  //   homeworld: "",
  //   film: "",
  //   species: "",
  // });

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    SwapiService.getCharacters({ page: "", searchTerm: searchTerm })
      .then((data: any) => {
        setCharacters(HelperService.generateCharacterPic(data.results));
        setPages(HelperService.calcPages(data.count));
        setIsLoading(false);
        setIsError(false);
      })
      .catch((e: any) => {
        setIsError(true);
        setErrorMessage(e.message);
      });
  };

  // const handleFilterChange = (event: any) => {
  //   setFilters({ ...filters, [event.target.name]: event.target.value });
  // };

  return (
    <form className="text-black flex items-center gap-4 fixed right-0 top-0">
      <input
        type="text"
        name="search"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search characters..."
        className="searchBar"
      />
      <button type="button" className="btn text-white" onClick={handleSearch}>
        Search
      </button>
      {/* <select
        name="homeworld"
        value={filters.homeworld}
        onChange={handleFilterChange}
        className="filters"
      >
        Options for homeworld filter
      </select>
      <select
        name="film"
        value={filters.film}
        onChange={handleFilterChange}
        className="filters"
      >
        Options for film filter
      </select>
      <select
        name="species"
        value={filters.species}
        onChange={handleFilterChange}
        className="filters"
      >
        Options for species filter
      </select> */}
    </form>
  );
};

export default SearchFilter;
