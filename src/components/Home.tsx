import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import CharacterList from "../components/CharacterList";
import SwapiService from "../services/swapiService";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Pagination from "../components/Pagination";
import SearchFilter from "../components/SearchFilter";
import HelperService from "../services/helperService";

function Home() {
  const [characters, setCharacters] = useState([]);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const fetchCharacters = (context: { page: string; searchTerm: string }) => {
    SwapiService.getCharacters({
      page: context.page,
      searchTerm: context.searchTerm,
    })
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

  useEffect(() => {
    fetchCharacters({ page: "1", searchTerm: "" });
  }, []);

  const navToPage = (page: number) => {
    setIsLoading(true);
    fetchCharacters({ page: page.toString(), searchTerm: "" });
    setCurrentPage(page);
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-0 flex justify-between p-4 w-full left-0 bg-gray-800">
        <ul className="flex justify-center items-center gap-4">
          <li>
            <Link
              className={window.location.pathname === "/" ? `active-link` : ""}
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <button
              className="hover:text-blue-500 hover:underline"
              onClick={logout}
            >
              Logout
            </button>
          </li>
        </ul>
        <SearchFilter
          setCharacters={setCharacters}
          setPages={setPages}
          setIsLoading={setIsLoading}
          setIsError={setIsError}
          setErrorMessage={setErrorMessage}
        />
      </nav>
      <section className="flex flex-col justify-center items-center gap-4 h-screen">
        {isLoading && !isError ? (
          <Loading />
        ) : (
          <div>
            <CharacterList characters={characters} />
            <Pagination
              pages={pages}
              currentPage={currentPage}
              navToPage={navToPage}
            />
          </div>
        )}
        {isError && <Error message={errorMessage} />}
      </section>
    </>
  );
}

export default Home;
