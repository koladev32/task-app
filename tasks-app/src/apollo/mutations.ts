import {gql} from '@apollo/client';

// export const CREATE_TASK = gql`
//
// mutation {
//   createTask($title, $body, $node){
//     task{
//       id,
//       title,
//       subTask {
//         id,
//         title,
//         body
//       }
//     }
//   }
// }
// `;

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
