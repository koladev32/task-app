import React from 'react';
import Node, { NodeProps } from './Node';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_NODE } from '../apollo/mutations';
import { GET_NODES } from '../apollo/queries';

interface ListNodesProps {
    nodes: Array<NodeProps>;
}

const ListNodes: React.FC<ListNodesProps> = (props: ListNodesProps): React.ReactElement => {
    const [createNode] = useMutation(CREATE_NODE, {
        refetchQueries: [
            {
                query: GET_NODES,
            },
        ],
    });

    function handleAdd() {
        createNode({
            variables: {
                title: 'Untitled',
            },
        });
    }
    if (!props || !props.nodes) {
        return <div>Loading Nodes</div>;
    }

    return (
        <div className="ml-8 bg-gray">
            <h3 className="subpixel-antialiased font-medium">Nodes</h3>
            <ul>
                {props.nodes.map((node, index) => {
                    return (
                        <li className="list-disc" key={index}>
                            <Link to={`/nodes/${node.id}`}>
                                <Node id={index} title={node.title} />
                            </Link>
                        </li>
                    );
                })}
                <button type="button" onClick={handleAdd}>
                    +
                </button>
            </ul>
        </div>
    );
};

export default ListNodes;
