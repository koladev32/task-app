import React from "react";
import Node, { NodeProps } from "./Node";
import { useHistory } from "react-router";

interface ListNodesProps {
  nodes: Array<NodeProps>;
}

const ListNodes: React.FC<ListNodesProps> = (
  props: ListNodesProps
): React.ReactElement => {
  const history = useHistory();

  if (!props || !props.nodes) {
    return <div>Loading Nodes</div>;
  }

  return (
    <div className="ml-3">
      <h3 className="text-2xl">Nodes</h3>
      <ul>
        {props.nodes.map((node, index) => {
          return (
            <li key={index}>
              <a onClick={() => history.push(`/nodes/${node.id}`)}>
                <Node id={index} title={node.title} />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListNodes;
