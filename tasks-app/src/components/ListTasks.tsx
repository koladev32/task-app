import React from 'react';
import Task, {TaskProps} from './Task';

export interface ListTasksProps {
    tasks: Array<TaskProps> | null;
    handleAdd: () => void;
}

const ListTasks: React.FC<ListTasksProps> = (props: ListTasksProps): React.ReactElement => {
    if (!props || !props.tasks) {
        return <div>Loading</div>;
    }
    return (
        <div>
            <h3>Task</h3>

            <ul>
                {props.tasks &&
                props.tasks.map((task, idx) => {
                    return (
                        <li key={idx}>
                            <Task node={task.node} body={task.body} id={task.id}/>
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
