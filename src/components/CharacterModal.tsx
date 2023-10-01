const CharacterModal = ({
  character,
  closeModal,
}: {
  character: any;
  closeModal: any;
}) => {
  return (
    <>
      <div className="fixed top-0">
        <div>CharacterModal</div>
        <p>{character.name}</p>
        <button onClick={(e) => closeModal(e)}>Close</button>
      </div>
    </>
  );
};

export default CharacterModal;
