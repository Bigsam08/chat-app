import { authStore } from "../Store/authStore";
import { format } from "date-fns";

const MyRightSideProfile = () => {
  const { userAuth } = authStore();
  const createdDate = userAuth?.createdAt ? new Date(userAuth.createdAt) : null;
  return (
    <div className="w-full px-4 py-1">
      <div className="space-y-4 bg-left-side p-4 rounded-xl">
        <div className="flex items-center justify-center space-x-4 p-4">
          <img
            src={userAuth.profilePic || "/profile-avatar.jpg"}
            alt="avatar"
            className="w-16 h-16 border rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">{userAuth.userName}</h2>
          </div>
        </div>

        <div className="p-4 space-y-5">
          <h3 className="font-medium text-gray-500 ">Status</h3>
          <p className="text-sm">{userAuth?.status || "No status."}</p>
        </div>

        <hr className="border-gray-700" />
        <div className="flex justify-between text-sm px-4 mt-3">
          <p className="text-gray-500">Email: </p>
          <p> {userAuth.email} </p>
        </div>

        <div className="flex justify-between text-sm p-4">
          <p className="text-gray-500">Member since: </p>
          <p> {createdDate ? format(createdDate, "MMM yyyy") : "N/A"}</p>
        </div>

        <div className="flex justify-between text-sm px-4 mt-3">
          <p className="text-gray-500">Account status: </p>
          <p> Verified ✅</p>
        </div>
      </div>
    </div>
  );
};

export default MyRightSideProfile;
