'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Settings, MessageCircle, User, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatRequest {
  developer_message: string;
  user_message: string;
  model: string;
  api_key: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [developerMessage, setDeveloperMessage] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gpt-4.1-mini');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !apiKey.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const request: ChatRequest = {
        developer_message: developerMessage,
        user_message: inputMessage,
        model: model,
        api_key: apiKey,
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      let assistantMessage = '';
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        assistantMessage += chunk;

        // Update the last message in real-time
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.role === 'assistant') {
            lastMessage.content = assistantMessage;
          } else {
            newMessages.push({
              role: 'assistant',
              content: assistantMessage,
              timestamp: new Date(),
            });
          }
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request. Please check your API key and try again.',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-unc-navy text-unc-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-8 h-8" />
            <h1 className="text-2xl font-bold">AI Engineer Challenge</h1>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg bg-unc-blue hover:bg-blue-600 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white border-b border-gray-200 p-4 shadow-md">
          <div className="max-w-6xl mx-auto space-y-4">
            <h3 className="text-lg font-semibold text-unc-navy">Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OpenAI API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your OpenAI API key"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-unc-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-unc-blue focus:border-transparent"
                >
                  <option value="gpt-4.1-mini">GPT-4.1 Mini</option>
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Developer Message (Optional)
                </label>
                <textarea
                  value={developerMessage}
                  onChange={(e) => setDeveloperMessage(e.target.value)}
                  placeholder="System message for the AI"
                  rows={2}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-unc-blue focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full p-4">
        <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Start a conversation!</p>
                <p className="text-sm">Configure your settings and send your first message.</p>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-unc-blue text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 mt-1 flex-shrink-0" />
                    ) : (
                      <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      <div className={`text-xs mt-1 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-gray-500" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSubmit} className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading || !apiKey.trim()}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-unc-blue focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim() || !apiKey.trim()}
                className="px-6 py-3 bg-unc-blue text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </form>
            
            {!apiKey.trim() && (
              <p className="text-sm text-red-500 mt-2">
                Please enter your OpenAI API key in settings to start chatting.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 