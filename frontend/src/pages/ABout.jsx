import React from 'react';

function About() {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="text-center mb-10">
        <span className="inline-block bg-[#222831] text-[#FFD369] px-3 py-1 rounded-full text-sm font-medium mb-3">
          About Us
        </span>
        <h1 className="text-4xl font-bold text-[#EEEEEE] mb-4">
          About BlogByte
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-[#FFD369] to-[#e6be5f] mx-auto mb-6"></div>
        <p className="text-lg text-[#EEEEEE] max-w-lg mx-auto">
          This is a CRUD blog app built with React and Express.
        </p>
      </div>

      <div className="bg-[#393E46] rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 bg-gradient-to-br from-[#222831] to-[#393E46] p-10 text-[#EEEEEE] border border-amber-50 rounded-3xl flex items-center justify-center">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-[#FFD369]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-xl font-semibold mb-2 text-[#FFD369]">BlogByte</h3>
              <p className="text-[#EEEEEE]">Create, read, update, and delete blog posts with ease</p>
            </div>
          </div>
          <div className="md:w-1/2 p-10">
            <h3 className="text-xl font-bold text-[#FFD369] mb-4">Features</h3>
            <ul className="space-y-3 text-[#EEEEEE]">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[#FFD369] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                User authentication system
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[#FFD369] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Create and edit blog posts
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[#FFD369] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Responsive design for all devices
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[#FFD369] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Built with modern React and Express
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-10 text-center">
        <p className="text-[#EEEEEE] text-sm opacity-70">
          &copy; {new Date().getFullYear()} BlogByte | All rights reserved
        </p>
      </div>
    </div>
  );
}

export default About;