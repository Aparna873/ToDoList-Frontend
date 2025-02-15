import { useEffect, useState, useRef } from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";  // Import for navigation
import axios from "axios";
import useAxiosInterceptor from "../../GlobalVariables/useAxiousInterceptor";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [cookies, removeCookie] = useCookies(["auth_token"]);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const axiousInstance = useAxiosInterceptor();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    joinDate: "",
    avatar: "",
  });
  
  useEffect(() => {
    if (!cookies.auth_token) {
      console.warn("No auth token found.");
      navigate("/login");
      return;
    }
  
    console.log("Token:", cookies.auth_token); // 🔍 Debugging: See if the token exists
  
    try {
      const decoded = jwtDecode(cookies.auth_token);
      console.log("Decoded Token:", decoded); // 🔍 Debugging: Check decoded token
  
      if (decoded) {
        setProfileData({
          name: decoded.username || "User",
          email: decoded.email || "user2@gmail.com",
          joinDate: decoded.joinDate
            ? new Date(decoded.joinDate).toLocaleDateString()
            : "N/A",
        });
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/login"); // Redirect if decoding fails
    }
  }, [cookies, navigate]);
  

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await axiousInstance.get(
          "http://localhost:3000/api/profile/getAvatar",
          {
            headers: {
              Authorization: `Bearer ${cookies.auth_token}`,
            },
          }
        );
        setProfileData((prev) => ({ ...prev, avatar: response.data.avatar }));
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };
    fetchAvatar();
  }, [cookies]);
   
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;
        setProfileData((prev) => ({ ...prev, avatar: base64Image }));

        const formData = new FormData();
        formData.append("avatar", file);

        try {
          const response = await axiousInstance.put(
            "http://localhost:3000/api/profile/updateAvatar",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${cookies.auth_token}`,
              },
            }
          );

          toast.success("Profile picture uploaded successfully!"); // Show success toast
        } catch (error) {
          console.error("Error uploading avatar:", error);
          toast.error(error.response?.data?.message || "Something went wrong!"); // Show error toast
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Logout Function
  const handleLogout = () => {
    removeCookie("auth_token", { path: "/" }); 
    navigate("/login"); 
  };

  return (
    <div>
      <div className="max-w-md w-full mx-auto py-5">
        <div className="bg-white rounded-lg shadow-lg h-auto">
          {/* Header Banner */}
          <div className="relative h-24 bg-gradient-to-r from-[#2A3674] to-[#7886C7] rounded-t-lg">
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="absolute top-3 right-3 px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-md backdrop-blur-sm transition-all duration-300 flex items-center gap-1 text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3zm11 4.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L11.586 7H6a1 1 0 1 1 0-2h5.586L8.293 1.707a1 1 0 0 1 1.414-1.414L14 4.586v2.828z" clipRule="evenodd" />
              </svg>
              Logout
            </button>
  
            {/* Profile Avatar */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              <div className="w-24 h-24 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-lg">
                {profileData.avatar ? (
                  <img src={profileData.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <FaUser className="w-full h-full p-5 text-[#7886C7]" />
                )}
              </div>
            </div>
          </div>
  
          {/* Profile Content */}
          <div className="pt-16 px-6 pb-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-[#2A3674]">{profileData.name}</h2>
              <p className="text-sm text-[#7886C7]">{profileData.email}</p>
            </div>
  
            {/* Profile Details */}
            <div className="grid grid-cols-1 gap-4 bg-gray-50 p-4 rounded-lg mt-4 text-sm">
              <div>
                <label className="flex items-center text-xs text-[#7886C7] mb-1">
                  <FaEnvelope className="mr-1" /> Email Address
                </label>
                <p className="text-[#2A3674] font-medium">{profileData.email}</p>
              </div>
              <div>
                <label className="flex items-center text-xs text-[#7886C7] mb-1">
                  <MdDateRange className="mr-1" /> Member Since
                </label>
                <p className="text-[#2A3674] font-medium">{profileData.joinDate}</p>
              </div>
            </div>
  
            {/* Upload Profile Section */}
            <div className="flex flex-col items-center mt-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className="hidden"
              />
              <button
                onClick={handleButtonClick}
                className="px-4 py-2 bg-[#2A3674] text-white rounded-md hover:bg-red-700 transition duration-300 flex items-center gap-1 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5.5 13a3.5 3.5 0 0 1 0-7h.5a5 5 0 0 1 9.5-1h.5a3.5 3.5 0 0 1 0 7H13v-1h2a2.5 2.5 0 0 0 0-5h-1.17a4 4 0 0 0-7.66 0H6a2.5 2.5 0 0 0 0 5h2v1H5.5z"/>
                  <path d="M9 13h2v3H9v-3z"/>
                </svg>
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Profile;
