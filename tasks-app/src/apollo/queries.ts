import {gql} from "@apollo/client";

export const GET_TASKS = gql`
  query{
  nodeTasks(nodeId: 1){
    title,
    body,
    parent {
      id
    },
    subTasks {
      id,
      title,
      body
    },
    node{
      id
    }
  }
}
`;

export const GET_NODES = gql`
  query {
    nodes {
      id
      title
    }
  }
`;
