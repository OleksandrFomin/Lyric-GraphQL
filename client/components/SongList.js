import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_SONG_LIST = gql`
  query GetSongsList {
    songs {
      id
      title
    }
  }
`;

// const GET_SONG = gql`
//   query GetSong($id: ID!) {
//     song(id: $id) {
//       id
//       title
//     }
//   }
// `;

const SongList = () => {
  const { data, loading, error } = useQuery(GET_SONG_LIST);
  if (loading) return <div>Loading...</div>;
  if (error || !data) return <p>ERROR</p>;

  // const handleClick = (id) => {
  //   const { data, loading, error } = useQuery(GET_SONG, { variables: { id } });
  //   console.log(data.title);
  // };

  return data.songs.map((song) => {
    return (
      <div key={song.id}>
        <button onClick={() => handleClick(song.id)}>{song.title}</button>
      </div>
    );
  });
};

export default SongList;
