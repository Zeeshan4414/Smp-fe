import axios from 'axios';
import { useState } from 'react';

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const API_URL = "https://smp-be-mysql.vercel.app/open-ai/generate-captions";

  const handleSendMessage = async () => {
    if (!userMessage) return;

    const newMessages = [...chatHistory, { sender: "user", text: userMessage }];
    setChatHistory(newMessages);
    setUserMessage("");

    try {
      const response = await axios.post(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: `Generate a social media caption for: ${userMessage}` }),
      });

      const botMessage = { role: 'bot', content: response.data.caption || "No relevant response received." };
      setChatHistory([...newMessages, botMessage]);
    } catch (error) {
      console.error('Error generating caption:', error.message);
      const errorMessage = { role: 'bot', content: "Error generating caption." };
      setChatHistory([...newMessages, errorMessage]);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Caption copied to clipboard!");
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto mt-10 border rounded shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">Social Manager Pro - Caption Generator</h2>

      <div className="space-y-4 flex flex-col h-[500px]">
        <div className="h-full overflow-y-auto border p-2 rounded bg-gray-100">
          {chatHistory.map((message, index) => (
            <div key={index} className={`p-2 ${message.role === "user" ? "text-right" : "text-left"}`}>
              <strong>{message.role === "user" ? "You: " : "Bot: "}</strong>
              {message.content}
              {message.role === "bot" && (
                <button
                  className="ml-2 px-2 py-1 bg-blue-500 text-white text-sm rounded"
                  onClick={() => handleCopy(message.content)}
                >
                  Copy
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <input
            className="border p-2 w-3/4 rounded shadow-sm"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type your post idea..."
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded ml-2" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
