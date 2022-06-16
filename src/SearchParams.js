import { useState, useEffect,  } from "react";
import Results from "./Results";
import useBreedList from "./useBreedList";
import { useSelector, useDispatch } from "react-redux";
import changeAnimal from "./actionCreators/changeAnimal";
import changeTheme from "./actionCreators/changeTheme";
import changeLocation from "./actionCreators/changeLocation";
import changeBreed from "./actionCreators/changeBreed";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {

  const animal = useSelector(state => state.animal);
  const location = useSelector(state => state.location);
const breed = useSelector(({breed}) => breed)
const theme = useSelector((state)=> state.theme)
const dispatch = useDispatch() ;

  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();

    setPets(json.pets);
  }

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
      className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            type="text"
            value={location}
            placeholder="Location"
            onChange={(e) => dispatch(changeLocation(e.target.value))}
            className="w-60 mb-5 block"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
          className="w-60 mb-5 block"
            id="animal"
            value={animal}
            onChange={(e) => {
              dispatch(changeAnimal(e.target.value));
            }}
            onBlur={(e) => {
              dispatch(changeAnimal(e.target.value));
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
          className="w-60 mb-5 block disabled:opacity-50"
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => dispatch(changeBreed(e.target.value))}
            onBlur={(e) => dispatch(changeBreed(e.target.value))}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          Theme
          <select
          className="w-60 mb-5 block"
            value={theme}
            onChange={(e) =>dispatch(changeTheme(e.target.value))}
            onBlur={(e) =>dispatch(changeTheme(e.target.value))}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button className="rounded px-6 py-2 text-white hover:opacity-50 border-none" style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
