import {gql} from '@apollo/client';

export const GET_TASKS = gql`
    query {
        tasks {
            id
            title
            body
            subTask {
                id
                title
                body
                node {
                    id
                    title
                }
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
