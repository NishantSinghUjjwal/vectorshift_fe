// validatorNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const ValidatorNode = ({ id }) => {
  const [required, setRequired] = useState(true);

  return (
    <BaseNode
      id={id}
      title="Validator"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` }
      ]}
    >
      <label>
        <input
          type="checkbox"
          checked={required}
          onChange={(e) => setRequired(e.target.checked)}
        />
        Required
      </label>
    </BaseNode>
  );
};
