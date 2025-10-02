import React, {useState} from "react";
import { ChevronDown } from "lucide-react";

// New Component for Care Advice Items
const CareAdviceItem = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  
  const parseMarkdown = (text) => {
    if (!text) return text;

    // Convert LaTeX temperature notation to readable format
    let cleanedText = text.replace(/\$(\d+)\^\{?\\circ\}?\s*\\text\{([FC])\}\$/g, '$1°$2');
    
    // Process the cleaned text for bold markdown
    const parts = cleanedText.split('**');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index}>{part}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg overflow-hidden shadow-sm">
      <div 
        className="flex items-start p-4 space-x-3 cursor-pointer select-none"
        onClick={() => item.relevance_reason && setIsOpen(!isOpen)} 
      >
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-600 text-white font-bold">
          {index + 1}
        </div>
        <div className="flex-grow text-gray-800 font-medium">
          {parseMarkdown(item.advice)}
        </div>
        {item.relevance_reason && (
          <div className="flex-shrink-0 ml-2 self-center">
            <ChevronDown 
              className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
            />
          </div>
        )}
      </div>
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        {item.relevance_reason && (
          <div className="pl-16 pr-4 pb-4">
            <p className="text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-200">
              <span className="font-semibold text-green-700">Why it's important:</span> {parseMarkdown(item.relevance_reason)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareAdviceItem;