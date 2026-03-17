import { Mail, User } from "lucide-react";
import type { IUser } from "../store/useAuthStore";

interface ProfileInputsProps {
  authUser: IUser | null;
}

const ProfileInputs = ({ authUser }: ProfileInputsProps) => {
  return (
    <>
      <div className="space-y-6">
        <div className="space-y-1.5">
          <div className="text-sm text-zinc-400 flex items-center gap-2">
            <User className="w-4 h-4" />
            Full Name
          </div>
          <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
            {authUser?.fullName}
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="text-sm text-zinc-400 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address
          </div>
          <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
            {authUser?.email}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileInputs;
