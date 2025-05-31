import { useEffect, useMemo, useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');
  const selector = (state) => ({
    updateNodeField: state.updateNodeField,
  });
  const { updateNodeField } = useStore(selector, shallow);
  const handleInputChange = (name) => {
    setCurrName(name);
    updateNodeField(id, 'name', name);
  }
  const handleInputTypeChange = (type) => {
    setInputType(type);
    updateNodeField(id, 'type', type);
  }

  useEffect(()=>{
      handleInputChange(currName||'')
  },[currName])


  useEffect(()=>{
      handleInputChange(inputType||null)
  },[inputType])
 
  return (
    <BaseNode
      id={id}
      title="Input"
      handles={[{
        type: 'source',
        position: Position.Right,
        id: `${id}-value`
      }]}
    >
      <label>
        Name:
        <input type="text" value={currName} onChange={(e)=>setCurrName(e.target.value)} />
      </label>
      <label>
        Type:
        <select value={inputType} onChange={(e)=>setInputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};
