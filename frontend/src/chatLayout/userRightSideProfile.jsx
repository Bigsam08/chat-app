
import { messageStore } from "../Store/messageStore";
import { format } from "date-fns";



const UserRightSideProfile = () => {
  const { selectedUser } = messageStore();
  const createdDate = selectedUser?.createdAt ? new Date(selectedUser.createdAt) : null;
  return (
    <div className="w-full lg:px-1 xl:px-12 py-1">

      {/** ----------- middle container ---------------------- */}
      <div className="space-y-4 shadow-2xl pb-10 border-2 border-dim p-4 rounded-xl">
        {/** ------------- display picture */}
        <div className="flex items-center justify-center space-x-4 p-4">
          <img
            src={selectedUser?.profilePic || "/profile-avatar.png"}
            alt="avatar"
            className="w-16 h-16 border-2 border-gray-300 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">{selectedUser.userName}</h2>
          </div>
        </div>

        {/** ------------- user information ---------------- */}
        <div className="p-4 space-y-3 mb-4">
          <h3 className="text-gray-500">Status</h3>
         
          <p className="py-3 text-xs">{selectedUser?.status || "No status."}</p>
        </div>

         <hr className="border border-dim" />
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
