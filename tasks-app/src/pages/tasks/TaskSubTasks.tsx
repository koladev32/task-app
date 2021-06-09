import React from "react";
import ListTasks from "../../components/ListTasks";
import { useQuery } from "@apollo/client";
import { GET_TASK_SUBTASKS } from "../../apollo/queries";
import { useParams } from "react-router-dom";

const TaskSubTasks: React.FC = () => {
  const { taskId }: any = useParams();

  const dataTasks = useQuery(GET_TASK_SUBTASKS, {
    variables: { taskId: taskId },
  });


  return (
    <div className="bg-blend-darken h-screen justify-center pt-6 items-center">
      <ListTasks tasks={dataTasks.data?.subTasks} handleAdd={() => {} } />
    </div>
  );
};

export default TaskSubTasks;
