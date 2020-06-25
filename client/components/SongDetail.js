import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_SONG } from "../queries/fetchSong";
import useFormInput from "../hooks/useFormInput";
import { ADD_LYRICS } from "../mutations/addLyrics";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";
import { LIKE_LYRIC } from "../mutations/likeLyric";

const SongDetail = () => {
  const { inputValue, handleInputChange } = useFormInput();
  const { id } = useParams();

  const {
    data: songData,
    loading: songLoading,
    error: songError,
  } = useQuery(GET_SONG, { variables: { id } });

  const [addLyrics] = useMutation(ADD_LYRICS);
  const [likeLyric] = useMutation(LIKE_LYRIC);

  const onFormSubmit = (e) => {
    e.preventDefault();
    addLyrics({
      variables: { content: inputValue, songId: id },
      refetchQueries: [{ query: GET_SONG, variables: { id: id } }],
    });
  };

  const onLikePress = (lyricId, likes) => {
    likeLyric({
      variables: { id: lyricId },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          __typename: "LyricType",
          id: lyricId,
          likes: likes + 1,
        },
      },
    });
  };

  if (songLoading) return <div>Loading...</div>;
  if (songError || !songData) return <p>ERROR</p>;

  return (
    <div style={style.container}>
      <Link to="/">Back</Link>
      <div style={style.title}>Song title: {songData.song.title}</div>
      <LyricCreate
        onFormSubmit={onFormSubmit}
        handleInputChange={handleInputChange}
        inputValue={inputValue}
      />
      <div>Song Lyrics</div>
      <LyricList lyrics={songData.song.lyrics} onLikePress={onLikePress} />
    </div>
  );
};

const style = {
  container: {
    margin: "10px 10px",
  },
  title: {
    fontSize: "24px",
  },
};

export default SongDetail;
