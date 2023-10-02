import { render, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CharacterCard from "../components/CharacterCard.tsx";
// import "@testing-library/jest-dom/extend-expect";

// import CharacterModal from "../components/CharacterModal";

describe("CharacterModal", () => {
  it("opens with the correct person’s information when CharacterCard is clicked", async () => {
    const mockCharacter = {
      name: "Luke Skywalker",
      homeworld: "Tatooine",
      species: "Human",
      films: ["A New Hope", "The Empire Strikes Back", "Return of the Jedi"],
    };

    const { getByText, queryByText } = render(
      <>
        <CharacterCard character={mockCharacter} />
        {/* <CharacterModal character={mockCharacter} closeModal={closeModal}  /> */}
      </>
    );

    fireEvent.click(getByText("Luke Skywalker"));

    await waitFor(() => {
      expect(queryByText("Luke Skywalker")).toBeInTheDocument();
      expect(queryByText("Tatooine")).toBeInTheDocument();
      expect(queryByText("Human")).toBeInTheDocument();
      expect(queryByText("A New Hope")).toBeInTheDocument();
      expect(queryByText("The Empire Strikes Back")).toBeInTheDocument();
      expect(queryByText("Return of the Jedi")).toBeInTheDocument();
    });
  });
});
