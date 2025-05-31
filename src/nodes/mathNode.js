// mathNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const MathNode = ({ id }) => {
  const [formula, setFormula] = useState('');

  return (
    <BaseNode
      id={id}
      title="Math"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-a` },
        { type: 'target', position: Position.Left, id: `${id}-b`, style: { top: '50%' } },
        { type: 'source', position: Position.Right, id: `${id}-result` }
      ]}
    >
      <label>
        Formula:
        <input
          type="text"
          placeholder="a + b"
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
        />
      </label>
    </BaseNode>
  );
};
