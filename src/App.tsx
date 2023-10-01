import { useEffect, useState } from "react";
import CharacterList from "./components/CharacterList";
import SwapiService from "./services/swapiService";
import Loading from "./components/Loading";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const generateCharacterPic = (characters: any) => {
    characters = characters.map((character: any, index: number) => {
      character.image = `https://picsum.photos/id/${index}/100/100`;
      return character;
    });

    setCharacters(characters);
  };

  useEffect(() => {
    SwapiService.getCharacters().then((data: any) => {
      generateCharacterPic(data.results);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <section className="bg-gray-800 text-white font-mooli flex justify-center items-center w-screen h-screen">
        {isLoading ? <Loading /> : <CharacterList characters={characters} />}
      </section>
    </>
  );
}

export default App;
