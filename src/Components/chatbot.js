import React, { useState } from "react";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [copyStatus, setCopyStatus] = useState(null); // Track copy status
  const API_URL = "https://smp-be-mysql.vercel.app/open-ai/generate-captions";

  const handleSend = async () => {
    if (!input) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: `Generate a social media caption for: ${input}` }),
      });

      const data = await response.json();
      const botMessage = data.response || "No relevant response received.";

      setMessages([...newMessages, { sender: "bot", text: botMessage }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([...newMessages, { sender: "bot", text: "Error fetching response." }]);
    }
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(index);  // Set the copy status to the current message index

    // Reset the copy status after 2 seconds
    setTimeout(() => {
      setCopyStatus(null);
    }, 2000); // 2 seconds for the tick to appear
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      <h2 className="text-3xl font-semibold text-center text-gray-900">AI Caption Generator</h2>

      {/* Chat Box */}
      <div className="chat-box max-h-96 overflow-y-auto bg-gray-50 p-4 rounded-lg shadow-inner space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`p-3 mb-3 rounded-lg ${msg.sender === "user" ? "bg-blue-600 text-white self-end ml-auto max-w-xs text-right" : "bg-gray-300 text-gray-800"}`}>
            <strong>{msg.sender === "user" ? "You: " : "Bot: "}</strong>
            {msg.text}
            {msg.sender === "bot" && (
              <button
                className="ml-2 px-2 py-1 bg-blue-500 text-white text-sm rounded"
                onClick={() => handleCopy(msg.text, index)}
              >
                {copyStatus === index ? "✔" : "Copy"}  {/* Change text to "✔" when copied */}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a prompt..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 text-gray-800"
        />
        <button
          onClick={handleSend}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
