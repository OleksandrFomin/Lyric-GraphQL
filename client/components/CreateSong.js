import React from "react";

import { useMutation } from "@apollo/react-hooks";
import { useHistory, Link } from "react-router-dom";
import { GET_SONG_LIST } from "../queries/fetchSongs";
import { ADD_SONG } from "../mutations/addSongs";
import useFormInput from "../hooks/useFormInput";

const CreateSong = () => {
  const { inputValue, handleInputChange } = useFormInput();

  const history = useHistory();
  const [addSong, { data, loading, error }] = useMutation(ADD_SONG);

  const onFormSubmit = (e) => {
    e.preventDefault();
    addSong({
      variables: { title: inputValue },
      refetchQueries: [{ query: GET_SONG_LIST }], //refetches song list after mutation (downside: 2 newtwork requests). May also accept 'variables' if refetching  requires a parameter
    });
  };

  if (data && !loading && !error) {
    history.push("/");
  }

  return (
    <div style={style.container}>
      <Link to="/">Back</Link>
      <h3>Create a new song</h3>
      <form onSubmit={onFormSubmit}>
        <label>Song title:</label>
        <input onChange={handleInputChange} value={inputValue} />
        <button>Add Song</button>
      </form>
    </div>
  );
};

const style = {
  container: {
    margin: "0 10px",
  },
};

export default CreateSong;
