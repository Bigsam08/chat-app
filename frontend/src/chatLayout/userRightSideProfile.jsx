
import { messageStore } from "../Store/messageStore";
import { format } from "date-fns";



const UserRightSideProfile = () => {
  const { selectedUser } = messageStore();
  const createdDate = selectedUser?.createdAt ? new Date(selectedUser.createdAt) : null;
  return (
    <div className="w-full px-4 py-1">
      <div className="space-y-4 bg-left-side p-4 rounded-xl">
        <div className="flex items-center justify-center space-x-4 p-4">
          <img
            src={selectedUser?.profilePic || "/profile-avatar.jpg"}
            alt="avatar"
            className="w-16 h-16 border rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">{selectedUser.userName}</h2>
          </div>
        </div>

        <div className="p-4 space-y-3 mb-4">
          <h3 className="text-gray-500">Status</h3>
         
          <p className="py-3 text-sm">{selectedUser?.status || "No status."}</p>
        </div>

         <hr className="border-gray-700" />
        <div className="flex justify-between text-sm px-4 mt-3">
          <p className="text-gray-500">Email: </p>
          <p> {selectedUser.email} </p>
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

export default UserRightSideProfile;
