import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  const user = localStorage.getItem("user") ?? null;

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
    window.location.href = "/login";
  };

  return (
    <>
      <nav className="fixed top-0 p-4 w-[10%] left-0">
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
            {user ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <Link
                className={
                  window.location.pathname === "/login" ? `active-link` : ""
                }
                to="/login"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <section className="flex flex-col justify-center items-center gap-4">
        <SearchFilter
          setCharacters={setCharacters}
          setPages={setPages}
          setIsLoading={setIsLoading}
          setIsError={setIsError}
          setErrorMessage={setErrorMessage}
        />
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
