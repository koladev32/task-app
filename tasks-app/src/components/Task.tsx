import React from "react";
import { NodeProps } from "./Node";
import { useMutation } from "@apollo/client";
import { UPDATE_TASK } from "../apollo/mutations";

export interface TaskProps {
  id?: number | string;
  node: NodeProps;
  body?: string;
  subTasks: Array<any>;
}

const Task: React.FC<TaskProps> = (props: TaskProps): React.ReactElement => {
  const [updateTask] = useMutation(UPDATE_TASK);

  const _handleKeyDown = (e: any, id: any) => {
    setTimeout(function () {
      updateTask({
        variables: { id: parseInt(id, 4), body: e.target.value, title: "" },
      }).then((res) => console.log(res.data));
    }, 2000);

    if (e.key === "Enter" && e.target.value.length > 0) {
      console.log("Adding   ");
    }

    if (e.key === "Backspace" && e.target.value.length <= 0) {
      console.log(props.node.id);
    }
  };
  return (
    <div className="flex flex-col space-x-2">
      <div key={`${props.id}`}>
        <input
          className="w-64"
          placeholder="Enter tex t   "
          onKeyDown={(e) => _handleKeyDown(e, props.id)}
          defaultValue={props.body}
        />
      </div>
      <ul className="list-disc flex flex-col ml-32 space-y-3 mt-1">
        {props.subTasks.map((subTask, index) => (
          <li className="ml-8">
            <div key={`${subTask.id}`}>
              <input
                className="w-64"
                placeholder="Enter new task"
                onKeyDown={(e) => _handleKeyDown(e, subTask.id)}
                defaultValue={subTask.body}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task;
