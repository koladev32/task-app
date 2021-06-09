import React from 'react';
import { NodeProps } from './Node';
import { useMutation } from '@apollo/client';
import { DELETE_TASK, UPDATE_TASK } from '../apollo/mutations';
import { CREATE_TASK } from '../apollo/mutations';
import { useHistory } from 'react-router';
import { GET_NODE_TASKS } from '../apollo/queries';
import { useParams } from 'react-router-dom';

export interface TaskProps {
    id?: number | string;
    node: NodeProps;
    body?: string;
    subTasks: Array<any>;
}

const KEYS = {
    ENTER: 'Enter',
    BACKSPACE: 'Backspace',
};

const Task: React.FC<TaskProps> = (props: TaskProps): React.ReactElement => {
    const history = useHistory();
    const { nodeId }: any = useParams();

    const [updateTask] = useMutation(UPDATE_TASK);
    const [createTask] = useMutation(CREATE_TASK);
    const [deleteTask] = useMutation(DELETE_TASK, {
        refetchQueries: [
            {
                query: GET_NODE_TASKS,
                variables: {
                    nodeId: nodeId,
                },
            },
        ],
    });

    const handleDelete = (id: any) => {
        deleteTask({
            variables: {
                id: id,
            },
        });
    };

    const _handleKeyDown = (e: any, id: any) => {
        switch (e.key) {
            case KEYS.ENTER:
                createTask({
                    variables: {
                        node: props.node.id,
                        body: 'New Task added',
                        title: 'Untitled',
                    },
                });
                break;
            case KEYS.BACKSPACE:
                break;
            default:
                setTimeout(function () {
                    updateTask({
                        variables: { id: id, body: e.target.value, title: '' },
                    }).then((res) => console.log(res.data));
                }, 2000);
        }
    };
    return (
        <div className="flex flex-col space-x-2">
            <div key={`${props.id}`} className="flex flex-wrap items-center space-x-2">
                <button
                    className="rounded-full h-3 w-3 bg-gray-500 flex items-center justify-center font-mono"
                    onClick={() => history.push(`/tasks/${props.id}`)}
                />
                <input
                    className="w-64 focus:outline-none"
                    placeholder="Enter text"
                    onKeyDown={(e) => _handleKeyDown(e, props.id)}
                    defaultValue={props.body}
                />
                <button
                    className="rounded-full h-3 w-3 flex items-center justify-center font-mono"
                    onClick={() => handleDelete(props.id)}
                >
                    X
                </button>
            </div>
            <ul className="list-disc flex flex-col ml-32 space-y-3 mt-1">
                {props.subTasks.map((subTask, index) => (
                    <div
                        key={`${subTask.id}`}
                        className="flex flex-wrap items-center space-x-2 ml-8"
                    >
                        <button
                            className="rounded-full h-3 w-3 bg-gray-500 flex items-center justify-center font-mono"
                            onClick={() => history.push(`/tasks/${props.id}`)}
                        />
                        <input
                            className="w-64 focus:outline-none"
                            placeholder="Enter new task"
                            onKeyDown={(e) => _handleKeyDown(e, subTask.id)}
                            defaultValue={subTask.body}
                            minLength={10}
                        />
                        <button
                            className="rounded-full h-3 w-3 flex items-center justify-center font-mono"
                            onClick={() => handleDelete(props.id)}
                        >
                            X
                        </button>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default Task;
