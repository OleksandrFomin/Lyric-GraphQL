import gql from "graphql-tag";

export const ADD_SONG = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;
