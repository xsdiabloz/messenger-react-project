import { Camera } from "lucide-react";
import type { IUser } from "../store/useAuthStore";

interface ProfileAvatarProps {
  authUser: IUser | null;
  selectedImg: null | string;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  isUpdatingProfile: boolean;
}

const ProfileAvatar = ({
  selectedImg,
  authUser,
  isUpdatingProfile,
  handleImageUpload,
}: ProfileAvatarProps) => {
  return (
    <>
      <div className="flex flex-col items-center gap-4 mt-8">
        <div className="relative">
          <img
            src={selectedImg || authUser?.profilePic || "/avatar.png"}
            alt="Profile"
            className="size-32 rounded-full object-cover border-4 "
          />
          <label
            htmlFor="avatar-upload"
            className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
          >
            <Camera className="w-5 h-5 text-base-200" />
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />
          </label>
        </div>
        <p className="text-sm text-zinc-400">
          {isUpdatingProfile
            ? "Uploading..."
            : "Click the camera icon to update your photo"}
        </p>
      </div>
    </>
  );
};

export default ProfileAvatar;
