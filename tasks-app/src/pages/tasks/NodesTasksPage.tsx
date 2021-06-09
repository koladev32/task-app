import React, { useState } from "react";
import ListTasks from "../../components/ListTasks";
import {useMutation, useQuery} from "@apollo/client";
import { GET_NODE_TASKS } from "../../apollo/queries";
import { useParams } from "react-router-dom";
import {CREATE_TASK} from "../../apollo/mutations";

const NodesTasksPage: React.FC = () => {
  const { nodeId }: any = useParams();
  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [{
      query: GET_NODE_TASKS,
      variables: {
        nodeId: nodeId
      }
    }]
  });

  const dataTasks = useQuery(GET_NODE_TASKS, { variables: { nodeId: nodeId } });

  function handleAdd() {
    createTask({
      variables: {
        node: nodeId,
        body: "New Task added",
        title: "Untitled",
      },
    }).then((res) => console.log(res.data));
  }

  return (
    <div className="bg-blend-darken h-screen w-screen overflow-x-auto justify-center pt-6 items-center">
      <ListTasks tasks={dataTasks.data?.nodeTasks} handleAdd={handleAdd} />
    </div>
  );
};

export default NodesTasksPage;
