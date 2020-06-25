import gql from "graphql-tag";

export const ADD_LYRICS = gql`
  mutation AddLyrics($content: String, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      title
      lyrics {
        id
        content
      }
    }
  }
`;
