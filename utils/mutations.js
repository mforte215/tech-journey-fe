import {gql} from '@apollo/client';

export const LOGIN_USER = gql`mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }`;

export const ADD_USER = gql`mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }`;

export const ADD_BLOG = gql`mutation Mutation($image: String!, $title: String!, $subtitle: String!, $content: String!) {
    addBlog(image: $image, title: $title, subtitle: $subtitle, content: $content) {
      _id
      image
      title
      subtitle
      content
      author {
        _id
      }
    }
  }`

export const DELETE_BLOG = gql`mutation Mutation($removeBlogId: ID!) {
  removeBlog(removeBlogId: $removeBlogId) {
    _id
  }
}`

export const EDIT_BLOG = gql`mutation Mutation($blogId: ID!, $image: String, $title: String, $subtitle: String, $content: String) {
  editBlog(blogId: $blogId, image: $image, title: $title, subtitle: $subtitle, content: $content) {
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
  }
}`;
