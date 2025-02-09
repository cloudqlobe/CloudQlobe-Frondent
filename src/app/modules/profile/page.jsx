import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosinstance";
import adminContext from "../../../context/page";

const Profile = () => {
  const { adminDetails } = useContext(adminContext)
  const [profileData, setProfileData] = useState(null);
  console.log(profileData);

  useEffect(() => {
    const fetchProfile = async () => {
  console.log(adminDetails.role);
  
      try {
        if (adminDetails?.role) {
          const response = await axiosInstance.get(
            `v3/api/admin/profile/${adminDetails?.id}`
          );          
          setProfileData(response.data);
        } 
        else if (adminDetails?.role) {
          const response = await axiosInstance.get(
            `v3/api/adminMember/${adminDetails?.role}/${adminDetails?.id}`
          );
          console.log(response);
          setProfileData(response.data);
        }
      } catch (error) {
        console.error("Error fetching admin member profile:", error);
      }
    };
  
    fetchProfile();
  }, [adminDetails?.role]);
  

  return (
    <div className="h-screen dark:bg-gray-700 bg-gray-200 pt-12">
      <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        <div className="border-b px-4 pb-6">
          <div className="text-center my-4">
            <img
              className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
              src="/images/—Pngtree—beautiful admin roles line vector_5259362.png"
              alt="Profile"
            />
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