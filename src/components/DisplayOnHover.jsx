import { useState } from "react";

export default function DisplayOnHover({ trigger, content }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ display: 'inline-block', position: 'relative' }}
    >
      {/* The trigger element / wrapper */}
      <span style={{cursor: 'default'}}>{trigger}</span>

      {/* thing to be displayed */}
      {isHovered && (
        <span style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          zIndex: 9999, // Ensures it floats on top of everything
        }}
        >
          {content}
        </span>
      )}
    </div>
  );
}