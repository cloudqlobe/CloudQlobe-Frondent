import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosinstance";
// import logo from "../../image/—Pngtree—beautiful admin roles line vector_5259362.png";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const adminID = localStorage.getItem("adminID");
      const memberAdminID = localStorage.getItem("MemberadminID");

      if (memberAdminID) {
        try {
          console.log(`Fetching Member Profile: ${memberAdminID}`);
          const response = await axiosInstance.get(
            `http://localhost:5000/v3/api/adminMember/AdminsMember/${memberAdminID}`
          );
          console.log("Member Profile Response:", response);
          setProfileData(response.data.data);
        } catch (error) {
          console.error("Error fetching admin member profile:", error);
        }
      } else if (adminID) {
        try {
          console.log(`Fetching Admin Profile: ${adminID}`);
          const response = await axiosInstance.get(
            `http://localhost:5000/v3/api/admin/AdminsgetId/${adminID}`
          );
          console.log("Admin Profile Response:", response);
          setProfileData(response.data.data);
        } catch (error) {
          console.error("Error fetching admin profile:", error);
        }
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="h-screen dark:bg-gray-700 bg-gray-200 pt-12">
      <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        <div className="border-b px-4 pb-6">
          <div className="text-center my-4">
            {/* <img
              className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
              src={logo}
              alt="Profile"
            /> */}
            <div className="py-2">
              {profileData ? (
                <>
                  <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                    {profileData.fullName}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Email:</strong> {profileData.email}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Role:</strong> {profileData.role}
                  </p>
                </>
              ) : (
                <p className="text-gray-700 dark:text-gray-300">
                  Loading profile...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;