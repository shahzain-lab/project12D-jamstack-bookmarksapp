// This query is executed at run time by Apollo.
import gql from 'graphql-tag';

export const GET_BOOKMARKS = gql`
{
  bookmarks{
    id
    text
    url
  }
}
`;

export const ADD_BOOKMARK = gql`
  mutation addBookmark($text: String!, $url: String!){
      addBookmark(text: $text, url: $url){
          text
      }
  }
`;

export const DELETE_BOOKMARK = gql`
 mutation delBookmark($id: ID!){
    delBookmark(id: $id){
        text
    }
}
`;

export const UPT_BOOKMARK = gql`
 mutation uptBookmark($id: ID!, $text: String!, $url: String!){
     uptBookmark(id: $id, text: $text, url: $url){
         text
     }
 }
`;