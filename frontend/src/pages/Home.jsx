import { useState, useEffect } from 'react';
import { Pencil , BadgeMinus } from 'lucide-react';

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
        const response = await fetch('http://localhost:8000/blogs');
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
          }
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
      <div className="bg-gradient-to-b from-blue-100 to-purple-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-700">Blogs innit</h1>
          
          <div className="bg-indigo-50 rounded-lg p-6 mb-8 border border-indigo-200">
            <h2 className="text-xl font-semibold mb-4 text-indigo-600">Add a New Blog</h2>
            
            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                id="subject"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                value={newBlog.subject}
                onChange={handleNewBlogSubjectChange}
                placeholder="Enter blog subject"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                id="content"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors h-24"
                value={newBlog.content}
                onChange={handleNewBlogContentChange}
                placeholder="Enter blog content"
              />
            </div>
            
            <button 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
              onClick={addBlog}
            >
              Add Blog
            </button>
  
            {error && (
              <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
                <p>{error}</p>
              </div>
            )}
          </div>
  
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Recent Blogs</h2>
            
            {blogs.length === 0 ? (
              <p className="text-center text-gray-500 my-8">No blogs found. Add your first blog above!</p>
            ) : (
              <ul className="space-y-6">
                {blogs.map((blog) => (
                  <li
                    key={blog._id}
                    className="bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    {editingId === blog._id ? (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="edit-subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                          <input
                            id="edit-subject"
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            value={editedSubject}
                            onChange={(e) => setEditedSubject(e.target.value)}
                          />
                        </div>
                        <div>
                          <label htmlFor="edit-content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                          <textarea
                            id="edit-content"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors h-24"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <button
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                            onClick={cancelEditing}
                          >
                            Cancel
                          </button>
                          <button
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
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
                        <div className='display flex justify-between'>
                          <h3 className="text-xl font-semibold text-indigo-800 mb-3">
                            {blog.subject}
                          </h3>
                          <div className='flex flex-row gap-2'>
                            <Pencil 
                              className='cursor-pointer text-indigo-400 hover:text-indigo-600 transition-all'
                              onClick={() => startEditing(blog)}
                            />
                            <BadgeMinus 
                              className='cursor-pointer text-red-400 hover:text-red-600 transition-all' 
                              onClick={()=> deleteBlog(blog._id)}
                            />
                          </div>
                        </div>
                        <p className="text-gray-700 whitespace-pre-line">{blog.content} </p>
                        <div className="mt-4 text-xs text-gray-500">
                          Posted on: {new Date(blog.createdAt).toLocaleDateString()}
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }

export default Home;
