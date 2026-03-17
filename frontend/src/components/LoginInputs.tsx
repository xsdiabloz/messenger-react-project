import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import type { IInputs, ILogin } from "../types/types";

const LoginInputs = ({
  formData,
  setFormData,
  showPassword,
  setShowPassword,
}: IInputs<ILogin>) => {
  return (
    <>
      <div className="form-control mb-7">
        <label className="label">
          <span className="label-text font-medium">Email</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
            <Mail className="size-5 text-base-content/40" />
          </div>
          <input
            type="email"
            className={`input input-bordered w-full pl-10`}
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
      </div>

      <div className="form-control mb-7">
        <label className="label">
          <span className="label-text font-medium">Password</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
            <Lock className="size-5 text-base-content/40" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            className={`input input-bordered w-full pl-10`}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer
                   group active:scale-95 transition-all duration-100 ease-out"
            onClick={() => setShowPassword(!showPassword)}
          >
            <div className="group-active:-translate-y-1 transition-transform duration-150 ease-in-out">
              {showPassword ? (
                <Eye className="size-5 text-base-content/40" />
              ) : (
                <EyeOff className="size-5 text-base-content/40" />
              )}
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginInputs;
