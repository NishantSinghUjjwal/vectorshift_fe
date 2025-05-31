import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, title, handles = [], children, style = {} }) => {
  return (
    <div style={{ width: 200, height: 100, border: '1px solid black', padding: 8, ...style }}>
      <div><strong>{title}</strong></div>
      <div>{children}</div>
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}
    </div>
  );
};
