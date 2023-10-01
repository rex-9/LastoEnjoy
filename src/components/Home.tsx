import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CharacterList from "../components/CharacterList";
import SwapiService from "../services/swapiService";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Pagination from "../components/Pagination";

function Home() {
  const [characters, setCharacters] = useState([]);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const user = localStorage.getItem("user") ?? null;

  const generateCharacterPic = (characters: any) => {
    characters = characters.map((character: any, index: number) => {
      character.image = `https://picsum.photos/id/${index}/100/100`;
      return character;
    });

    setCharacters(characters);
  };

  const calcPages = (data: any) => {
    const totalPage = Math.ceil(data.count / 10);
    const pages: number[] = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const fetchCharacters = (page: number = 1) => {
    SwapiService.getCharacters(page)
      .then((data: any) => {
        generateCharacterPic(data.results);
        setPages(calcPages(data));
        setIsLoading(false);
      })
      .catch((e: any) => {
        setIsError(true);
        setErrorMessage(e.message);
      });
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const navToPage = (page: number) => {
    setIsLoading(true);
    fetchCharacters(page);
    setCurrentPage(page);
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      <nav className="fixed top-0 p-4 w-full">
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
      <section>
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
