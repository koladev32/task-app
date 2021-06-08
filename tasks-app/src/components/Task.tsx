import React from 'react';

interface TaskProps {
    taskId: number;
    node: number;
    body: string;
}

const Task: React.FC<TaskProps> = (props: TaskProps): React.ReactElement => {
    const _handleKeyDown = (e: any) => {
        console.log(e.key, e.target.value.length);
        if (e.key === 'Enter' && e.target.value.length > 0) {
            console.log('Adding');
        }

        if (e.key === 'Backspace' && e.target.value.length <= 0) {
            console.log(props.node);
        }
    };
    return (
        <div>
            <div key={`${props.taskId}`}>
                <input
                    type="text"
                    placeholder="Enter text"
                    onKeyDown={(e) => _handleKeyDown(e)}
                    defaultValue={props.body}
                />
            </div>
        </div>
    );
};

export default Task;
