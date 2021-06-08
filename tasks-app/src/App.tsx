import * as React from 'react';
import './App.css';
import Task from './components/Task';

const {useState} = React;

const dummyNodeData = [
    {
        id: 1,
        title: 'Work',
    },
    {
        id: 2,
        title: 'Work',
    },
    {
        id: 3,
        title: 'Work',
    },
];

const dummyTaskData = [
    {
        id: 6,
        title: 'Task',
        body: 'Do this',
        subTask: [],
        node: {
            id: 1,
        },
    },
    {
        id: 5,
        title: 'Task',
        body: 'Do this',
        subTask: [],
        node: {
            id: 1,
        },
    },
    {
        id: 4,
        title: 'Task',
        body: 'Do this',
        subTask: [],
        node: {
            id: 1,
        },
    },
    {
        id: 3,
        title: 'Task',
        body: 'Do this',
        subTask: [],
        node: {
            id: 1,
        },
    },
    {
        id: 2,
        title: 'Task',
        body: 'Do this',
        subTask: [
            {
                id: 4,
                title: 'Task',
                node: {
                    id: 1,
                },
            },
            {
                id: '5',
                title: 'Task',
                node: {
                    id: 1,
                },
            },
            {
                id: '6',
                title: 'Task',
                node: {
                    id: 1,
                },
            },
        ],
        node: {
            id: 1,
        },
    },
    {
        id: 1,
        title: 'Task',
        body: 'Do this',
        subTask: [],
        node: {
            id: 1,
        },
    },
];

function App() {
    // const [fields, setFields] = useState([{ value: null }]);
    const [tasks, setTasks] = useState(dummyTaskData);
    console.log(dummyNodeData);

    function handleAdd() {
        const values = [...tasks];
        values.push({
            id: Math.floor(Math.random() * 101),
            node: {id: Math.floor(Math.random() * 101)},
            subTask: [],
            title: '',
            body: '',
        });
        // @ts-ignore
        setTasks(values);
    }

    // function handleRemove(i: number) {
    //     const values = [...fields];
    //     values.splice(i, 1);
    //     setFields(values);
    // }

    // function handleChange(i: number, event: any) {
    //     const values = [...fields];
    //     values[i].value = event.target.value;
    //     setFields(values);
    // }

    return (
        <div>
            Hello
            {/*Node*/}
            <div>
                <h3>Nodes</h3>
                <ul>
                    {dummyNodeData.map((node, index) => {
                        return (
                            <li key={index}>
                                <div>{node.title}</div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            {/*Task*/}
            <div>
                <h3>Tasks</h3>
                <ul>
                    {tasks &&
                    tasks.map((task, idx) => {
                        return (
                            <li key={idx}>
                                <Task node={task.node.id} body={task.body} taskId={task.id}/>
                            </li>
                        );
                    })}
                </ul>
                <button type="button" onClick={() => handleAdd()}>
                    +
                </button>
            </div>
        </div>
    );
}

export default App;
