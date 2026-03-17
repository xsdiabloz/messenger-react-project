import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import type { ILogin } from "../types/types";
import LoginInputs from "../components/loginInputs";
import { Loader2, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";

const LoginPage = () => {
  const { login, isLoggingIn } = useAuthStore();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<ILogin>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <LoginInputs
              formData={formData}
              setFormData={setFormData}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?
              <Link to="/signup" className="link link-primary ml-1.5">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
      <AuthImagePattern
        title="Welcome back!"
        subtitle="Sign in to continue your conversations and catch up with your messages."
      />
    </div>
  );
};

export { LoginPage };
