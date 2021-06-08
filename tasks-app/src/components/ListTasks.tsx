import React from "react";
import Task, { TaskProps } from "./Task";

export interface ListTasksProps {
  tasks: Array<TaskProps> | null;
  handleAdd: () => void;
}
const ListTasks: React.FC<ListTasksProps> = (
  props: ListTasksProps
): React.ReactElement => {
  if (!props || !props.tasks) {
    return <div>Loading</div>;
  }
  return (
    <div className="w-full space-y-6">
      <h3 className="text-2xl">Task</h3>
      <ul className="space-y-4 list-disc">
        {props.tasks &&
          props.tasks.map((task, idx) => {
            return (
              <li key={idx}>
                <Task
                  node={task.node}
                  body={task.body}
                  subTasks={task.subTasks}
                  id={task.id}
                />
              </li>
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
