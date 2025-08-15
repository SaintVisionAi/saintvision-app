'use client';

import { useState } from 'react';

export default function HACPChat() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/hacp/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          userId: 'test-user',
          context: {}
        })
      });
      
      const data = await res.json();
      setResponse(data.response || 'Error: ' + data.error);
    } catch (error) {
      setResponse('Network error');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        🔥 HACP™ Claude 4 Sonnet Test
      </h2>
      
      <div className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Test your HACP™ engine..."
          className="w-full p-3 border border-gray-300 rounded-lg resize-none"
          rows={4}
        />
        
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? '🔄 Processing...' : '🚀 Send to HACP™'}
        </button>
        
        {response && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">HACP™ Response:</h3>
            <p className="whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
