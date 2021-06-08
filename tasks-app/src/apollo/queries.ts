import { gql } from "@apollo/client";

export const GET_NODE_TASKS = gql`
  query TaskType($nodeId: ID!){
    nodeTasks (nodeId: $nodeId) {
      id  
      title
      body
      parent {
        id
        title
      }
      subTasks {
        id
        title
        body
      }
      node {
        id
        title
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
  query TaskType($taskId: ID!) {
    subTasks(taskId: $taskId) {
      title
      body
      parent {
        id
        title
      }
      subTasks {
        id
        body
        title
        parent {
          id
          title
        }
      }
      node {
      id
      title
      }
    }
  }
`;
