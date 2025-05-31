// loggerNode.js

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const LoggerNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Logger"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` }
      ]}
    >
      <span>Logs input to console</span>
    </BaseNode>
  );
};
