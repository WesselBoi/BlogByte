import { useEffect, useState } from "react";

function Profile() {
  const [profileDetails, setProfileDetails] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfileDetails() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/user/profile", {
          credentials: "include",
        });
  
  
        if (response.ok) {
          const data = await response.json();
  
          setProfileDetails({
            name: data.profile?.name || "Unnamed",
            email: data.profile?.email || "unknown",
          });
        } else if (response.status === 401) {
          console.log("Unauthorized user");
          setProfileDetails({ name: "Guest", email: "guest" });
        } else {
          console.log("Other error:", response.status);
          setProfileDetails({ name: "Failed to fetch", email: `Error: ${response.status}` });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchProfileDetails();
  }, []);
  
  return (
    <div className="py-12">
      <div className="max-w-md mx-auto">
        <div className="bg-[#393E46] shadow-xl rounded-2xl overflow-hidden">
          {/* Profile header with gradient background */}
          <div className="bg-gradient-to-r from-[#222831] to-[#2a303a] px-6 py-10 text-[#EEEEEE]">
            <div className="flex justify-center">
              <div className="h-24 w-24 bg-[#393E46] rounded-full p-1 shadow-lg">
                <div className="h-full w-full bg-gradient-to-br from-[#FFD369] to-[#e6be5f] rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#222831]">
                  {loading || !profileDetails.name ? "..." : profileDetails.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Profile content */}
          <div className="p-8">
            {loading ? (
              <div className="flex flex-col items-center">
                <div className="w-2/3 h-7 bg-[#2a303a] rounded-md animate-pulse mb-3"></div>
                <div className="w-1/2 h-5 bg-[#2a303a] rounded-md animate-pulse"></div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-center text-[#FFD369] mb-2">
                  Welcome, {profileDetails.name}
                </h2>
                <div className="mt-6 pt-5 border-t border-[#2a303a]">
                  <div className="flex items-center py-2">
                    <div className="bg-[#222831] p-2 rounded-md mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFD369]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-[#EEEEEE] opacity-70 font-medium">EMAIL ADDRESS</div>
                      <div className="text-sm text-[#EEEEEE]">{profileDetails.email}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center py-2">
                    <div className="bg-[#222831] p-2 rounded-md mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFD369]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-[#EEEEEE] opacity-70 font-medium">ACCOUNT TYPE</div>
                      <div className="text-sm text-[#EEEEEE]">
                        {profileDetails.name === "Guest" ? "Guest User" : "Registered User"}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;