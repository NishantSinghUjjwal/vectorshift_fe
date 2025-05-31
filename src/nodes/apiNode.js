// apiNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const APINode = ({ id }) => {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');

  return (
    <BaseNode
      id={id}
      title="API"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-response` }
      ]}
    >
      <label>
        URL:
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      </label>
      <label>
        Method:
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
        </select>
      </label>
    </BaseNode>
  );
};
