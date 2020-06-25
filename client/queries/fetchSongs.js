import gql from "graphql-tag";

export const GET_SONG_LIST = gql`
  query GetSongsList {
    songs {
      id
      title
    }
  }
`;
