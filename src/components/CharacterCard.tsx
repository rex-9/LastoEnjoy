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
        className="w-1/4 h-36 rounded-lg pb-4"
        style={{
          backgroundColor: `#${HelperService.numberToColor(id)}`,
        }}
      >
        <img
          className="w-full h-[80%] object-cover rounded-t-lg bg-blue-400 mb-3"
          src={character.image}
          alt=""
        />
        <div>{character.name}</div>
        {isModalOpen && (
          <CharacterModal character={character} closeModal={closeModal} />
        )}
      </article>
    </>
  );
};

export default CharacterCard;
