import { gql } from "@apollo/client";

export const GET_NODE_TASKS = gql`
  query TaskType($nodeId: ID!){
    nodeTasks (nodeId: $nodeId) {
      title
      body
      parent {
        id
      }
      subTasks {
        id
        title
        body
      }
      node {
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

export const GET_TASK_SUBTASKS = gql`
  query {
    subTasks(taskId: 2) {
      title
      body
      parent {
        id
      }
      subTasks {
        id
        body
        title
        parent {
          id
        }
      }
    }
  }
`;
