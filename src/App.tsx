import { useEffect, useState } from "react";
import CharacterList from "./components/CharacterList";
import SwapiService from "./services/swapiService";
import Loading from "./components/Loading";
import Error from "./components/Error";
import Pagination from "./components/Pagination";

function App() {
  const [characters, setCharacters] = useState([]);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  return (
    <>
      <section className="bg-gray-800 text-white font-mooli flex flex-col justify-center items-center w-screen h-screen">
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

export default App;
