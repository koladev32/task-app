import React from 'react';
import Node, {NodeProps} from './Node';

interface ListNodesProps {
    nodes: Array<NodeProps>;
}

const ListNodes: React.FC<ListNodesProps> = (props: ListNodesProps): React.ReactElement => {
    if (!props || !props.nodes) {
        return <div>Loading Nodes</div>;
    }
    return (
        <div>
            <h3>Nodes</h3>
            <ul>
                {props.nodes.map((node, index) => {
                    return (
                        <li key={index}>
                            <Node id={index} title={node.title}/>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ListNodes;
