<<<<<<< HEAD
import React, { } from 'react';
=======
import React from 'react';
>>>>>>> 1d09f1398c5a9b6cae107232d3e100cb2f2b62e8
import FacebookLoginCheck from './FacebookLoginCheck';
// import './CreatePost.css';

const CreatePost = () => {
  //     const [content, setContent] = useState('');
  //     const [aiCaption, setAiCaption] = useState('Your AI-generated caption will appear here.');
  //     const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  //     const [schedule, setSchedule] = useState('');

  //     const handlePlatformSelection = (platform) => {
  //         if (selectedPlatforms.includes(platform)) {
  //             setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
  //         } else {
  //             setSelectedPlatforms([...selectedPlatforms, platform]);
  //         }
  //     };

  return (
    //         <div className="create-post-container">
    //             <h1>Create a New Post</h1>

    //             <div className="post-content">
    //                 <h2>Step 1: Add Content</h2>
    //                 <textarea
    //                     value={content}
    //                     onChange={(e) => setContent(e.target.value)}
    //                     placeholder="Write your post content here..."
    //                 />
    //                 <button onClick={() => setAiCaption('Generated Caption: Your AI caption based on the content.')}>
    //                     Generate AI Caption
    //                 </button>
    //                 <p className="ai-caption">{aiCaption}</p>
    //             </div>

    //             <div className="platform-selection">
    //                 <h2>Step 2: Choose Platforms</h2>
    //                 <div className="platforms">
    //                     {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map(platform => (
    //                         <label key={platform} className="platform-option">
    //                             <input
    //                                 type="checkbox"
    //                                 checked={selectedPlatforms.includes(platform)}
    //                                 onChange={() => handlePlatformSelection(platform)}
    //                             />
    //                             {platform}
    //                         </label>
    //                     ))}
    //                 </div>
    //             </div>

    //             <div className="post-schedule">
    //                 <h2>Step 3: Post or Schedule</h2>
    //                 <input
    //                     type="datetime-local"
    //                     value={schedule}
    //                     onChange={(e) => setSchedule(e.target.value)}
    //                 />
    //                 <div className="action-buttons">
    //                     <button className="post-now-btn">Post Now</button>
    //                     <button className="schedule-btn">Schedule Post</button>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };



    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Create a Post</h2>
      <FacebookLoginCheck />
    </div>
  );
}
export default CreatePost;