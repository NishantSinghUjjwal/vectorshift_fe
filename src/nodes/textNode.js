// textNode.js

import { useState, useRef, useEffect } from 'react';
import { MarkerType, Position, useReactFlow } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
const selector = (state) => ({
  addEdge: state.addEdge
})
export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [handles, setHandles] = useState([
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input`
    }
  ])
  const textareaRef = useRef(null);
  const { getNodes } = useReactFlow();

  const { addEdge } = useStore(selector, shallow);

  // Function to get all available nodes except the current one
  const getAvailableNodes = () => {
    return getNodes().filter(node => node.id !== id);
  };

  // Function to handle text input and show suggestions
  const handleInput = (event) => {
    const newText = event.target.value || '';
    setCurrText(newText);

    const isAnyVariable = newText.includes('{{');
    if (isAnyVariable) {
      const start_index = newText.indexOf('{{');
      const end_index = newText.indexOf('}}') || newText.length;
      const variable_name = newText.slice(start_index + 2, end_index);
      console.log(variable_name, getAvailableNodes());
      setShowSuggestions(true);
      setSuggestions(getAvailableNodes().filter(node => node.data.name && node.data.name.toLowerCase().includes(variable_name.toLowerCase())));
    }
  };

  // Function to handle node selection
  const handleNodeSelect = (selectedNode) => {
    // Add edge between selected node and current node
    addEdge({
      id: `${selectedNode.id}-${id}`,
      source: selectedNode.id,
      target: id,
      type: 'smoothstep', animated: true, markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' }
    });

    // Update text with selected node
    const textBeforeCursor = currText.substring(0, textareaRef.current.selectionStart);
    const lastOpenBrace = textBeforeCursor.lastIndexOf('{{');
    const textAfterCursor = currText.substring(textareaRef.current.selectionEnd);

    const newText = currText.substring(0, lastOpenBrace) +
      `{{${selectedNode.id}}}` +
      textAfterCursor;

    setCurrText(newText);
    setShowSuggestions(false);

  };
  return (
    <BaseNode
      id={id}
      title="Text"
      handles={handles}
    >
      <label>
        Text:
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleInput}
          style={{
            width: '100%',
            height: '100px',
            minHeight: 'fit-content',
            resize: 'none'
          }}
        />
      </label>

      {/* Suggestions Popup */}
      {showSuggestions && (
        <div
          style={{
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            zIndex: 1000,
            maxHeight: '200px',
            overflowY: 'auto'
          }}
        >
          {suggestions.map((node) => (
            <div
              key={node.id}
              onClick={() => handleNodeSelect(node)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
                ':hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              {node.data.name}
            </div>
          ))}
        </div>
      )}
    </BaseNode>
  );
};
