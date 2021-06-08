import { gql } from "@apollo/client";

export const CREATE_TASK = gql`

mutation CreateTask($title: String!, $body: String!, $node: ID!) {
  createTask(title: $title, body: $body, node: $node){
    task{
      id,
      title,
      subTasks {
        id,
        title,
        body
      }
    }
  }
}
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $body: String, $title: String) {
    updateTask(id: $id, body: $body, title: $title) {
      task {
        id
        title
        body
      }
    }
  }
`;
