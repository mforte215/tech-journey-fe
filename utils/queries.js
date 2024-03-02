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

export const QUERY_BLOGS = gql`query Query {
  blogs {
    _id
    image
    title
    subtitle
    content
    author {
      _id
      username
    }
    date
    tags {
      _id
      name
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
      _id
      username
      email
    }
    date
    tags {
      _id
      name
    }
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

export const QUERY_BLOGS_BY_USER = gql`query UserBlogs($id: ID) {
  userBlogs(_id: $id) {
    _id
    image
    title
    subtitle
    author {
      username
      email
    }
    date
  }
}`;

export const QUERY_SINGLE_BLOG_BY_USER = gql`query SingleBlogByMe($blogId: ID!) {
  singleBlogByMe(blogId: $blogId) {
    _id
    image
    title
    subtitle
    content
    author {
      username
      email
    }
    date
    tags {
      _id
      name
    }
  }
}`;

export const QUERY_DOES_USER_EXIST = gql`query Query($email: String) {
  checkIfAccountExists(email: $email)
}`

export const QUERY_BLOGS_BY_TAG = gql`query BlogsByTag($tagName: String) {
  blogsByTag(tagName: $tagName) {
    _id
    image
    title
    subtitle
    content
    author {
      username
      _id
    }
    date
    tags {
      _id
      name
    }
  }
}`