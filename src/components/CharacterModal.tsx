import { useEffect, useState } from "react";
import SwapiService from "../services/swapiService";

const CharacterModal = ({
  character,
  closeModal,
}: {
  character: any;
  closeModal: any;
}) => {
  const [homeworld, setHomeworld] = useState({
    name: "",
    terrain: "",
    climate: "",
    population: "",
  });

  useEffect(() => {
    SwapiService.getHomeworld(character.homeworld).then((data) =>
      setHomeworld(data)
    );
  }, [character.homeworld]);

  return (
    <>
      <div className="fixed top-[20%] left-[40%] bg-purple-900 p-8 rounded-lg">
        <h2 className="text-xl font-bold font-quicksand">{character.name}</h2>
        <div className="flex flex-row items-start my-4">
          <div className="text-start">
            <p className="label">Height:</p>
            <p className="label">Mass:</p>
            <p className="label">Date added:</p>
            <p className="label">Number of films:</p>
            <p className="label">Birth year:</p>
            <h3 className="label">Homeworld:</h3>
            <p className="label">Terrain:</p>
            <p className="label">Climate:</p>
            <p className="label">Number of residents:</p>
          </div>
          <div className="text-end">
            <p>{character.height}m</p>
            <p>{character.mass}kg</p>
            <p>{new Date(character.created).toLocaleDateString()}</p>
            <p>{character.films.length}</p>
            <p>{character.birth_year}</p>
            <h3>{homeworld.name}</h3>
            <p>{homeworld.terrain}</p>
            <p>{homeworld.climate}</p>
            <p>{homeworld.population}</p>
          </div>
        </div>
        <p>{character.species[0]}</p>
        <button onClick={(e) => closeModal(e)}>Close</button>
      </div>
    </>
  );
};

export default CharacterModal;
