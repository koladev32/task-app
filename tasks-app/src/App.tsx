import React from "react";
import { Router, Route, Switch } from "react-router";
import "./App.css";
import "./assets/main.css";
import ListNodes from "./components/ListNodes";
import { useQuery } from "@apollo/client";
import { GET_NODES } from "./apollo/queries";

import { createHashHistory } from "history";
import TaskPage from "./pages/TaskPage";

const history = createHashHistory();

function App() {
  const dataNodes = useQuery(GET_NODES, {
    variables: { nodeId: 1 },
  });

  // function handleRemove(i: number) {
  //     const values = [...fields];
  //     values.splice(i, 1);
  //     setFields(values);
  // }

  // function handleChange(i: number, event: any) {
  //     const values = [...fields];
  //     values[i].value = event.target.value;
  //     setFields(values);
  //  }

  return (
    <Router history={history}>
      <div className="flex flex-row overflow-hidden space-x-8">
        {/*Node*/}
        <div className="bg-green-500 h-screen w-1/5 pt-6">
          <ListNodes nodes={dataNodes.data?.nodes} />
        </div>
        {/*Task*/}
        <Switch>
          <Route exact path="/" component={() => <div>Hello</div>} />
          <Route path="/nodes/:nodeId" component={TaskPage} />
          <Route path="/nodes/:nodeId/task/task:taskId/" component={TaskPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
