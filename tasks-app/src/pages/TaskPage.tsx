import React, { useState } from "react";
import ListTasks from "../components/ListTasks";
import { useQuery } from "@apollo/client";
import { GET_NODE_TASKS } from "../apollo/queries";
import { TaskProps } from "../components/Task";
import { useParams } from "react-router-dom";

const TaskPage: React.FC = () => {
  const { nodeId }: any = useParams();

  const dataTasks = useQuery(GET_NODE_TASKS, { variables: { nodeId: nodeId } });
  const [tasks, setTasks] = useState<Array<TaskProps> | null>([]);

  function handleAdd() {
    // @ts-ignore
    const values = [...tasks];
    values.push({
      id: Math.floor(Math.random() * 101),
      node: { id: Math.floor(Math.random() * 101), title: "" },
      subTask: [],
      title: "",
      body: "",
    });
    // @ts-ignore
    setTasks(values);
  }

  return (
    <div className="bg-blend-darken h-screen justify-center pt-6 items-center">
      <ListTasks tasks={dataTasks.data?.nodeTasks} handleAdd={handleAdd} />
    </div>
  );
};

export default TaskPage;
