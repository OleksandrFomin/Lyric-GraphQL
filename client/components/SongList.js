import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { GET_SONG_LIST } from "../queries/fetchSongs";
import { DELETE_SONG } from "../mutations/deleteSong";

const SongList = () => {
  const {
    data: songListData,
    loading: songListLoading,
    error: songListError,
  } = useQuery(GET_SONG_LIST);

  const [deleteSong] = useMutation(DELETE_SONG);

  const onDeleteHandler = (id) => {
    deleteSong({
      variables: { id: id },
      refetchQueries: [{ query: GET_SONG_LIST }],
    });
  };

  if (songListLoading) return <div>Loading...</div>;
  if (songListError || !songListData) return <p>ERROR</p>;

  return (
    <div style={style.container}>
      <ul style={style.listContainer}>
        {songListData.songs.map(({ id, title }) => {
          return (
            <li key={id} style={style.listItem}>
              <Link to={`/song/${id}`}>
                <div>{title}</div>
              </Link>
              <button onClick={() => onDeleteHandler(id)}>Delete</button>
            </li>
          );
        })}
      </ul>
      <Link to="song/new" style={style.btnWrapper}>
        <button style={style.btn}>+</button>
      </Link>
    </div>
  );
};

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
  },

  listContainer: {
    margin: "10px 30px",
  },
  listItem: {
    padding: "20px 0",
    borderBottom: "1px solid black",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  btnWrapper: {
    marginLeft: "auto",
    marginRight: "20px",
    marginTop: "20px",
  },

  btn: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    backgroundColor: "red",
    color: "white",
  },
};

export default SongList;
