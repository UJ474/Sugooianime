import { useState } from "react";

export default function SynopsisText({ text, limit = 350 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!text) return null;
  
  return (
    <p style={{fontSize:'15px'}}>
      {isExpanded ? text : `${text.slice(0, limit)}...`}
      {text.length > limit && (
        <span 
          onClick={toggleExpand} 
          style={{ color: "lightblue", cursor: "pointer", marginLeft: "5px" }}
        >
          {isExpanded ? "Show Less" : "Read More"}
        </span>
      )}
    </p>
  );
}
