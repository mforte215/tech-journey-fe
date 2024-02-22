import {gql} from '@apollo/client';

export const QUERY_USERS = gql`query Query {
    users {
      _id
      username
      email
      password
    }
  }
  `

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_BLOGS = gql`query Blogs {
  blogs {
    _id
    image
    title
    subtitle
    date
    author {
      _id
      username
    }
  }
}`

export const QUERY_BLOG = gql`query Blog($id: ID) {
  blog(_id: $id) {
    _id
    image
    title
    subtitle
    content
    author {
      username
    }
    date
  }
}`

export const QUERY_MY_BLOGS = gql`query Me {
  me {
    _id
    image
    title
    subtitle
    content
    author {
      username
    }
    date
  }
}`