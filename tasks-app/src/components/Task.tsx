import React from 'react';
import {NodeProps} from './Node';
import {useMutation} from '@apollo/client';
import {UPDATE_TASK} from '../apollo/mutations';

export interface TaskProps {
    id: number | string;
    node: NodeProps;
    body: string;
}

const Task: React.FC<TaskProps> = (props: TaskProps): React.ReactElement => {
    const [updateTask] = useMutation(UPDATE_TASK);

    const _handleKeyDown = (e: any, id: any) => {
        setTimeout(function () {
            updateTask({
                variables: {id: parseInt(id, 4), body: e.target.value, title: ''},
            }).then((res) => console.log(res.data));
        }, 2000);

        if (e.key === 'Enter' && e.target.value.length > 0) {
            console.log('Adding ');
        }

        if (e.key === 'Backspace' && e.target.value.length <= 0) {
            console.log(props.node.id);
        }
    };
    return (
        <div>
            <div key={`${props.id}`}>
                <input
                    placeholder="Enter text  "
                    onKeyDown={(e) => _handleKeyDown(e, props.id)}
                    defaultValue={props.body}
                />
            </div>
        </div>
    );
};

export default Task;
