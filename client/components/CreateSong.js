import React, { useState } from "react";

import { useMutation } from "@apollo/react-hooks";
import { useHistory, Link } from "react-router-dom";
import { GET_SONG_LIST } from "../queries/fetchSongs";
import { ADD_SONG } from "../queries/fetchSong";

const CreateSong = () => {
  const [title, setTitle] = useState("");
  const history = useHistory();

  const [addSong, { data, loading, error }] = useMutation(ADD_SONG);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    addSong({
      variables: { title: title },
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
        <input onChange={handleChange} value={title} />
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
