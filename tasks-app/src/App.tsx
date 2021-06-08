import React, {useState} from 'react';
import './App.css';
import ListTasks from './components/ListTasks';
import ListNodes from './components/ListNodes';
import {useQuery} from '@apollo/client';
import {TaskProps} from './components/Task';
import {GET_NODES, GET_TASKS} from './apollo/queries';

function App() {
    const dataNodes = useQuery(GET_NODES);

    const dataTasks = useQuery(GET_TASKS);
    const [tasks, setTasks] = useState<Array<TaskProps> | null>([]);

    function handleAdd() {
        // @ts-ignore
        const values = [...tasks];
        values.push({
            id: Math.floor(Math.random() * 101),
            node: {id: Math.floor(Math.random() * 101), title: ''},
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
            <ListNodes nodes={dataNodes.data.nodes}/>
            {/*Task*/}
            <ListTasks tasks={dataTasks.data.tasks} handleAdd={handleAdd}/>
        </div>
    );
}

export default App;
