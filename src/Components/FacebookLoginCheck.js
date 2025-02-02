// import React, { useState, useEffect, useCallback } from 'react';

// const FacebookLoginCheck = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [pages, setPages] = useState([]);
//     const [selectedPageId, setSelectedPageId] = useState(null);
//     const [message, setMessage] = useState('');
//     const [userId, setUserId] = useState(null);
//     const [files, setFiles] = useState([]); // Handle multiple files

//     const statusChangeCallback = useCallback((response) => {
//         if (response.status === 'connected') {
//             setIsLoggedIn(true);
//             fetchUserData(response.authResponse.userID);
//             fetchPages(response.authResponse.accessToken);
//         } else {
//             setIsLoggedIn(false);
//         }
//     }, []);

//     const fetchUserData = (id) => {
//         setUserId(id);
//     };

//     const fetchPages = (accessToken) => {
//         window.FB.api('/me/accounts', { access_token: accessToken }, function (response) {
//             if (response && !response.error) {
//                 setPages(response.data);
//             } else {
//                 console.error('Error fetching pages:', response.error);
//             }
//         });
//     };

//     const loginWithFacebook = () => {
//         window.FB.login(function (response) {
//             if (response.status === 'connected') {
//                 setIsLoggedIn(true);
//                 fetchPages(response.authResponse.accessToken);
//             } else if (response.status === 'not_authorized') {
//                 alert('You need to authorize the app to manage your Facebook pages.');
//             } else {
//                 alert('Facebook login failed. Please try again.');
//             }
//         }, {
//             scope: 'email, public_profile, pages_show_list, pages_manage_posts',
//             config_id: '1273277580768760'
//         });
//     };

//     const handlePost = async () => {
//         const selectedPage = pages.find(page => page.id === selectedPageId);
//         if (selectedPage) {
//             if (!userId) {
//                 alert('User ID is missing. Please log in again.');
//                 return;
//             }

//             const formData = new FormData();

//             // Append each file to FormData
//             files.forEach((file) => {
//                 formData.append('files', file); // Ensure 'files' matches what your backend expects
//             });

//             if (message) {
//                 formData.append('caption', message); // Add message as caption
//             }

//             formData.append('accessToken', selectedPage.access_token);
//             formData.append('pageId', selectedPageId);

//             try {
//                 const response = await fetch('https://smp-be-mysql.vercel.app/facebook-upload/upload', {
//                     method: 'POST',
//                     body: formData,
//                     // Ensure credentials are included if necessary (optional)
//                     // credentials: 'include' // Uncomment if needed
//                 });

//                 // Check if the response is ok
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const result = await response.json();
//                 console.log('Upload result:', result);
//                 // Optionally handle the result (e.g., display a success message)
//             } catch (error) {
//                 console.error('Error uploading to backend:', error);
//                 alert(`Error uploading: ${error.message}`);
//             }
//         } else {
//             alert('Please select a page to post to.');
//         }
//     };


//     useEffect(() => {
//         window.fbAsyncInit = function () {
//             window.FB.init({
//                 appId: '1332019044439778',
//                 cookie: true,
//                 xfbml: true,
//                 version: 'v20.0'
//             });

//             window.FB.getLoginStatus(function (response) {
//                 statusChangeCallback(response);
//             });
//         };

//         (function (d, s, id) {
//             const js = d.createElement(s);
//             js.id = id;
//             js.src = 'https://connect.facebook.net/en_US/sdk.js';
//             const fjs = d.getElementsByTagName(s)[0];
//             fjs.parentNode.insertBefore(js, fjs);
//         })(document, 'script', 'facebook-jssdk');
//     }, [statusChangeCallback]);

//     return (
//         <div>
//             <h1>Facebook Page Manager</h1>

//             {!isLoggedIn && (
//                 <button onClick={loginWithFacebook}>Login with Facebook</button>
//             )}

//             {isLoggedIn && pages.length > 0 && (
//                 <div>
//                     <h2>Select a Page to Post</h2>
//                     <select
//                         onChange={(e) => setSelectedPageId(e.target.value)}
//                         value={selectedPageId}
//                     >
//                         <option value="">Select Page</option>
//                         {pages.map((page) => (
//                             <option key={page.id} value={page.id}>
//                                 {page.name}
//                             </option>
//                         ))}
//                     </select>

//                     <textarea
//                         placeholder="Write your post"
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                     ></textarea>

//                     <input
//                         type="file"
//                         accept="image/*,video/*"
//                         multiple
//                         onChange={(e) => setFiles(Array.from(e.target.files))} // Store all selected files
//                     />

//                     <button onClick={handlePost}>Post to Page</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FacebookLoginCheck;

// _______________________________________________________________________________________________________________________________
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from "react-router-dom";

const FacebookLoginCheck = () => {
    const location = useLocation();
    const email = location.state?.email; // Retrieving email from state
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [pages, setPages] = useState([]);
    const [selectedPageId, setSelectedPageId] = useState(null);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(null);
    const [files, setFiles] = useState([]);
    const [postType, setPostType] = useState('feed'); // Post type dropdown
    const [scheduledDate, setScheduledDate] = useState(''); // State for scheduled date

    const statusChangeCallback = useCallback((response) => {
        console.log("i am here");
        if (response.status === 'connected') {
            setIsLoggedIn(true);
            fetchUserData(response.authResponse.userID);
            fetchPages(response.authResponse.accessToken);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const fetchUserData = (id) => {
        setUserId(id);
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files); // Convert FileList to array
        setFiles(prevFiles => [...prevFiles, ...selectedFiles]); // Append new files to existing ones
    };

    const handleRemoveFile = (index) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index)); // Remove the file at the given index
    };

    const fetchPages = (accessToken) => {
        window.FB.api('/me/accounts', { access_token: accessToken }, function (response) {
            if (response && !response.error) {
                setPages(response.data);
            } else {
                console.error('Error fetching pages:', response.error);
            }
        });
    };

    const loginWithFacebook = () => {
        window.FB.login(function (response) {
            if (response.status === 'connected') {
                setIsLoggedIn(true);

                // Get the short-lived access token from the login response
                let accessToken = response.authResponse.accessToken;

                // Fetch the long-lived access token
                getLongLivedAccessToken(accessToken)
                    .then(longLivedAccessToken => {
                        // Update the accessToken with the long-lived token
                        accessToken = longLivedAccessToken; // Now, accessToken holds the long-lived token

                        // Continue with the rest of your code using the updated accessToken
                        console.log('Using long-lived access token:', accessToken);

                        // Now you can use this accessToken for your next operations, like fetching pages
                        fetchPages(accessToken);

                    })
                    .catch(error => {
                        console.error('Error fetching long-lived token:', error);
                        alert('Failed to fetch long-lived access token.');
                    });

            } else if (response.status === 'not_authorized') {
                alert('You need to authorize the app to manage your Facebook pages.');
            } else {
                alert('Facebook login failed. Please try again.');
            }
        }, {
            scope: 'email, public_profile, pages_show_list, pages_manage_posts',
            config_id: '1273277580768760'
        });
    };

    // Function to exchange short-lived token for a long-lived token
    const getLongLivedAccessToken = async (shortLivedAccessToken) => {
        try {
            const appId = '1332019044439778'; // Replace with your app's ID
            const appSecret = '84b1a81f8b8129f43983db4e9692a39a'; // Replace with your app's secret

            const response = await fetch(`https://graph.facebook.com/v12.0/oauth/access_token?` +
                `grant_type=fb_exchange_token&` +
                `client_id=${appId}&` +
                `client_secret=${appSecret}&` +
                `fb_exchange_token=${shortLivedAccessToken}`);

            const data = await response.json();

            if (data.access_token) {
                return data.access_token; // Return the long-lived access token
            } else {
                throw new Error('Failed to exchange for long-lived token');
            }
        } catch (error) {
            console.error('Error exchanging for long-lived token:', error);
            throw error;
        }
    };

    useEffect(() => {
        if (email) {
            console.log('Dashboard Data:', email);
            // You can now use dashboardData.userName, dashboardData.userRole, etc.
        }
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '1332019044439778',
                cookie: true,
                xfbml: true,
                version: 'v20.0'
            });

            window.FB.getLoginStatus(function (response) {
                statusChangeCallback(response);
            });
        };

        (function (d, s, id) {
            const js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            const fjs = d.getElementsByTagName(s)[0];
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    }, [statusChangeCallback, email]);

    const handlePost = async () => {
        const selectedPage = pages.find(page => page.id === selectedPageId);
        if (selectedPage) {
            if (!userId) {
                alert('User ID is missing. Please log in again.');
                return;
            }

            const formData = new FormData();

            files.forEach((file) => {
                formData.append('files', file);
            });

            if (message) {
                formData.append('caption', message);
            }

            formData.append('accessToken', selectedPage.access_token);
            formData.append('pageId', selectedPageId);
            formData.append('postType', postType); // Include post type in form data
            formData.append('email', email); // Send email to backend

            console.log('post type added');
            try {
                const response = await fetch('https://smp-be-mysql.vercel.app/facebook-upload/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log('Upload result:', result);
            } catch (error) {
                console.error('Error uploading to backend:', error);
                alert(`Error uploading: ${error.message}`);
            }
        } else {
            alert('Please select a page to post to.');
        }
    };
    const handleSchedule = async () => {
        const selectedPage = pages.find(page => page.id === selectedPageId);
        if (selectedPage) {
            if (!userId) {
                alert('User ID is missing. Please log in again.');
                return;
            }

            const formData = new FormData();

            files.forEach((file) => {
                formData.append('files', file);
            });

            if (message) {
                formData.append('caption', message);
            }

            formData.append('scheduledDate', scheduledDate);

            formData.append('accessToken', selectedPage.access_token);
            formData.append('pageId', selectedPageId);
            formData.append('postType', postType); // Include post type in form data
            formData.append('email', email); // Send email to backend

            console.log('post type added');
            try {
                const response = await fetch('https://smp-be-mysql.vercel.app/scheduled/schedule-post', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log('Upload result:', result);
            } catch (error) {
                console.error('Error uploading to backend:', error);
                alert(`Error uploading: ${error.message}`);
            }
        } else {
            alert('Please select a page to post to.');
        }
    };


    return (
        <div className="font-sans px-6 py-8 max-w-3xl mx-auto bg-gray-200 shadow-lg rounded-lg">
          <h1 className="text-center text-3xl font-bold text-blue-600 mb-6">Social Page Manager</h1>
      
          {!isLoggedIn && (
            <button
              onClick={loginWithFacebook}
              className="px-5 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg w-[12rem] h-auto mx-auto flex text-lg font-medium transition-all"
            >
              Connect Account
            </button>
          )}
      
          {isLoggedIn && pages.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Select a Page to Post</h2>
              <select
                onChange={(e) => setSelectedPageId(e.target.value)}
                value={selectedPageId}
                className="block w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="">Select Page</option>
                {pages.map((page) => (
                  <option key={page.id} value={page.id}>
                    {page.name}
                  </option>
                ))}
              </select>
      
              <textarea
                placeholder="Write your post"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg mb-4 resize-none focus:outline-none focus:ring focus:ring-blue-200"
              ></textarea>
      
              <select
                onChange={(e) => setPostType(e.target.value)}
                value={postType}
                className="block w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="feed">Feed</option>
                <option value="videos">Videos</option>
                <option value="reels">Reels</option>
              </select>
      
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFileChange}
                className="block w-full text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-white file:bg-blue-600 file:cursor-pointer file:transition-all mb-4"
              />
      
              <div className="flex flex-wrap gap-4 mb-4">
                {files.map((file, index) => (
                  <div key={index} className="relative text-center">
                    {file.type.startsWith('image') ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    ) : (
                      <video
                        src={URL.createObjectURL(file)}
                        controls
                        className="w-24 h-24 rounded-lg"
                      />
                    )}
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
      
              <button
                onClick={handlePost}
                className="px-5 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg w-full text-lg font-medium transition-all mb-4"
              >
                Post to Page
              </button>
      
              <label htmlFor="scheduledDate" className="block font-semibold mb-2">
                Schedule Post At
              </label>
              <input
                type="datetime-local"
                id="scheduledDate"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="block w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring focus:ring-blue-200"
              />
      
              <button
                onClick={handleSchedule}
                className="px-5 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg w-full text-lg font-medium transition-all"
              >
                Schedule a Post
              </button>
            </div>
          )}
        </div>
      );
    }      

export default FacebookLoginCheck;


// import React, { useState, useEffect, useCallback } from 'react';

// const FacebookLoginCheck = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [pages, setPages] = useState([]);
//     const [selectedPageId, setSelectedPageId] = useState(null);
//     const [message, setMessage] = useState('');
//     const [userId, setUserId] = useState(null);
//     const [files, setFiles] = useState([]);
//     const [postType, setPostType] = useState('feed'); // Post type dropdown
//     const [recentPosts, setRecentPosts] = useState([]); // Store recent posts

//     // Callback function for status changes
//     const statusChangeCallback = useCallback((response) => {
//         if (response.status === 'connected') {
//             setIsLoggedIn(true);
//             fetchUserData(response.authResponse.userID);
//             fetchPages(response.authResponse.accessToken);
//         } else {
//             setIsLoggedIn(false);
//         }
//     }, []);

//     // Fetch user data (for later use, like posting)
//     const fetchUserData = (id) => {
//         setUserId(id);
//     };

//     // Handle file input changes (multiple files)
//     const handleFileChange = (event) => {
//         const selectedFiles = Array.from(event.target.files);
//         setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
//     };

//     // Remove selected file from files array
//     const handleRemoveFile = (index) => {
//         setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//     };

//     // Fetch pages that the user manages
//     const fetchPages = (accessToken) => {
//         window.FB.api('/me/accounts', { access_token: accessToken }, function (response) {
//             if (response && !response.error) {
//                 setPages(response.data);
//             } else {
//                 console.error('Error fetching pages:', response.error);
//             }
//         });
//     };

//     // Facebook login handler
//     const loginWithFacebook = () => {
//         window.FB.login(function (response) {
//             if (response.status === 'connected') {
//                 setIsLoggedIn(true);
//                 fetchPages(response.authResponse.accessToken);
//             } else if (response.status === 'not_authorized') {
//                 alert('You need to authorize the app to manage your Facebook pages.');
//             } else {
//                 alert('Facebook login failed. Please try again.');
//             }
//         }, {
//             scope: 'email, public_profile, pages_show_list, pages_manage_posts',
//             config_id: '1273277580768760'
//         });
//     };

//     // Handle post submission (posting to selected page)
//     const handlePost = async () => {
//         const selectedPage = pages.find((page) => page.id === selectedPageId);
//         if (selectedPage) {
//             if (!userId) {
//                 alert('User ID is missing. Please log in again.');
//                 return;
//             }

//             const formData = new FormData();
//             files.forEach((file) => {
//                 formData.append('files', file);
//             });

//             if (message) {
//                 formData.append('caption', message);
//             }

//             formData.append('accessToken', selectedPage.access_token);
//             formData.append('pageId', selectedPageId);
//             formData.append('postType', postType);

//             try {
//                 const response = await fetch('https://smp-be-mysql.vercel.app/facebook-upload/upload', {
//                     method: 'POST',
//                     body: formData,
//                 });

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const result = await response.json();
//                 console.log('Upload result:', result);

//                 if (result.success) {
//                     // Add the new post to the recentPosts state dynamically
//                     setRecentPosts((prevPosts) => [
//                         {
//                             pageName: selectedPage.name,
//                             message: message || 'No caption provided',
//                             time: new Date().toLocaleString(),
//                         },
//                         ...prevPosts,
//                     ]);

//                     // Clear form inputs
//                     setMessage('');
//                     setFiles([]);
//                     alert('Post uploaded successfully!');
//                 } else {
//                     alert('Post upload failed. Please try again.');
//                 }
//             } catch (error) {
//                 console.error('Error uploading to backend:', error);
//                 alert(`Error uploading: ${error.message}`);
//             }
//         } else {
//             alert('Please select a page to post to.');
//         }
//     };

//     useEffect(() => {
//         window.fbAsyncInit = function () {
//             window.FB.init({
//                 appId: '1332019044439778',
//                 cookie: true,
//                 xfbml: true,
//                 version: 'v20.0',
//             });

//             window.FB.getLoginStatus(function (response) {
//                 statusChangeCallback(response);
//             });
//         };

//         (function (d, s, id) {
//             const js = d.createElement(s);
//             js.id = id;
//             js.src = 'https://connect.facebook.net/en_US/sdk.js';
//             const fjs = d.getElementsByTagName(s)[0];
//             fjs.parentNode.insertBefore(js, fjs);
//         })(document, 'script', 'facebook-jssdk');
//     }, [statusChangeCallback]);

//     return (
//         <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '600px', margin: 'auto' }}>
//             <h1 style={{ textAlign: 'center', color: '#4267B2' }}>Facebook Page Manager</h1>

//             {!isLoggedIn && (
//                 <button
//                     onClick={loginWithFacebook}
//                     style={{
//                         padding: '10px 20px',
//                         fontSize: '16px',
//                         backgroundColor: '#4267B2',
//                         color: 'white',
//                         border: 'none',
//                         borderRadius: '5px',
//                         cursor: 'pointer',
//                     }}>
//                     Login with Facebook
//                 </button>
//             )}

//             {isLoggedIn && (
//                 <div>
//                     <h2>Select a Page to Post</h2>
//                     <select
//                         onChange={(e) => setSelectedPageId(e.target.value)}
//                         value={selectedPageId}
//                         style={{
//                             padding: '10px',
//                             fontSize: '14px',
//                             marginBottom: '10px',
//                             width: '100%',
//                         }}
//                     >
//                         <option value="">Select Page</option>
//                         {pages.map((page) => (
//                             <option key={page.id} value={page.id}>
//                                 {page.name}
//                             </option>
//                         ))}
//                     </select>

//                     <textarea
//                         placeholder="Write your post"
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                         style={{
//                             width: '100%',
//                             height: '100px',
//                             padding: '10px',
//                             marginBottom: '10px',
//                         }}
//                     ></textarea>

//                     <select
//                         onChange={(e) => setPostType(e.target.value)}
//                         value={postType}
//                         style={{
//                             padding: '10px',
//                             fontSize: '14px',
//                             marginBottom: '10px',
//                             width: '100%',
//                         }}
//                     >
//                         <option value="feed">Feed</option>
//                         <option value="videos">Videos</option>
//                         <option value="reels">Reels</option>
//                     </select>

//                     <input
//                         type="file"
//                         accept="image/*,video/*"
//                         multiple
//                         onChange={handleFileChange}
//                         style={{ marginBottom: '10px' }}
//                     />

//                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
//                         {files.map((file, index) => (
//                             <div key={index} style={{ textAlign: 'center', position: 'relative' }}>
//                                 {file.type.startsWith('image') ? (
//                                     <img
//                                         src={URL.createObjectURL(file)}
//                                         alt="Preview"
//                                         style={{ width: '100px', height: '100px', objectFit: 'cover' }}
//                                     />
//                                 ) : (
//                                     <video
//                                         src={URL.createObjectURL(file)}
//                                         controls
//                                         style={{ width: '100px', height: '100px' }}
//                                     />
//                                 )}
//                                 <button
//                                     onClick={() => handleRemoveFile(index)}
//                                     style={{
//                                         position: 'absolute',
//                                         top: '5px',
//                                         right: '5px',
//                                         backgroundColor: 'red',
//                                         color: 'white',
//                                         border: 'none',
//                                         borderRadius: '50%',
//                                         width: '20px',
//                                         height: '20px',
//                                         cursor: 'pointer',
//                                     }}
//                                 >
//                                     X
//                                 </button>
//                             </div>
//                         ))}
//                     </div>

//                     <button
//                         onClick={handlePost}
//                         style={{
//                             padding: '10px 20px',
//                             fontSize: '16px',
//                             backgroundColor: '#28a745',
//                             color: 'white',
//                             border: 'none',
//                             borderRadius: '5px',
//                             cursor: 'pointer',
//                         }}
//                     >
//                         Post to Page
//                     </button>
//                 </div>
//             )}

//             <h3>Recent Posts</h3>
//             <div>
//                 {recentPosts.length === 0 ? (
//                     <p>No posts made yet</p>
//                 ) : (
//                     <ul>
//                         {recentPosts.map((post, index) => (
//                             <li key={index}>
//                                 <strong>{post.pageName}</strong>: {post.message} <br />
//                                 <small>{post.time}</small>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default FacebookLoginCheck;


// _______________________________________________________________________________________________________________________________

// import React, { useState, useEffect, useCallback } from 'react';

// const FacebookLoginCheck = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [pages, setPages] = useState([]);
//     const [selectedPageId, setSelectedPageId] = useState(null);
//     const [message, setMessage] = useState('');  // Caption message
//     const [userId, setUserId] = useState(null);
//     const [files, setFiles] = useState([]); // Handle multiple files (images and videos)

//     // Facebook Login Status Callback
//     const statusChangeCallback = useCallback((response) => {
//         if (response.status === 'connected') {
//             setIsLoggedIn(true);
//             fetchUserData(response.authResponse.userID);
//             fetchPages(response.authResponse.accessToken);
//         } else {
//             setIsLoggedIn(false);
//         }
//     }, []);

//     // Fetch user data
//     const fetchUserData = (id) => {
//         setUserId(id);
//     };

//     // Fetch user's pages
//     const fetchPages = (accessToken) => {
//         window.FB.api('/me/accounts', { access_token: accessToken }, function (response) {
//             if (response && !response.error) {
//                 setPages(response.data);
//             } else {
//                 console.error('Error fetching pages:', response.error);
//             }
//         });
//     };

//     // Facebook Login
//     const loginWithFacebook = () => {
//         window.FB.login(function (response) {
//             if (response.status === 'connected') {
//                 setIsLoggedIn(true);
//                 fetchPages(response.authResponse.accessToken);
//             } else if (response.status === 'not_authorized') {
//                 alert('You need to authorize the app to manage your Facebook pages.');
//             } else {
//                 alert('Facebook login failed. Please try again.');
//             }
//         }, {
//             scope: 'email, public_profile, pages_show_list, pages_manage_posts',
//         });
//     };

//     // Handle Post (uploading to Facebook)
//     const handlePost = async () => {
//         const selectedPage = pages.find(page => page.id === selectedPageId);
//         if (selectedPage) {
//             if (!userId) {
//                 alert('User ID is missing. Please log in again.');
//                 return;
//             }

//             const formData = new FormData();

//             // Append each selected file to FormData
//             files.forEach((file) => {
//                 formData.append('files', file); // Ensure 'files' matches the backend expectation
//             });

//             if (message) {
//                 formData.append('caption', message); // Add message as caption
//             }

//             formData.append('accessToken', selectedPage.access_token);
//             formData.append('pageId', selectedPageId);

//             try {
//                 const response = await fetch('https://smp-be-mysql.vercel.app/facebook-upload/upload', {
//                     timeout: 600000,  // Timeout set to 600 seconds (60000 milliseconds)
//                     method: 'POST',
//                     body: formData,
//                 });

//                 // Check if the response is ok
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const result = await response.json();
//                 console.log('Upload result:', result);
//                 alert('Post uploaded successfully!');
//             } catch (error) {
//                 console.error('Error uploading to backend:', error);
//                 alert(`Error uploading: ${error.message}`);
//             }
//         } else {
//             alert('Please select a page to post to.');
//         }
//     };

//     useEffect(() => {
//         window.fbAsyncInit = function () {
//             window.FB.init({
//                 appId: '1332019044439778',
//                 cookie: true,
//                 xfbml: true,
//                 version: 'v20.0'
//             });

//             window.FB.getLoginStatus(function (response) {
//                 statusChangeCallback(response);
//             });
//         };

//         (function (d, s, id) {
//             const js = d.createElement(s);
//             js.id = id;
//             js.src = 'https://connect.facebook.net/en_US/sdk.js';
//             const fjs = d.getElementsByTagName(s)[0];
//             fjs.parentNode.insertBefore(js, fjs);
//         })(document, 'script', 'facebook-jssdk');
//     }, [statusChangeCallback]);

//     return (
//         <div>
//             <h1>Facebook Page Manager</h1>

//             {!isLoggedIn && (
//                 <button onClick={loginWithFacebook}>Login with Facebook</button>
//             )}

//             {isLoggedIn && pages.length > 0 && (
//                 <div>
//                     <h2>Select a Page to Post</h2>
//                     <select
//                         onChange={(e) => setSelectedPageId(e.target.value)}
//                         value={selectedPageId}
//                     >
//                         <option value="">Select Page</option>
//                         {pages.map((page) => (
//                             <option key={page.id} value={page.id}>
//                                 {page.name}
//                             </option>
//                         ))}
//                     </select>

//                     <textarea
//                         placeholder="Write your post"
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)} // Update caption
//                     ></textarea>

//                     <input
//                         type="file"
//                         accept="image/*,video/*"
//                         multiple
//                         onChange={(e) => setFiles(Array.from(e.target.files))} // Handle multiple file uploads
//                     />

//                     <button onClick={handlePost}>Post to Page</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FacebookLoginCheck;



// import React, { useState, useEffect, useCallback } from 'react';

// const FacebookLoginCheck = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [pages, setPages] = useState([]);
//     const [selectedPageId, setSelectedPageId] = useState(null);
//     const [message, setMessage] = useState('');
//     const [userId, setUserId] = useState(null);
//     const [files, setFiles] = useState([]);

//     const statusChangeCallback = useCallback((response) => {
//         if (response.status === 'connected') {
//             setIsLoggedIn(true);
//             fetchUserData(response.authResponse.userID);
//             fetchPages(response.authResponse.accessToken);
//         } else {
//             setIsLoggedIn(false);
//         }
//     }, []);
//     console.log('id:', userId);
//     const fetchUserData = (id) => {
//         setUserId(id);
//     };

//     const fetchPages = (accessToken) => {
//         window.FB.api('/me/accounts', { access_token: accessToken }, function (response) {
//             if (response && !response.error) {
//                 setPages(response.data);
//             } else {
//                 console.error('Error fetching pages:', response.error);
//             }
//         });
//     };

//     const loginWithFacebook = () => {
//         window.FB.login(function (response) {
//             if (response.status === 'connected') {
//                 setIsLoggedIn(true);
//                 fetchPages(response.authResponse.accessToken);
//             } else {
//                 alert('Facebook login failed. Please try again.');
//             }
//         }, {
//             scope: 'email, public_profile, pages_show_list, pages_manage_posts',
//         });
//     };

//     const handlePost = async () => {
//         if (!selectedPageId) {
//             alert('Please select a page to post to.');
//             return;
//         }

//         const selectedPage = pages.find(page => page.id === selectedPageId);
//         if (selectedPage) {
//             const formData = new FormData();
//             files.forEach(file => formData.append('files', file));
//             if (message) formData.append('caption', message);

//             formData.append('accessToken', selectedPage.access_token);
//             formData.append('pageId', selectedPageId);

//             try {
//                 const response = await fetch('https://smp-be-mysql.vercel.app/facebook-upload/upload', {
//                     method: 'POST',
//                     body: formData,
//                 });

//                 if (!response.ok) {
//                     const errorText = await response.text();
//                     console.error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
//                     throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
//                 }

//                 const result = await response.json();
//                 console.log('Upload result:', result);
//                 alert('Post uploaded successfully!');
//             } catch (error) {
//                 console.error('Error uploading to backend:', error);
//                 alert(`Error uploading: ${error.message}`);
//             }
//         }
//     };

//     useEffect(() => {
//         window.fbAsyncInit = function () {
//             window.FB.init({
//                 appId: '1332019044439778',
//                 cookie: true,
//                 xfbml: true,
//                 version: 'v20.0'
//             });

//             window.FB.getLoginStatus(function (response) {
//                 statusChangeCallback(response);
//             });
//         };

//         (function (d, s, id) {
//             const js = d.createElement(s);
//             js.id = id;
//             js.src = 'https://connect.facebook.net/en_US/sdk.js';
//             const fjs = d.getElementsByTagName(s)[0];
//             fjs.parentNode.insertBefore(js, fjs);
//         })(document, 'script', 'facebook-jssdk');
//     }, [statusChangeCallback]);

//     return (
//         <div>
//             <h1>Facebook Page Manager</h1>

//             {!isLoggedIn && <button onClick={loginWithFacebook}>Login with Facebook</button>}

//             {isLoggedIn && pages.length > 0 && (
//                 <div>
//                     <h2>Select a Page to Post</h2>
//                     <select onChange={(e) => setSelectedPageId(e.target.value)} value={selectedPageId}>
//                         <option value="">Select Page</option>
//                         {pages.map((page) => (
//                             <option key={page.id} value={page.id}>{page.name}</option>
//                         ))}
//                     </select>

//                     <textarea
//                         placeholder="Write your post"
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                     ></textarea>

//                     <input
//                         type="file"
//                         accept="image/*,video/*"
//                         multiple
//                         onChange={(e) => setFiles(Array.from(e.target.files))}
//                     />

//                     <button onClick={handlePost}>Post to Page</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FacebookLoginCheck;





// import React, { useState, useEffect, useCallback } from 'react';

// const FacebookPostUploader = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [pages, setPages] = useState([]);
//     const [selectedPageId, setSelectedPageId] = useState(null);
//     const [caption, setCaption] = useState('');
//     const [files, setFiles] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState(null);

//     const statusChangeCallback = useCallback((response) => {
//         if (response.status === 'connected') {
//             setIsLoggedIn(true);
//             fetchPages(response.authResponse.accessToken);
//         } else {
//             setIsLoggedIn(false);
//         }
//     }, []);

//     const fetchPages = (accessToken) => {
//         window.FB.api('/me/accounts', { access_token: accessToken }, function (response) {
//             if (response && !response.error) {
//                 setPages(response.data);
//             } else {
//                 console.error('Error fetching pages:', response.error);
//             }
//         });
//     };

//     const loginWithFacebook = () => {
//         window.FB.login(function (response) {
//             if (response.status === 'connected') {
//                 setIsLoggedIn(true);
//                 fetchPages(response.authResponse.accessToken);
//             } else {
//                 alert('Facebook login failed. Please try again.');
//             }
//         }, {
//             scope: 'email, public_profile, pages_show_list, pages_manage_posts',
//         });
//     };

//     const handleCaptionChange = (e) => {
//         setCaption(e.target.value);
//     };

//     const handleFileChange = (event) => {
//         const selectedFiles = Array.from(event.target.files); // Convert FileList to array
//         setFiles(prevFiles => [...prevFiles, ...selectedFiles]); // Append new files to existing ones
//     };

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();

//     //     if (!selectedPageId) {
//     //         setMessage({ type: 'error', text: 'Please select a page to post to.' });
//     //         return;
//     //     }

//     //     if (!files.length && !caption) {
//     //         setMessage({ type: 'error', text: 'Please add a caption or select at least one file.' });
//     //         return;
//     //     }

//     //     setLoading(true);
//     //     setMessage(null);

//     //     const selectedPage = pages.find(page => page.id === selectedPageId);
//     //     const accessToken = selectedPage ? selectedPage.access_token : null;

//     //     if (!accessToken) {
//     //         setMessage({ type: 'error', text: 'Access token is missing for the selected page.' });
//     //         setLoading(false);
//     //         return;
//     //     }

//     //     const formData = new FormData();
//     //     formData.append('caption', caption);
//     //     formData.append('pageId', selectedPageId);
//     //     formData.append('accessToken', accessToken);
//     //     files.forEach(file => formData.append('files', file));

//     //     try {
//     //         const response = await fetch('https://smp-be-mysql.vercel.app/facebook-upload/upload', {
//     //             method: 'POST',
//     //             body: formData,
//     //         });

//     //         const result = await response.json();

//     //         if (response.ok) {
//     //             setMessage({ type: 'success', text: `Post uploaded successfully! Post ID: ${result.postId}` });
//     //             setCaption('');
//     //             setFiles([]);
//     //         } else {
//     //             throw new Error(result.error || 'Upload failed');
//     //         }
//     //     } catch (error) {
//     //         setMessage({ type: 'error', text: error.message });
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!selectedPageId) {
//             setMessage({ type: 'error', text: 'Please select a page to post to.' });
//             return;
//         }
//         if (!files.length && !caption) {
//             setMessage({ type: 'error', text: 'Please add a caption or select at least one file.' });
//             return;
//         }
//         setLoading(true);
//         setMessage(null);
//         const selectedPage = pages.find(page => page.id === selectedPageId);
//         const accessToken = selectedPage ? selectedPage.access_token : null;

//         if (!accessToken) {
//             setMessage({ type: 'error', text: 'Access token is missing for the selected page.' });
//             setLoading(false);
//             return;
//         }

//         const formData = new FormData();
//         formData.append('caption', caption);
//         formData.append('pageId', selectedPageId);
//         formData.append('accessToken', accessToken);
//         files.forEach(file => formData.append('files', file));

//         try {
//             // Upload to S3 via backend
//             const response = await fetch('https://smp-be-mysql.vercel.app/upload/upload-to-s3', {
//                 method: 'POST',
//                 body: formData,
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 // After successful upload, send Facebook post request with URLs of uploaded files
//                 const uploadedFileUrls = result.files;
//                 // Append URLs to your Facebook post request
//                 const facebookResponse = await fetch('https://smp-be-mysql.vercel.app/facebook-upload/upload', {
//                     method: 'POST',
//                     body: JSON.stringify({
//                         caption,
//                         accessToken,
//                         pageId: selectedPageId,
//                         mediaUrls: uploadedFileUrls, // Add these URLs to your Facebook post body
//                     }),
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 });

//                 const facebookResult = await facebookResponse.json();

//                 if (facebookResponse.ok) {
//                     setMessage({ type: 'success', text: `Post uploaded successfully! Post ID: ${facebookResult.postId}` });
//                     setCaption('');
//                     setFiles([]);
//                 } else {
//                     throw new Error(facebookResult.error || 'Facebook upload failed');
//                 }
//             } else {
//                 throw new Error(result.message || 'S3 upload failed');
//             }
//         } catch (error) {
//             setMessage({ type: 'error', text: error.message });
//         } finally {
//             setLoading(false);
//         }
//     };


//     useEffect(() => {
//         window.fbAsyncInit = function () {
//             window.FB.init({
//                 appId: '1332019044439778',
//                 cookie: true,
//                 xfbml: true,
//                 version: 'v20.0'
//             });

//             window.FB.getLoginStatus(function (response) {
//                 statusChangeCallback(response);
//             });
//         };

//         (function (d, s, id) {
//             const js = d.createElement(s);
//             js.id = id;
//             js.src = 'https://connect.facebook.net/en_US/sdk.js';
//             const fjs = d.getElementsByTagName(s)[0];
//             fjs.parentNode.insertBefore(js, fjs);
//         })(document, 'script', 'facebook-jssdk');
//     }, [statusChangeCallback]);

//     return (
//         <div className="facebook-post-uploader">
//             <h2>Facebook Page Post Manager</h2>

//             {!isLoggedIn && <button onClick={loginWithFacebook}>Login with Facebook</button>}

//             {isLoggedIn && pages.length > 0 && (
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                         <label htmlFor="pageSelect">Select a Page:</label>
//                         <select
//                             id="pageSelect"
//                             onChange={(e) => setSelectedPageId(e.target.value)}
//                             value={selectedPageId}
//                         >
//                             <option value="">-- Select Page --</option>
//                             {pages.map((page) => (
//                                 <option key={page.id} value={page.id}>{page.name}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <textarea
//                         placeholder="Write your caption..."
//                         value={caption}
//                         onChange={handleCaptionChange}
//                         rows="3"
//                         style={{ width: '100%', margin: '10px 0' }}
//                     />

//                     <input
//                         type="file"
//                         accept="image/*,video/*"
//                         multiple
//                         onChange={handleFileChange}
//                         style={{ display: 'block', margin: '10px 0' }}
//                     />

//                     {/* File Preview */}
//                     {files.length > 0 && (
//                         <div>
//                             <h4>Selected Files:</h4>
//                             <ul>
//                                 {files.map((file, index) => (
//                                     <li key={index}>
//                                         {file.type.startsWith('image/') && (
//                                             <img
//                                                 src={URL.createObjectURL(file)}
//                                                 alt={`Preview of ${file.name}`}
//                                                 style={{ maxWidth: '100px', margin: '5px' }}
//                                             />
//                                         )}
//                                         {file.type.startsWith('video/') && (
//                                             <video
//                                                 src={URL.createObjectURL(file)}
//                                                 controls
//                                                 style={{ maxWidth: '100px', margin: '5px' }}
//                                             />
//                                         )}
//                                         {file.name}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}

//                     <button type="submit" disabled={loading}>
//                         {loading ? 'Uploading...' : 'Post to Facebook'}
//                     </button>
//                 </form>
//             )}

//             {message && (
//                 <div className={`message ${message.type}`}>
//                     {message.text}
//                 </div>
//             )}

//             <style>{`
//                 .facebook-post-uploader {
//                     max-width: 600px;
//                     margin: 0 auto;
//                     padding: 20px;
//                     border: 1px solid #ddd;
//                     border-radius: 5px;
//                 }
//                 .message.success {
//                     color: green;
//                 }
//                 .message.error {
//                     color: red;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default FacebookPostUploader;



