// import { useState, useEffect } from 'react';
// import { Pencil , BadgeMinus } from 'lucide-react';

// function Home() {
//     const [blogs, setBlogs] = useState([]);
//     const [newBlog, setNewBlog] = useState({ subject: '', content: '' });
//     const [editingId, setEditingId] = useState(null);
//     const [editedSubject, setEditedSubject] = useState('');
//     const [editedContent, setEditedContent] = useState('');
//     const [error, setError] = useState('');
  
//     function handleNewBlogSubjectChange(event) {
//       setNewBlog((prev) => ({ ...prev, subject: event.target.value }));
//     }
  
//     function handleNewBlogContentChange(event) {
//       setNewBlog((prev) => ({ ...prev, content: event.target.value }));
//     }
  
//     async function fetchBlogs() {
//       try {
//         const response = await fetch('http://localhost:8000/blogs', {
//           credentials: "include",   
//         });
//         const data = await response.json();
//         if (response.ok) {
//           setBlogs([...data]);
//         } else {
//           console.error('Error fetching blogs:', data);
//         }
//       } catch (err) {
//         console.error('Error fetching blogs:', err);
//       }
//     }
  
//     async function addBlog() {
//       if (!newBlog.subject.trim() || !newBlog.content.trim()) {
//         setError('Please enter both subject and content');
//         return;
//       }
  
//       try {
//         const response = await fetch('http://localhost:8000/blogs/add', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(newBlog),
//           credentials: "include",   
//         });
  
//         if (!response.ok) {
//           throw new Error('Failed to add blog');
//         }
  
//         setNewBlog({ subject: '', content: '' });
//         setError('');
//         await fetchBlogs();
//       } catch (err) {
//         setError('Could not add blog, try again later');
//         console.error('Error adding blog:', err);
//       }
//     }
  
//     async function deleteBlog(id) {
//       try{
//         const response = await fetch(`http://localhost:8000/blogs/delete/${id}`, {
//           method : "DELETE",
//           headers :{
//             'Content-Type': 'application/json',
//           },
//           credentials: "include",   
//         })
//         if(!response.ok){
//           throw new Error("Failed to delete blog")
//         }
  
//         fetchBlogs();
//       } catch(err){
//         console.error("Error deleting blog:", err)
//       }
//     }
  
//     function startEditing(blog) {
//       setEditingId(blog._id);
//       setEditedSubject(blog.subject);
//       setEditedContent(blog.content);
//     }
  
//     function cancelEditing() {
//       setEditingId(null);
//       setEditedSubject('');
//       setEditedContent('');
//     }
  
//     async function updateBlogSubject(id) {
//       if (!editedSubject.trim()) {
//         setError('Subject cannot be empty');
//         return;
//       }
  
//       try {
//         const response = await fetch(`http://localhost:8000/blogs/update/subject/${id}`, {
//           method: 'PATCH',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ updatedSubject: editedSubject }),
//           credentials: "include",   
//         });
  
//         if (!response.ok) {
//           throw new Error('Failed to update blog subject');
//         }
  
//         setEditingId(null);
//         setError('');
//         await fetchBlogs();
//       } catch (err) {
//         setError('Could not update blog subject, try again later');
//         console.error('Error updating blog subject:', err);
//       }
//     }
  
//     async function updateBlogContent(id) {
//       if (!editedContent.trim()) {
//         setError('Content cannot be empty');
//         return;
//       }
  
//       try {
//         const response = await fetch(`http://localhost:8000/blogs/update/content/${id}`, {
//           method: 'PATCH',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ updatedContent: editedContent }),
//           credentials: "include",   
//         });
  
//         if (!response.ok) {
//           throw new Error('Failed to update blog content');
//         }
  
//         setEditingId(null);
//         setError('');
//         await fetchBlogs();
//       } catch (err) {
//         setError('Could not update blog content, try again later');
//         console.error('Error updating blog content:', err);
//       }
//     }
  
//     useEffect(() => {
//       fetchBlogs();
//     }, []);
  
//     return (
//       <div className="bg-gradient-to-b from-blue-100 to-purple-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
//           <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-700">Blogs innit</h1>
          
//           <div className="bg-indigo-50 rounded-lg p-6 mb-8 border border-indigo-200">
//             <h2 className="text-xl font-semibold mb-4 text-indigo-600">Add a New Blog</h2>
            
//             <div className="mb-4">
//               <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
//               <input
//                 id="subject"
//                 type="text"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                 value={newBlog.subject}
//                 onChange={handleNewBlogSubjectChange}
//                 placeholder="Enter blog subject"
//               />
//             </div>
            
//             <div className="mb-4">
//               <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
//               <textarea
//                 id="content"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors h-24"
//                 value={newBlog.content}
//                 onChange={handleNewBlogContentChange}
//                 placeholder="Enter blog content"
//               />
//             </div>
            
//             <button 
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
//               onClick={addBlog}
//             >
//               Add Blog
//             </button>
  
//             {error && (
//               <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
//                 <p>{error}</p>
//               </div>
//             )}
//           </div>
  
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Recent Blogs</h2>
            
//             {blogs.length === 0 ? (
//               <p className="text-center text-gray-500 my-8">No blogs found. Add your first blog above! <br />
//               If you're not logged in, you won't see your exisiting vlogs!</p>
//             ) : (
//               <ul className="space-y-6">
//                 {blogs.map((blog) => (
//                   <li
//                     key={blog._id}
//                     className="bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-lg transition-shadow"
//                   >
//                     {editingId === blog._id ? (
//                       <div className="space-y-4">
//                         <div>
//                           <label htmlFor="edit-subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
//                           <input
//                             id="edit-subject"
//                             type="text"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                             value={editedSubject}
//                             onChange={(e) => setEditedSubject(e.target.value)}
//                           />
//                         </div>
//                         <div>
//                           <label htmlFor="edit-content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
//                           <textarea
//                             id="edit-content"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors h-24"
//                             value={editedContent}
//                             onChange={(e) => setEditedContent(e.target.value)}
//                           />
//                         </div>
//                         <div className="flex justify-end space-x-2">
//                           <button
//                             className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
//                             onClick={cancelEditing}
//                           >
//                             Cancel
//                           </button>
//                           <button
//                             className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
//                             onClick={() => {
//                               updateBlogSubject(blog._id);
//                               updateBlogContent(blog._id);
//                             }}
//                           >
//                             Save Changes
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <>
//                         <div className='display flex justify-between'>
//                           <h3 className="text-xl font-semibold text-indigo-800 mb-3">
//                             {blog.subject}
//                           </h3>
//                           <div className='flex flex-row gap-2'>
//                             <Pencil 
//                               className='cursor-pointer text-indigo-400 hover:text-indigo-600 transition-all'
//                               onClick={() => startEditing(blog)}
//                             />
//                             <BadgeMinus 
//                               className='cursor-pointer text-red-400 hover:text-red-600 transition-all' 
//                               onClick={()=> deleteBlog(blog._id)}
//                             />
//                           </div>
//                         </div>
//                         <p className="text-gray-700 whitespace-pre-line">{blog.content} </p>
//                         <div className="mt-4 text-xs text-gray-500">
//                           Posted on: {new Date(blog.createdAt).toLocaleDateString()}
//                         </div>
//                       </>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

// export default Home;

























import { useState, useEffect } from 'react';
import { Pencil, BadgeMinus } from 'lucide-react';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ subject: '', content: '' });
  const [editingId, setEditingId] = useState(null);
  const [editedSubject, setEditedSubject] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [error, setError] = useState('');

  function handleNewBlogSubjectChange(event) {
    setNewBlog((prev) => ({ ...prev, subject: event.target.value }));
  }

  function handleNewBlogContentChange(event) {
    setNewBlog((prev) => ({ ...prev, content: event.target.value }));
  }

  async function fetchBlogs() {
    try {
      const response = await fetch('http://localhost:8000/blogs', {
        credentials: "include",   
      });
      const data = await response.json();
      if (response.ok) {
        setBlogs([...data]);
      } else {
        console.error('Error fetching blogs:', data);
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  }

  async function addBlog() {
    if (!newBlog.subject.trim() || !newBlog.content.trim()) {
      setError('Please enter both subject and content');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/blogs/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
        credentials: "include",   
      });

      if (!response.ok) {
        throw new Error('Failed to add blog');
      }

      setNewBlog({ subject: '', content: '' });
      setError('');
      await fetchBlogs();
    } catch (err) {
      setError('Could not add blog, try again later');
      console.error('Error adding blog:', err);
    }
  }

  async function deleteBlog(id) {
    try{
      const response = await fetch(`http://localhost:8000/blogs/delete/${id}`, {
        method : "DELETE",
        headers :{
          'Content-Type': 'application/json',
        },
        credentials: "include",   
      })
      if(!response.ok){
        throw new Error("Failed to delete blog")
      }

      fetchBlogs();
    } catch(err){
      console.error("Error deleting blog:", err)
    }
  }

  function startEditing(blog) {
    setEditingId(blog._id);
    setEditedSubject(blog.subject);
    setEditedContent(blog.content);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditedSubject('');
    setEditedContent('');
  }

  async function updateBlogSubject(id) {
    if (!editedSubject.trim()) {
      setError('Subject cannot be empty');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/blogs/update/subject/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updatedSubject: editedSubject }),
        credentials: "include",   
      });

      if (!response.ok) {
        throw new Error('Failed to update blog subject');
      }

      setEditingId(null);
      setError('');
      await fetchBlogs();
    } catch (err) {
      setError('Could not update blog subject, try again later');
      console.error('Error updating blog subject:', err);
    }
  }

  async function updateBlogContent(id) {
    if (!editedContent.trim()) {
      setError('Content cannot be empty');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/blogs/update/content/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updatedContent: editedContent }),
        credentials: "include",   
      });

      if (!response.ok) {
        throw new Error('Failed to update blog content');
      }

      setEditingId(null);
      setError('');
      await fetchBlogs();
    } catch (err) {
      setError('Could not update blog content, try again later');
      console.error('Error updating blog content:', err);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 mb-2 leading-tight">
            Blog App
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Share your thoughts, ideas, and stories with the world
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-indigo-100 transform transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center">
            <span className="bg-indigo-100 text-indigo-600 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </span>
            Create New Blog
          </h2>
          
          <div className="mb-6">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              id="subject"
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm"
              value={newBlog.subject}
              onChange={handleNewBlogSubjectChange}
              placeholder="What's your blog about?"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              id="content"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm h-32"
              value={newBlog.content}
              onChange={handleNewBlogContentChange}
              placeholder="Share your thoughts..."
            />
          </div>
          
          <button 
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-[1.01] shadow-md cursor-pointer"
            onClick={addBlog}
          >
            Publish Blog
          </button>

          {error && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200 flex items-center">
            <span className="bg-indigo-100 text-indigo-600 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
              </svg>
            </span>
            Recent Blogs
          </h2>
          
          {blogs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-10 text-center">
              <div className="flex justify-center mb-4">
                <svg className="h-16 w-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-gray-500 mb-2 text-lg font-medium">No blogs found</p>
              <p className="text-gray-400">Add your first blog above! <br />
              If you're not logged in, you won't see your existing blogs.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  {editingId === blog._id ? (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="edit-subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <input
                          id="edit-subject"
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          value={editedSubject}
                          onChange={(e) => setEditedSubject(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="edit-content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <textarea
                          id="edit-content"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors h-32"
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-end space-x-3 pt-2">
                        <button
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                          onClick={cancelEditing}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm"
                          onClick={() => {
                            updateBlogSubject(blog._id);
                            updateBlogContent(blog._id);
                          }}
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-indigo-800">
                          {blog.subject}
                        </h3>
                        <div className="flex space-x-3">
                          <button className="p-1.5 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors" onClick={() => startEditing(blog)}>
                            <Pencil size={18} />
                          </button>
                          <button className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors" onClick={() => deleteBlog(blog._id)}>
                            <BadgeMinus size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="prose prose-indigo max-w-none">
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed">{blog.content}</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-sm text-gray-500">
                        <svg className="h-4 w-4 text-gray-400 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Posted on: {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;