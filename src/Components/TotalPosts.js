// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

// // New Media component for handling image and video rendering
// const Media = ({ mediaUrl, index }) => {
//   const [isVideo, setIsVideo] = useState(false);
//   const [isImage, setIsImage] = useState(false);

//   useEffect(() => {
//     if (mediaUrl.includes(".mp4")) {
//       setIsVideo(true);
//     } else {
//       setIsImage(true);
//     }
//   }, [mediaUrl]);

//   const handleVideoError = (e) => {
//     e.target.style.display = "none";
//     setIsImage(true);
//   };

//   const handleImageError = (e) => {
//     e.target.style.display = "none";
//     console.error("Failed to load media:", e.target.src);
//   };

//   return (
//     <div key={index} className="media-container ">
//       {isVideo && (
//         <video
//           src={mediaUrl}
//           controls
//           style={{ maxWidth: "100%", margin: "10px 0", borderRadius: "8px" }}
//           onError={handleVideoError}
//         >
//           Your browser does not support the video tag.
//         </video>
//       )}

//       {isImage && (
//         <img
//           src={mediaUrl}
//           alt={`Media ${index + 1}`}
//           style={{ width: "300px",
//             height: "200px",
//             objectFit: "cover",
//             margin: "10px 0",
//             borderRadius: "8px"
//          }}
//           onError={handleImageError}
//         />
//       )}
//     </div>
//   );
// };

// const TotalPosts = () => {
//   const location = useLocation();
//   const email = location.state?.email; // Retrieving email from state
//   const [posts, setPosts] = useState([]);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [postToUpdate, setPostToUpdate] = useState(null);
//   const [updatedCaption, setUpdatedCaption] = useState("");
//   const [updatedMedia, setUpdatedMedia] = useState([]);

//   console.log("email is arrived", email);
//   // Fetch posts on component mount
//   useEffect(() => {
//     const fetchPosts = async (email) => {
//       try {
//         const response = await fetch("https://smp-be-mysql.vercel.app/facebook-upload/posts", {
//           method: "POST", // Using POST to send email
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email }),
//         });
//         const data = await response.json();
//         if (Array.isArray(data)) {
//           console.log("Fetched Posts:", data);
//           setPosts(data);
//         } else {
//           console.error("Invalid response format:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     fetchPosts(email);
//   }, [email]);

//   const handleDelete = async (post) => {
//     const { postId, pageId, accessToken, email } = post;

//     try {
//       const response = await fetch(
//         "https://smp-be-mysql.vercel.app/facebook-upload/post/delete",
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             postId,
//             pageId,
//             email,
//             accessToken,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (data.success) {
//         alert("Post deleted successfully.");
//         setPosts(posts.filter((p) => p.postId !== postId));
//       } else {
//         alert(`Error: ${data.error}`);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Failed to delete post.");
//     }
//   };
//   const handleStartUpdate = (post) => {
//     setPostToUpdate(post);
//     setUpdatedCaption(post.message || "");
//     setUpdatedMedia(post.media || []);
//     setIsUpdating(true);
//   };
//   // const handleUpdate = (post) => {
//   //   setIsUpdating(true);
//   //   setPostToUpdate(post);
//   //   setUpdatedCaption(post.message);

//   //   // Ensure media is always an array, even if null or undefined
//   //   setUpdatedMedia(post.media && post.media.length > 0 ? post.media : []);
//   // };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setUpdatedMedia([...updatedMedia, ...files]);
//   };

//   const handleSubmitUpdate = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("pageId", postToUpdate.pageId);
//     formData.append("postId", postToUpdate.postId);
//     formData.append("caption", updatedCaption);
//     formData.append("email", postToUpdate.email);
//     formData.append("accessToken", postToUpdate.accessToken);

//     if (postToUpdate.media && Array.isArray(postToUpdate.media)) {
//       postToUpdate.media.forEach((mediaUrl) => {
//         formData.append("existingMediaUrls", mediaUrl); // Send existing media URLs as part of the form data
//       });
//     }
//     // Append files
//     updatedMedia.forEach((file) => {
//       formData.append("files", file);
//     });

//     try {
//       const response = await fetch(
//         "https://smp-be-mysql.vercel.app/facebook-upload/post/update",
//         {
//           method: "PUT",
//           body: formData,
//         }
//       );

//       const data = await response.json();

//       if (data.success) {
//         alert("Post updated successfully.");
//         setPosts(posts.map((post) => (post.postId === postToUpdate.postId ? { ...post, caption: updatedCaption, media: updatedMedia } : post)));
//         setIsUpdating(false);
//       } else {
//         alert("Error updating post.");
//       }
//     } catch (error) {
//       console.error("Error updating post:", error);
//       alert("Error updating post.");
//     }
//   };

// //   return (
// //     <div className="posts-feed px-6 py-8 bg-gray-50 min-h-screen">
// //       {/* Posts Section */}
// //       {posts.length > 0 ? (
// //         posts.map((post) => (
// //           <div key={post.id} className="post-card bg-white shadow-md rounded-lg mb-6 p-6">
// //             {/* Post Header */}
// //             <div className="post-header mb-4">
// //               <h3 className="text-xl font-semibold text-gray-800">{post.pageName || "Page Name"}</h3>
// //               <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
// //             </div>

// //             {/* Post Content */}
// //             <div className="post-content mb-4">
// //               <p className="text-gray-700">{post.message || "No caption provided."}</p>

// //               {/* Media */}
// //               {post.media && post.media.length > 0 ? (
// //                 <div className="post-media grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
// //                   {post.media.map((mediaUrl, index) => (
// //                     <Media key={index} mediaUrl={mediaUrl} index={index} />
// //                   ))}
// //                 </div>
// //               ) : post.mediaUrl ? (
// //                 <div className="post-media mt-4">
// //                   <Media mediaUrl={post.mediaUrl} index={0} />
// //                 </div>
// //               ) : (
// //                 <p className="text-gray-500 mt-4">No media available.</p>
// //               )}
// //             </div>

// //             {/* Action Buttons */}
// //             <div className="post-actions h-32 flex space-x-4 mt-4">
// //               {post.media && post.media.length > 0 && post.media.every((mediaUrl) => mediaUrl.includes(".mp4")) ? (
// //                 <button
// //                   onClick={() => handleDelete(post)}
// //                   className="delete-button bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
// //                 >
// //                   Delete
// //                 </button>
// //               ) : (
// //                 <>
// //                   <button
// //                     onClick={() => handleUpdate(post)}
// //                     className="update-button h-22 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
// //                   >
// //                     Update
// //                   </button>
// //                   <button
// //                     onClick={() => handleDelete(post)}
// //                     className="delete-button h-22 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
// //                   >
// //                     Delete
// //                   </button>
// //                 </>
// //               )}
// //             </div>
// //           </div>
// //         ))
// //       ) : (
// //         <p className="text-center text-gray-500">No posts found.</p>
// //       )}

// //       {/* Update Post Form */}
// //       {isUpdating && postToUpdate && (
// //         <div className="update-form bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto mt-8">
// //           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Update Post</h3>
// //           <form onSubmit={handleSubmitUpdate} className="space-y-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">Caption:</label>
// //               <textarea
// //                 value={updatedCaption}
// //                 onChange={(e) => setUpdatedCaption(e.target.value)}
// //                 rows="4"
// //                 placeholder="Update the caption..."
// //                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">Media:</label>
// //               <input
// //                 type="file"
// //                 multiple
// //                 onChange={handleFileChange}
// //                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               />
// //               {updatedMedia.length > 0 && (
// //                 <div className="updated-media-preview grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
// //                   {updatedMedia.map((media, index) => (
// //                     <div key={index}>
// //                       {typeof media === "string" ? (
// //                         <Media mediaUrl={media} index={index} />
// //                       ) : (
// //                         <img
// //                           src={URL.createObjectURL(media)}
// //                           alt={`New Media ${index}`}
// //                           className="w-full rounded-lg"
// //                           style={{ maxWidth: "100%", margin: "10px 0" }}
// //                         />
// //                       )}
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //             <div className="flex justify-end space-x-4 mt-4">
// //               <button
// //                 type="submit"
// //                 className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
// //               >
// //                 Save Changes
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// return (
//   <div className="posts-feed px-6 py-8 bg-gray-50 min-h-screen">
//     {/* Posts Section */}
//     {!isUpdating ? (
//       posts.length > 0 ? (
//         posts.map((post) => (
//           <div key={post.id} className="post-card bg-white shadow-md rounded-lg mb-6 p-6">
//             {/* Post Header */}
//             <div className="post-header mb-4">
//               <h3 className="text-xl font-semibold text-gray-800">{post.pageName || "Page Name"}</h3>
//               <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
//             </div>

//             {/* Post Content */}
//             <div className="post-content mb-4">
//               <p className="text-gray-700">{post.message || "No caption provided."}</p>

//               {/* Media */}
//               {post.media && post.media.length > 0 ? (
//                 <div className="post-media grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//                   {post.media.map((mediaUrl, index) => (
//                     <Media key={index} mediaUrl={mediaUrl} index={index} />
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500 mt-4">No media available.</p>
//               )}
//             </div>

//             {/* Action Buttons */}
//             <div className="post-actions flex space-x-4 mt-4">
//               <button
//                 onClick={() => handleStartUpdate(post)}
//                 className="update-button bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
//               >
//                 Update
//               </button>
//               <button
//                 onClick={() => handleDelete(post)}
//                 className="delete-button bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-center text-gray-500">No posts found.</p>
//       )
//     ) : (
//       // Update Post Form
//       <div className="update-form bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto mt-8">
//         <h3 className="text-2xl font-semibold text-gray-800 mb-4">Update Post</h3>
//         <p className="text-sm text-red-500 mb-2">
//           Note: Changing or adding images will delete the existing ones.
//         </p>
//         <form onSubmit={handleSubmitUpdate} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Caption:</label>
//             <textarea
//               value={updatedCaption}
//               onChange={(e) => setUpdatedCaption(e.target.value)}
//               rows="4"
//               placeholder="Update the caption..."
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Media:</label>
//             <input
//               type="file"
//               multiple
//               onChange={handleFileChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {updatedMedia.length > 0 && (
//               <div className="updated-media-preview grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//                 {updatedMedia.map((media, index) => (
//                   <div key={index}>
//                     {typeof media === "string" ? (
//                       <Media mediaUrl={media} index={index} />
//                     ) : (
//                       <img
//                         src={URL.createObjectURL(media)}
//                         alt={`New Media ${index}`}
//                         className="w-full rounded-lg"
//                         style={{ maxWidth: "100%", margin: "10px 0" }}
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="flex justify-end space-x-4 mt-4">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
//             >
//               Save Changes
//             </button>
//             <button
//               type="button"
//               onClick={() => setIsUpdating(false)}
//               className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition duration-300"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     )}
//   </div>
// );
// }
// export default TotalPosts;
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

// Media component for rendering image and video
const Media = ({ mediaUrl, index }) => {
  const [isVideo, setIsVideo] = useState(false);
  const [isImage, setIsImage] = useState(false);
  
  

  useEffect(() => {
    if (mediaUrl.includes(".mp4")) {
      setIsVideo(true);
    } else {
      setIsImage(true);
    }
  }, [mediaUrl]);

  const handleError = (e, type) => {
    e.target.style.display = "none";
    if (type === "video") {
      setIsImage(true);
    }
  };

  return (
    <div key={index} className="media-container">
      {isVideo && (
        <video
          src={mediaUrl}
          controls
          style={{ maxWidth: "100%", margin: "10px 0", borderRadius: "8px" }}
          onError={(e) => handleError(e, "video")}
        >
          Your browser does not support the video tag.
        </video>
      )}
      {isImage && (
        <img
          src={mediaUrl}
          alt={`Media ${index + 1}`}
          style={{
            width: "300px",
            height: "200px",
            objectFit: "cover",
            margin: "10px 0",
            borderRadius: "8px",
          }}
          onError={handleError}
        />
      )}
    </div>
  );
};

const TotalPosts = () => {
  const location = useLocation();
  const email = location.state?.email; // Retrieving email from state
  const [posts, setPosts] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [postToUpdate, setPostToUpdate] = useState(null);
  const [updatedCaption, setUpdatedCaption] = useState("");
  const [updatedMedia, setUpdatedMedia] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async (email) => {
      try {
        const response = await fetch("https://smp-be-mysql.vercel.app/facebook-upload/posts", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("Invalid response format:", data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts(email);
  }, [email]);

  const handleDelete = async (post) => {
    const { postId, pageId, accessToken, email } = post;

    try {
      const response = await fetch("https://smp-be-mysql.vercel.app/facebook-upload/post/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          pageId,
          email,
          accessToken,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Post deleted successfully.");
        setPosts(posts.filter((p) => p.postId !== postId));
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete post.");
    }
  };

  const handleStartUpdate = (post) => {
    setPostToUpdate(post);
    setUpdatedCaption(post.message || "");
    setUpdatedMedia(post.media || []);
    setIsUpdating(true);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUpdatedMedia([...updatedMedia, ...files]);
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("pageId", postToUpdate.pageId);
    formData.append("postId", postToUpdate.postId);
    formData.append("caption", updatedCaption);
    formData.append("email", postToUpdate.email);
    formData.append("accessToken", postToUpdate.accessToken);

    updatedMedia.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("https://smp-be-mysql.vercel.app/facebook-upload/post/update", {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        alert("Post updated successfully.");
        setPosts(posts.map((post) => (post.postId === postToUpdate.postId ? { ...post, caption: updatedCaption, media: updatedMedia } : post)));
        // setIsUpdating(false);
      } else {
        alert("Error updating post.");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Error updating post.");
    }
    finally {
      setLoading(false); // Stop loader
    }
  };
 
  return (
    <div className="posts-feed px-6 py-8 bg-gray-50 min-h-screen">
  {!isUpdating ? (
    posts.length > 0 ? (
      posts.map((post) => (
        <div key={post.id} className="post-card bg-white shadow-md rounded-lg mb-6 p-6">
          <div className="post-header mb-4">
            <h3 className="text-xl font-semibold text-gray-800">{post.pageName || "Page Name"}</h3>
            <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
          </div>

          <div className="post-content mb-4">
            <p className="text-gray-700">{post.message || "No caption provided."}</p>

            {post.media && post.media.length > 0 ? (
              <div className="post-media grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {post.media.map((mediaUrl, index) => {
                  // Check if the media is a video or an image
                  const isVideo = mediaUrl.includes(".mp4"); // Add more video checks if needed
                  const isImage = !isVideo;

                  return (
                    <div key={index}>
                      <Media mediaUrl={mediaUrl} index={index} />
                      
                      {/* Only show Update button for images */}
                      {isImage && (
                        <div className="post-actions flex space-x-4 mt-2">
                          
                          <button
                            onClick={() => handleStartUpdate(post)}
                            className="update-button w-22 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                          >
                            Update
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 mt-4">No media available.</p>
            )}
          </div>

          <div className="post-actions flex space-x-4 mt-4">
            <button
              onClick={() => handleDelete(post)}
              className="delete-button w-22 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500">No posts found.</p>
    )
      ) : (
        <div className="update-form bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Update Post</h3>
          <p className="text-sm text-red-500 mb-4">
        **Note:** If you add new media (image or video), the previous media files will be removed and only the newly added media will be shown.
      </p>
          <form onSubmit={handleSubmitUpdate} className="space-y-4">
            <div>
            
              <label className="block text-sm font-medium text-gray-700">Caption:</label>
              <textarea
                value={updatedCaption}
                onChange={(e) => setUpdatedCaption(e.target.value)}
                rows="4"
                placeholder="Update the caption..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Media:</label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {updatedMedia.length > 0 && (
                <div className="updated-media-preview grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {updatedMedia.map((media, index) => (
                    <div key={index}>
                      {typeof media === "string" ? (
                        <Media mediaUrl={media} index={index} />
                      ) : (
                        <img
                          src={URL.createObjectURL(media)}
                          alt={`New Media ${index}`}
                          className="w-full rounded-lg"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
                disabled={loading}
              >
                Save Changes
              </button>
            </div>
          </form>
          {loading && (
        <div className="flex justify-center mt-4">
          <Loader />
        </div>
      )}
        </div>
      )}
    </div>
  );
};

export default TotalPosts;
