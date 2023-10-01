import CharacterCard from "./CharacterCard";

const CharacterList = ({ characters }: { characters: any }) => {
  return (
    <>
      <div className="text-center">
        <div>CharacterList</div>
        <div className="flex justify-center items-center gap-8 flex-wrap">
          {characters.map((character: any) => (
            <CharacterCard character={character} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CharacterList;
