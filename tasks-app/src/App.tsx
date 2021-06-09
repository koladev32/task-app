import React from "react";
import { Router, Route, Switch } from "react-router";
import "./App.css";
import "./assets/main.css";
import ListNodes from "./components/ListNodes";
import { useQuery } from "@apollo/client";
import { GET_NODES } from "./apollo/queries";

import { createHashHistory } from "history";
import { NodesTasksPage, TaskSubTasks } from "./pages/tasks/";
import Home from "./pages/Home";

const history = createHashHistory();

function App() {
  const dataNodes = useQuery(GET_NODES, {
    variables: { nodeId: 1 },
  });

  return (
    <Router history={history}>
      <div className="flex flex-row h-screen overflow-hidden space-x-8">
        {/*Node*/}
        <div className="bg-gray-200 h-full w-1/5 pt-6">
          <ListNodes nodes={dataNodes.data?.nodes} />
        </div>
        {/*Task*/}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/nodes/:nodeId" component={NodesTasksPage} />
          <Route path="/tasks/:taskId" component={TaskSubTasks} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
