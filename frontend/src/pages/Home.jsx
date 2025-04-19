import { useState, useEffect } from "react";
import { Pencil, BadgeMinus } from "lucide-react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ subject: "", content: "" });
  const [editingId, setEditingId] = useState(null);
  const [editedSubject, setEditedSubject] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [error, setError] = useState("");


  function handleNewBlogSubjectChange(event) {
    setNewBlog((prev) => ({ ...prev, subject: event.target.value }));
  }

  function handleNewBlogContentChange(event) {
    setNewBlog((prev) => ({ ...prev, content: event.target.value }));
  }

  async function fetchBlogs() {
    try {
      const response = await fetch("http://localhost:8000/blogs", {
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setBlogs([...data]);
      } else {
        console.error("Error fetching blogs:", data);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  }

  async function addBlog() {
    if (!newBlog.subject.trim() || !newBlog.content.trim()) {
      setError("Please enter both subject and content");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/blogs/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlog),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to add blog");
      }

      setNewBlog({ subject: "", content: "" });
      setError("");
      toast.success('Blog added successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      await fetchBlogs();
    } catch (err) {
      setError("Could not add blog, try again later");
      console.error("Error adding blog:", err);
    }
  }

  async function deleteBlog(id) {
    try {
      const response = await fetch(`http://localhost:8000/blogs/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }

      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  }

  function startEditing(blog) {
    setEditingId(blog._id);
    setEditedSubject(blog.subject);
    setEditedContent(blog.content);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditedSubject("");
    setEditedContent("");
  }

  async function updateBlogSubject(id) {
    if (!editedSubject.trim()) {
      setError("Subject cannot be empty");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/blogs/update/subject/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updatedSubject: editedSubject }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update blog subject");
      }

      setEditingId(null);
      setError("");
      await fetchBlogs();
    } catch (err) {
      setError("Could not update blog subject, try again later");
      console.error("Error updating blog subject:", err);
    }
  }

  async function updateBlogContent(id) {
    if (!editedContent.trim()) {
      setError("Content cannot be empty");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/blogs/update/content/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updatedContent: editedContent }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update blog content");
      }

      setEditingId(null);
      setError("");
      await fetchBlogs();
    } catch (err) {
      setError("Could not update blog content, try again later");
      console.error("Error updating blog content:", err);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-[#222831] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
        <ToastContainer />
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FFD369] to-[#EEEEEE] mb-2 leading-tight">
            Blog App
          </h1>
          <p className="text-[#EEEEEE] max-w-lg mx-auto">
            Share your thoughts, ideas, and stories with the world
          </p>
        </div>

        <div className="bg-[#393E46] rounded-2xl shadow-xl p-8 mb-10 border border-[#4a545f] transform transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-[#FFD369] mb-6 flex items-center">
            <span className="bg-[#222831] text-[#FFD369] p-2 rounded-full mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            Create New Blog
          </h2>

          <div className="mb-6">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-[#EEEEEE] mb-1"
            >
              Subject
            </label>
            <input
              id="subject"
              type="text"
              className="w-full px-4 py-3 border border-[#222831] bg-[#2d333d] text-[#EEEEEE] rounded-lg focus:ring-2 focus:ring-[#FFD369] focus:border-[#FFD369] transition-colors shadow-sm"
              value={newBlog.subject}
              onChange={handleNewBlogSubjectChange}
              placeholder="What's your blog about?"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-[#EEEEEE] mb-1"
            >
              Content
            </label>
            <textarea
              id="content"
              className="w-full px-4 py-3 border border-[#222831] bg-[#2d333d] text-[#EEEEEE] rounded-lg focus:ring-2 focus:ring-[#FFD369] focus:border-[#FFD369] transition-colors shadow-sm h-32"
              value={newBlog.content}
              onChange={handleNewBlogContentChange}
              placeholder="Share your thoughts..."
            />
          </div>

          <button
            className="w-full bg-[#FFD369] hover:bg-[#e6be5f] text-[#222831] font-medium py-3 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD369] transform hover:scale-[1.01] shadow-md cursor-pointer"
            onClick={addBlog}
          >
            Publish Blog
          </button>

          {error && (
            <div
              className="mt-4 bg-[#442323] border-l-4 border-red-500 text-red-300 p-4 rounded-md"
              role="alert"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
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
          <h2 className="text-2xl font-bold text-[#EEEEEE] mb-6 pb-2 border-b border-[#393E46] flex items-center">
            <span className="bg-[#393E46] text-[#FFD369] p-2 rounded-full mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
              </svg>
            </span>
            Recent Blogs
          </h2>

          {blogs.length === 0 ? (
            <div className="bg-[#393E46] rounded-xl shadow-md p-10 text-center">
              <div className="flex justify-center mb-4">
                <svg
                  className="h-16 w-16 text-[#6c7884]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <p className="text-[#EEEEEE] mb-2 text-lg font-medium">
                No blogs found
              </p>
              <p className="text-[#a0a8b1]">
                Add your first blog above! <br />
                If you're not logged in, you won't see your existing blogs.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-[#393E46] rounded-xl shadow-md p-6 border border-[#4a545f] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  {editingId === blog._id ? (
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="edit-subject"
                          className="block text-sm font-medium text-[#EEEEEE] mb-1"
                        >
                          Subject
                        </label>
                        <input
                          id="edit-subject"
                          type="text"
                          className="w-full px-4 py-3 border border-[#222831] bg-[#2d333d] text-[#EEEEEE] rounded-lg focus:ring-2 focus:ring-[#FFD369] focus:border-[#FFD369] transition-colors"
                          value={editedSubject}
                          onChange={(e) => setEditedSubject(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="edit-content"
                          className="block text-sm font-medium text-[#EEEEEE] mb-1"
                        >
                          Content
                        </label>
                        <textarea
                          id="edit-content"
                          className="w-full px-4 py-3 border border-[#222831] bg-[#2d333d] text-[#EEEEEE] rounded-lg focus:ring-2 focus:ring-[#FFD369] focus:border-[#FFD369] transition-colors h-32"
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-end space-x-3 pt-2">
                        <button
                          className="px-4 py-2 bg-[#222831] text-[#EEEEEE] rounded-lg hover:bg-[#2a303a] transition-colors font-medium"
                          onClick={cancelEditing}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-2 bg-[#FFD369] text-[#222831] rounded-lg hover:bg-[#e6be5f] transition-colors font-medium shadow-sm"
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
                        <h3 className="text-xl font-bold text-[#FFD369]">
                          {blog.subject}
                        </h3>
                        <div className="flex space-x-3">
                          <button
                            className="p-1.5 rounded-full bg-[#222831] text-[#FFD369] hover:bg-[#2a303a] transition-colors"
                            onClick={() => startEditing(blog)}
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            className="p-1.5 rounded-full bg-[#442323] text-red-300 hover:bg-[#552a2a] transition-colors"
                            onClick={() => deleteBlog(blog._id)}
                          >
                            <BadgeMinus size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-[#EEEEEE] whitespace-pre-line leading-relaxed">
                          {blog.content}
                        </p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-[#2a303a] flex items-center text-sm text-[#a0a8b1]">
                        <svg
                          className="h-4 w-4 text-[#a0a8b1] mr-1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Posted on:{" "}
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
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