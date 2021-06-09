import { gql } from "@apollo/client";

export const TASK_ADDED_SUBSCRIPTION = gql`
  subscription{
  tasks{
    id,
    title,
    body,
    node {
    id
  }
}
`;
