import React from "react";
import Task, { TaskProps } from "./Task";
import { useHistory } from "react-router";

export interface ListTasksProps {
  tasks: Array<TaskProps> | null;
  handleAdd: () => void | null;
}
const ListTasks: React.FC<ListTasksProps> = (
  props: ListTasksProps
): React.ReactElement => {
  const history = useHistory();

  if (!props || !props.tasks) {
    return <div>Loading</div>;
  }
  return (
    <div className="w-full space-y-6 bg-white">
      <h3 className="text-xl font-bold" onClick={() => history.goBack()}>
        Previous
      </h3>
      <ul className="space-y-4 list-disc">
        {props.tasks &&
          props.tasks.map((task, idx) => {
            return (
              <Task
                node={task.node}
                body={task.body}
                subTasks={task.subTasks}
                id={task.id}
                key={idx}
              />
            );
          })}
      </ul>
      <button type="button" onClick={props.handleAdd}>
        +
      </button>
    </div>
  );
};

export default ListTasks;
