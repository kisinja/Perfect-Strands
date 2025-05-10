"use client";

import { useWixClient } from "@/hooks/useWixCient";
import { LoginState } from "@wix/sdk";
import { useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

const Login = () => {
  const [mode, setMode] = useState<MODE>(MODE.LOGIN);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailCode, setEmailCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const wixClient = useWixClient();

  const router = useRouter();

  const pathName = window.location.href;

  const formTitle =
    mode === MODE.LOGIN
      ? "Welcome Back"
      : mode === MODE.REGISTER
      ? "Create Account"
      : mode === MODE.RESET_PASSWORD
      ? "Reset Password"
      : "Verify Email";

  const btnText =
    mode === MODE.LOGIN
      ? "Sign In"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Send Reset Link"
      : "Verify";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    let res;

    try {
      switch (mode) {
        case MODE.LOGIN:
          res = await wixClient.auth.login({
            email,
            password,
          });
          break;

        case MODE.REGISTER:
          res = await wixClient.auth.register({
            profile: { nickname: username },
            email,
            password,
          });

          break;

        case MODE.RESET_PASSWORD:
          res = await wixClient.auth.sendPasswordResetEmail(email, pathName);
          setSuccess("Password reset email sent");
          toast.success("Please check your email for the reset link.");
          setMode(MODE.LOGIN);
          break;

        case MODE.EMAIL_VERIFICATION:
          res = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;

        default:
          break;
      }

      console.log(res);

      switch (res?.loginState) {
        case LoginState.SUCCESS:
          setSuccess("Successful! You are being redirected.");
          if (!res?.data?.sessionToken) {
            setError("Session token not received. Please try again.");
            toast.error("Session token not received. Please try again.");
            return;
          }
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            res.data.sessionToken
          );

          if (!tokens?.accessToken) {
            setError("Access token not received.");
            toast.error("Access token not received. Please try again.");
            return;
          }

          console.log("Tokens:", tokens);
          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });
          wixClient.auth.setTokens(tokens);
          router.push("/");

          break;

        case LoginState.FAILURE:
          if (
            res.errorCode === "invalidEmail" ||
            res.errorCode === "invalidPassword"
          ) {
            setError("Invalid email or password!");
            toast.error("Invalid email or password!");
          } else if (res.errorCode === "emailAlreadyExists") {
            setError("Email already exists!");
          } else if (res.errorCode === "resetPassword") {
            setError("You need to reset your password!");
          } else {
            setError("Something went wrong!");
          }
          break;

        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.EMAIL_VERIFICATION);
          setSuccess("Verification code sent to your email!");
          break;

        case LoginState.OWNER_APPROVAL_REQUIRED:
          setError("Owner approval required!");
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center bg-wig-pattern p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-700">{formTitle}</h1>
            <p className="text-gray-500 mt-2">
              {mode === MODE.LOGIN
                ? "Sign in to continue"
                : mode === MODE.REGISTER
                ? "Join us today"
                : mode === MODE.RESET_PASSWORD
                ? "Enter your email to reset"
                : "Check your email for the code"}
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded mb-2">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded mb-2">
              <p className="text-sm font-medium">{success}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {mode === MODE.REGISTER && (
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="e.g. John"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                />
              </div>
            )}

            {mode !== MODE.EMAIL_VERIFICATION ? (
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="e.g. john@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label
                  htmlFor="emailCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Verification Code
                </label>
                <input
                  type="text"
                  id="emailCode"
                  placeholder="Enter 6-digit code"
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                />
              </div>
            )}

            {(mode === MODE.LOGIN || mode === MODE.REGISTER) && (
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                />
              </div>
            )}

            {mode === MODE.LOGIN && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setMode(MODE.RESET_PASSWORD)}
                  className="text-sm text-amber-600 hover:text-amber-700 transition underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                btnText
              )}
            </button>

            <div className="text-center text-sm text-gray-600">
              {mode === MODE.LOGIN ? (
                <span className="underline">
                  {"Don't"} have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode(MODE.REGISTER)}
                    className="text-amber-600 hover:text-amber-700 font-medium transition underline"
                  >
                    Sign up
                  </button>
                </span>
              ) : mode === MODE.REGISTER ? (
                <span className="underline">
                  Have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode(MODE.LOGIN)}
                    className="text-amber-600 hover:text-amber-700 font-medium transition underline"
                  >
                    Sign in
                  </button>
                </span>
              ) : mode === MODE.RESET_PASSWORD ? (
                <button
                  type="button"
                  onClick={() => setMode(MODE.LOGIN)}
                  className="text-amber-600 hover:text-amber-700 font-medium transition underline"
                >
                  Back to login
                </button>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
