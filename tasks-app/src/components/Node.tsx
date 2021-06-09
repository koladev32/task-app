import React from 'react';

export interface NodeProps {
    id: number | string;
    title: string;
}

const Node: React.FC<NodeProps> = (props: NodeProps): React.ReactElement => {
    return <div className="text-xl">{props.title}</div>;
};

export default Node;
