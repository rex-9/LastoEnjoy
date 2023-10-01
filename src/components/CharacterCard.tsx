import { useState } from "react";
import CharacterModal from "./CharacterModal";

const CharacterCard = ({ character }: { character: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = (event: any) => {
    event.stopPropagation();
    console.log("close modal");
    setIsModalOpen(false);
    console.log(isModalOpen);
  };

  return (
    <>
      <article
        onClick={() => setIsModalOpen(true)}
        className="w-1/4 bg-black rounded-lg"
      >
        <div>CharacterCard</div>
        <img src={character?.image} alt="" />
        <div>{character.name}</div>
        {isModalOpen && (
          <CharacterModal character={character} closeModal={closeModal} />
        )}
      </article>
    </>
  );
};

export default CharacterCard;
