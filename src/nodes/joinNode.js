// joinNode.js

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const JoinNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Join"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-left` },
        { type: 'target', position: Position.Left, id: `${id}-right`, style: { top: '50%' } },
        { type: 'source', position: Position.Right, id: `${id}-joined` }
      ]}
    >
      <span>Combines two inputs</span>
    </BaseNode>
  );
};
