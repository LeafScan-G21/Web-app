import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

const formatMessage = (text) => {
  // Split by newlines to handle paragraphs and lists
  const lines = text.split('\n');
  const elements = [];
  let currentList = [];
  let listType = null;

  lines.forEach((line, idx) => {
    // Check for numbered lists
    const numberedMatch = line.match(/^(\d+)\.\s\*\*(.*?)\*\*(.*)$/);
    if (numberedMatch) {
      if (listType !== 'numbered') {
        if (currentList.length > 0) {
          elements.push({ type: listType, items: currentList });
          currentList = [];
        }
        listType = 'numbered';
      }
      currentList.push({
        number: numberedMatch[1],
        bold: numberedMatch[2],
        rest: numberedMatch[3]
      });
      return;
    }

    // Check for bullet points with ***
    const bulletMatch = line.match(/^\*\*\*(.*?):?\*\*(.*)$/);
    if (bulletMatch) {
      if (listType !== 'bullet') {
        if (currentList.length > 0) {
          elements.push({ type: listType, items: currentList });
          currentList = [];
        }
        listType = 'bullet';
      }
      currentList.push({
        bold: bulletMatch[1],
        rest: bulletMatch[2]
      });
      return;
    }

    // If we have a pending list and encounter non-list content
    if (currentList.length > 0) {
      elements.push({ type: listType, items: currentList });
      currentList = [];
      listType = null;
    }

    // Regular paragraph
    if (line.trim()) {
      elements.push({ type: 'paragraph', text: line });
    }
  });

  // Add any remaining list
  if (currentList.length > 0) {
    elements.push({ type: listType, items: currentList });
  }

  return elements;
};

const renderBoldText = (text) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export default function ChatbotInterface() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", sender: 'bot', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    let userQuestion = input;
    setInput('');
    setIsTyping(true);

    try {
      const requestBody = {
        question: userQuestion
      };

      const response = await fetch(`${BACKEND_URL}/chat/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // 
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      
      const botMessage = {
        id: messages.length + 2,
        text: data.answer || data.response || 'Sorry, I could not process your request.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        text: 'Sorry, there was an error connecting to the chatbot. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-green-50">
      {/* Header */}
      <div className="bg-white shadow-md px-6 py-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-800">AI Assistant</h1>
          <p className="text-sm text-gray-500">Always here to help</p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.sender === 'user' ? 'bg-green-600' : 'bg-gray-300'
            }`}>
              {message.sender === 'user' ? (
                <User className="w-5 h-5 text-white" />
              ) : (
                <Bot className="w-5 h-5 text-gray-700" />
              )}
            </div>
            <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${
              message.sender === 'user' ? 'items-end' : 'items-start'
            }`}>
              <div className={`px-4 py-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-green-600 text-white rounded-tr-sm'
                  : 'bg-white text-gray-800 rounded-tl-sm shadow-md'
              }`}>
                {message.sender === 'user' ? (
                  <p className="text-sm">{message.text}</p>
                ) : (
                  <div className="text-sm space-y-2">
                    {formatMessage(message.text).map((element, idx) => {
                      if (element.type === 'paragraph') {
                        return <p key={idx}>{renderBoldText(element.text)}</p>;
                      } else if (element.type === 'numbered') {
                        return (
                          <ol key={idx} className="space-y-2 ml-4">
                            {element.items.map((item, i) => (
                              <li key={i} className="list-none">
                                <span className="font-semibold">{item.number}. {item.bold}:</span>
                                {renderBoldText(item.rest)}
                              </li>
                            ))}
                          </ol>
                        );
                      } else if (element.type === 'bullet') {
                        return (
                          <ul key={idx} className="space-y-1 ml-4">
                            {element.items.map((item, i) => (
                              <li key={i} className="list-none">
                                <span className="font-semibold">{item.bold}:</span>
                                {renderBoldText(item.rest)}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1 px-2">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-gray-700" />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-md">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}