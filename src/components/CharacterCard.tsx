import { useState } from "react";
import CharacterModal from "./CharacterModal";
import HelperService from "../services/helperService";

const CharacterCard = ({ character }: { character: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = (event: any) => {
    event.stopPropagation();
    console.log("close modal");
    setIsModalOpen(false);
    console.log(isModalOpen);
  };

  const id = character.species[0]?.split("/")[5] ?? "0";

  return (
    <>
      <article
        onClick={() => setIsModalOpen(true)}
        className="w-1/5 h-48 cursor-pointer rounded-lg pb-4 transition duration-300 ease-in-out 
        saber-ring
        hover:-translate-y-1 hover:scale-110 hover:ring hover:ring-red-500 hover:animate-pulse"
        style={{
          backgroundColor: `#${HelperService.numberToColor(id)}`,
        }}
      >
        <img
          className="w-full h-[80%] object-cover rounded-t-lg bg-blue-400 mb-3"
          src={character.image}
          alt="image"
        />
        <div>{character.name}</div>
      </article>
      {isModalOpen && (
        <CharacterModal character={character} closeModal={closeModal} />
      )}
    </>
  );
};

export default CharacterCard;
