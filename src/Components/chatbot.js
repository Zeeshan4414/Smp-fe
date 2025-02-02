import axios from 'axios';
import { useState } from 'react';



function ChatBot() {
    const [userMessage, setUserMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleSendMessage = async () => {
        const newMessage = { role: 'user', content: userMessage };
        setChatHistory([...chatHistory, newMessage]);

        try {
            const response = await axios.post('https://smp-be-mysql.vercel.app/open-ai/generate-captions', {
                prompt: userMessage,
            });
            const botMessage = { role: 'bot', content: response.data.caption };
            setChatHistory([...chatHistory, newMessage, botMessage]);
            setUserMessage(''); 
        } catch (error) {
            console.error('Error generating caption:', error.message);
        }
    };

//     return (
//         <div>
//             <div className="chat-box">
//                 {chatHistory.map((message, index) => (
//                     <div key={index} className={message.role}>
//                         {message.content}
//                     </div>
//                 ))}
//             </div>
//             <input
//                 type="text"
//                 value={userMessage}
//                 onChange={(e) => setUserMessage(e.target.value)}
//                 placeholder="Type a prompt..."
//             />
//             <button onClick={handleSendMessage}>Send</button>
//         </div>
//     );
// }
return (
  <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
  <h2 className="text-3xl font-semibold text-center text-gray-900">AI Caption Generator</h2>

  {/* Chat Box */}
  <div className="chat-box max-h-96 overflow-y-auto bg-gray-50 p-4 rounded-lg shadow-inner space-y-4">
    {chatHistory.map((message, index) => (
      <div
        key={index}
        className={`p-3 mb-3 rounded-lg ${
          message.role === "user"
            ? "bg-blue-600 text-white self-end ml-auto max-w-xs text-right"
            : "bg-gray-300 text-gray-800"
        }`}
      >
        {message.content}
      </div>
    ))}
  </div>

  {/* Input Section */}
  <div className="flex items-center space-x-4">
    <input
      type="text"
      value={userMessage}
      onChange={(e) => setUserMessage(e.target.value)}
      placeholder="Type a prompt..."
      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 text-gray-800"
    />
    <button
      onClick={handleSendMessage}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Send
    </button>
  </div>
</div>
);
}

export default ChatBot;
