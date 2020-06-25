import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { GET_SONG_LIST } from "../queries/fetchSongs";
import { DELETE_SONG } from "../mutations/deleteSong";

const SongList = () => {
  const { data, loading, error } = useQuery(GET_SONG_LIST);
  const [deleteSong] = useMutation(DELETE_SONG);

  const onDeleteHandler = (id) => {
    deleteSong({
      variables: { id: id },
      refetchQueries: [{ query: GET_SONG_LIST }],
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error || !data) return <p>ERROR</p>;

  return (
    <div>
      <ul style={style.listContainer}>
        {data.songs.map(({ id, title }) => {
          return (
            <li key={id} style={style.listItem}>
              <div>{title}</div>
              <button onClick={() => onDeleteHandler(id)}>Delete</button>
            </li>
          );
        })}
      </ul>
      <Link to="song/new">
        <button style={style.btn}>+</button>
      </Link>
    </div>
  );
};

const style = {
  listContainer: {
    margin: "10px",
  },
  listItem: {
    padding: "20px 0",
    borderBottom: "1px solid black",
  },
  btn: {
    display: "block",
    marginLeft: "auto",
    marginRight: "30px",
    marginTop: "30px",
    width: "70px",
    height: "70px",
    borderRadius: "50%",
  },
};

export default SongList;
