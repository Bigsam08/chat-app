import { authStore } from "../Store/authStore";
import { format } from "date-fns";

const MyRightSideProfile = () => {
  const { userAuth } = authStore();
  const createdDate = userAuth?.createdAt ? new Date(userAuth.createdAt) : null;
  return (
    <div className="w-full lg:px-1 xl:px-12 py-1">
      {/**-------------------- middle div ---------------------------- */}
      <div className="space-y-4 shadow-2xl pb-10 border-2 border-dim p-4 rounded-xl">
        {/** ---- profile pic---------------- */}
        <div className="flex items-center justify-center space-x-4 p-4">
          <img
            src={userAuth?.profilePic || "/profile-avatar.jpg"}
            alt="avatar"
            className="w-16 h-16 border-2 border-gray-300 rounded-full"
          />
          <div>
            <h2 className="text-md font-semibold">{userAuth.userName}</h2>
          </div>
        </div>
        {/** ---------------- information ----------------- */}

        <div className="p-4 space-y-5">
          <h3 className="font-medium text-gray-500 ">Status</h3>
          <p className="text-xs">{userAuth?.status || "No status."}</p>
        </div>

        <hr className="border border-dim" />
        <div className="flex justify-between text-sm px-4 mt-3">
          <p className="text-gray-500">Email: </p>
          <p> {userAuth?.email} </p>
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
