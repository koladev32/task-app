import React from "react";
import Node, {NodeProps} from "./Node";

interface ListNodesProps {
    nodes: Array<NodeProps>;
}

const ListNodes: React.FC<ListNodesProps> = (
    props: ListNodesProps
): React.ReactElement => {
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
                            <a href="#">
                                <Node id={index} title={node.title}/>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ListNodes;
