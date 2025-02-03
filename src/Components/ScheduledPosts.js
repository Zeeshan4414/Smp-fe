// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ScheduledPosts = () => {
//     const [posts, setPosts] = useState([]);
//     const [postData, setPostData] = useState({
//         id: null,
//         caption: '',
//         postType: '',
//         files: [], // Renamed from 'file' to 'files' for clarity
//         scheduledDate: '',
//     });
//     const [showUpdateModal, setShowUpdateModal] = useState(false);

//     // Fetch scheduled posts
//     useEffect(() => {
//         axios.get('https://smp-be-mysql.vercel.app/scheduled/fetch-scheduled-posts')
//             .then(response => {
//                 setPosts(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching posts:', error);
//             });
//     }, []);

//     // Calculate time left until the post is due
//     const calculateTimeLeft = (scheduledDate) => {
//         const now = new Date();
//         const currentTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Karachi" }));
//         console.log("using current time:", currentTime);

//         const offsetMillis = 5 * 60 * 60 * 1000; // 5 hours in milliseconds

//         const scheduledTime = new Date(scheduledDate).getTime();; // Parse the DB string as UTC milliseconds since epoch
//         const correctedScheduledTimeMillis = scheduledTime - offsetMillis;

//         console.log("using date.parse:", correctedScheduledTimeMillis);

//         // Compare the two times
//         const timeDiff = correctedScheduledTimeMillis - currentTime;
//         console.log("Time Difference in ms:", timeDiff);

//         if (timeDiff <= 0) {
//             return "Post is already due";
//         }

//         const hours = Math.floor(timeDiff / 1000 / 60 / 60); // Get hours
//         const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)); // Get remaining minutes

//         return `${hours} hours ${minutes} minutes left`;
//     };

//     // Handle updating the post
//     const handleUpdate = (postId, existingCaption, existingPostType, existingFiles, existingScheduledDate, status) => {
//         if (status.toLowerCase() !== 'scheduled') {
//             alert('Scheduled date can only be updated for posts that are scheduled.');
//             return;
//         }
//         setShowUpdateModal(true);
//         setPostData({
//             id: postId,
//             caption: existingCaption,
//             postType: existingPostType,
//             files: existingFiles.map(file => ({ name: file.name, url: file.url })), // Map to maintain structure
//             scheduledDate: new Date(existingScheduledDate).toISOString().slice(0, 16), // Format for datetime-local
//         });
//     };

//     // Handle input field changes (caption, postType)
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setPostData({ ...postData, [name]: value });
//     };

//     // Handle file input changes
//     const handleFileChange = (e) => {
//         const newFiles = Array.from(e.target.files);
//         setPostData({ ...postData, files: [...postData.files, ...newFiles] });
//     };

//     // Remove a file from the list
//     const handleRemoveFile = (fileName) => {
//         setPostData({
//             ...postData,
//             files: postData.files.filter(file => file.name !== fileName),
//         });
//     };

//     // Handle scheduled date change
//     const handleScheduledDateChange = (e) => {
//         const { value } = e.target;
//         setPostData({ ...postData, scheduledDate: value });
//     };

//     // Submit the updated post
//     const handleSubmitUpdate = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('caption', postData.caption);
//         formData.append('postType', postData.postType);
//         formData.append('scheduledDate', postData.scheduledDate);

//         // Append files (new and existing files)
//         postData.files.forEach((file) => {
//             if (file.url) {
//                 // Existing file
//                 formData.append('existingFiles', file.name);
//             } else {
//                 // New file
//                 formData.append('files', file, file.name);
//             }
//         });

//         try {
//             const response = await axios.put(`https://smp-be-mysql.vercel.app/scheduled/posts/${postData.id}/update`, formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             console.log('Post updated successfully:', response.data);
//             setShowUpdateModal(false);
//             // Refresh posts after update
//             const updatedPosts = posts.map(post =>
//                 post.id === postData.id ? { ...post, ...response.data } : post
//             );
//             setPosts(updatedPosts);
//         } catch (error) {
//             console.error('Error updating post:', error);
//         }
//     };

//     // Delete post
//     const handleDelete = (postId) => {
//         axios.delete(`https://smp-be-mysql.vercel.app/scheduled/delete-scheduled-post/${postId}`)
//             .then(() => {
//                 setPosts(posts.filter(post => post.id !== postId));
//             })
//             .catch(error => {
//                 console.error('Error deleting post:', error);
//             });
//     };

//     return (
//         <div>
//             <h1>Scheduled Posts</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Caption</th>
//                         <th>Scheduled Date</th>
//                         <th>Status</th>
//                         <th>Time Left</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {posts.map(post => (
//                         <tr key={post.id}>
//                             <td>{post.caption}</td>
//                             <td>{post.scheduledDate}</td>
//                             <td>{post.isScheduled ? 'Scheduled' : 'Published'}</td>
//                             <td>{post.isScheduled ? calculateTimeLeft(post.scheduledDate) : 'Post is published'}</td>
//                             <td>
//                                 {post.isScheduled && (
//                                     <button onClick={() => handleUpdate(post.id, post.caption, post.postType, post.files || [], post.scheduledDate, 'scheduled')}>Update</button>
//                                 )}
//                                 <button onClick={() => handleDelete(post.id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Update Modal */}
//             {showUpdateModal && (
//                 <div className="update-modal">
//                     <h2>Update Post</h2>
//                     <form onSubmit={handleSubmitUpdate}>
//                         <div>
//                             <label>Caption:</label>
//                             <input
//                                 type="text"
//                                 name="caption"
//                                 value={postData.caption}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <label>Post Type:</label>
//                             <select
//                                 name="postType"
//                                 value={postData.postType}
//                                 onChange={handleChange}
//                             >
//                                 <option value="feed">Feed</option>
//                                 <option value="story">Story</option>
//                             </select>
//                         </div>

//                         <div>
//                             <label>Scheduled Date:</label>
//                             <input
//                                 type="datetime-local"
//                                 name="scheduledDate"
//                                 value={postData.scheduledDate}
//                                 onChange={handleScheduledDateChange}
//                             />
//                         </div>

//                         <div>
//                             <label>Files:</label>
//                             <div>
//                                 {postData.files.map((file, index) => (
//                                     <div key={index} className="file-preview">
//                                         {file.url || file.type?.startsWith('image/') ? (
//                                             <img src={file.url || URL.createObjectURL(file)} alt={file.name} width="100" />
//                                         ) : (
//                                             <video width="100" controls>
//                                                 <source src={file.url || URL.createObjectURL(file)} type={file.type} />
//                                             </video>
//                                         )}
//                                         <button type="button" onClick={() => handleRemoveFile(file.name)}>Remove</button>
//                                     </div>
//                                 ))}
//                             </div>
//                             <input
//                                 type="file"
//                                 multiple
//                                 onChange={handleFileChange}
//                             />
//                         </div>

//                         <button type="submit">Update Post</button>
//                     </form>
//                     <button onClick={() => setShowUpdateModal(false)}>Close</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ScheduledPosts;
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


const ScheduledPosts = () => {
  const location = useLocation();
  const email = location.state?.email;  // Retrieve the passed email
  const [posts, setPosts] = useState([]);
  const [postData, setPostData] = useState({
    id: null,
    caption: '',
    postType: '',
    files: [], // Renamed from 'file' to 'files' for clarity
    scheduledDate: '',
  });
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  console.log("ScheduledPosts email is:", email);


  // Fetch scheduled posts
  useEffect(() => {
    const fetchScheduledPosts = async () => {
      if (!email) return;  // Ensure email exists before making the request

      try {
        const response = await axios.post('https://smp-be-mysql.vercel.app/scheduled/count', {
          email: email,
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching scheduled posts:', error);
      }
    };

    fetchScheduledPosts(email);  // Call the function
  }, [email]);  // Re-run when email changes


  // Calculate time left until the post is due
  const calculateTimeLeft = (scheduledDate) => {
    console.log("Scheduled date comming from checking the time", scheduledDate);
    const now = new Date();
    const currentTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Karachi" }));
    console.log("using current time:", currentTime);

    const offsetMillis = 5 * 60 * 60 * 1000; // 5 hours in milliseconds

    const scheduledTime = new Date(scheduledDate).getTime();; // Parse the DB string as UTC milliseconds since epoch
    const correctedScheduledTimeMillis = scheduledTime - offsetMillis;

    console.log("using date.parse:", correctedScheduledTimeMillis);

    // Compare the two times
    const timeDiff = correctedScheduledTimeMillis - currentTime;
    console.log("Time Difference in ms:", timeDiff);

    if (timeDiff <= 0) {
      return "Post is already due";
    }

    const hours = Math.floor(timeDiff / 1000 / 60 / 60); // Get hours
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)); // Get remaining minutes

    return `${hours} hours ${minutes} minutes left`;
  };

  // Handle updating the post
  const handleUpdate = (postId, existingCaption, existingPostType, existingFiles, existingScheduledDate, status) => {
    if (status.toLowerCase() !== 'scheduled') {
      alert('Scheduled date can only be updated for posts that are scheduled.');
      return;
    }
    setShowUpdateModal(true);
    setPostData({
      id: postId,
      caption: existingCaption,
      postType: existingPostType,
      files: existingFiles.map(file => ({ name: file.name, url: file.url })), // Map to maintain structure
      scheduledDate: new Date(existingScheduledDate).toISOString().slice(0, 16), // Format for datetime-local
    });
  };

  // Handle input field changes (caption, postType)
  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleScheduledDateChange = (e) => {
    setPostData({
      ...postData,
      scheduledDate: e.target.value,
    });
  };

  // Submit the updated post
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('caption', postData.caption);
    formData.append('postType', postData.postType);
    formData.append('scheduledDate', postData.scheduledDate);


    try {
      const response = await axios.put(`https://smp-be-mysql.vercel.app/scheduled/posts/${postData.id}/update`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Post updated successfully:', response.data);
      setShowUpdateModal(false);
      // Refresh posts after update
      const updatedPosts = posts.map(post =>
        post.id === postData.id ? { ...post, ...response.data } : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  // Delete post
  const handleDelete = (postId) => {
    axios.delete(`https://smp-be-mysql.vercel.app/scheduled/delete-scheduled-post/${postId}`)
      .then(() => {
        setPosts(posts.filter(post => post.id !== postId));
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Scheduled Posts</h1>

      {/* Table Container */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-sky-200">
            <tr>
              <th className="py-3 px-6 text-left text-md font-bold text-gray-600">Caption</th>
              <th className="py-3 px-6 text-left text-md font-bold text-gray-600">Scheduled Date</th>
              <th className="py-3 px-6 text-left text-md font-bold text-gray-600">Status</th>
              <th className="py-3 px-6 text-left text-md font-bold text-gray-600">Post Type</th>
              <th className="py-3 px-6 text-left text-md font-bold text-gray-600">Time Left</th>
              <th className="py-3 px-6 text-left text-md font-bold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-sky-100">
            {posts.map((post) => (
              <tr key={post.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6 text-sm text-gray-700">{post.caption}</td>
                <td className="py-3 px-6 text-sm text-gray-700">{post.scheduledDate}</td>
                <td className="py-3 px-6 text-sm text-gray-700">{post.isScheduled ? 'Scheduled' : 'Published'}</td>
                <td className="py-3 px-6 text-sm text-gray-700">{post.postType}</td>
                <td className="py-3 px-6 text-sm text-gray-700">
                  {post.isScheduled ? calculateTimeLeft(post.scheduledDate) : 'Post is published'}
                </td>
                <td className="py-3 px-6 text-sm">
                  {post.isScheduled && (
                    <button
                      onClick={() =>
                        handleUpdate(post.id, post.caption, post.postType, post.files || [], post.scheduledDate, 'scheduled')
                      }
                      className="text-blue-500 hover:text-blue-700 transition duration-300 mr-3"
                    >
                      Update
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Post</h2>
            <form onSubmit={handleSubmitUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Caption:</label>
                <input
                  type="text"
                  name="caption"
                  value={postData.caption}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Scheduled Date:</label>
                <input
                  type="datetime-local"
                  name="scheduledDate"
                  value={postData.scheduledDate}
                  onChange={handleScheduledDateChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Update Post
                </button>
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScheduledPosts;
