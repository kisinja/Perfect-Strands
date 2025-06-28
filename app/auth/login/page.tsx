"use client";

import { useWixClient } from "@/hooks/useWixCient";
import { LoginState } from "@wix/sdk";
import { useEffect, useState } from "react";
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
  const [pathName, setPathName] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathName(window.location.href);
    }
  }, []);

  const formTitle =
    mode === MODE.LOGIN
      ? "Welcome Back, Beauty"
      : mode === MODE.REGISTER
        ? "Join the Perfect Strands Family"
        : mode === MODE.RESET_PASSWORD
          ? "Reset Your Password"
          : "Verify Your Email";

  const formSubtitle =
    mode === MODE.LOGIN
      ? "Sign in to access your account and continue your hair transformation journey"
      : mode === MODE.REGISTER
        ? "Create an account to enjoy exclusive benefits and faster checkout"
        : mode === MODE.RESET_PASSWORD
          ? "Enter your email to receive a password reset link"
          : "We've sent a verification code to your email";

  const btnText =
    mode === MODE.LOGIN
      ? "Sign In & Shine"
      : mode === MODE.REGISTER
        ? "Become a Member"
        : mode === MODE.RESET_PASSWORD
          ? "Send Reset Link"
          : "Verify & Continue";

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-amber-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-60 right-20 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-rose-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-amber-100 flex flex-col md:flex-row">
          {/* Left side - Branding */}
          <div className="md:w-1/2 bg-gradient-to-br from-amber-400 to-pink-400 p-8 flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/wig-pattern.png')] bg-cover opacity-10"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-2">PERFECT STRANDS</h1>
              <p className="text-amber-100 mb-6">Your Hair Transformation Starts Here</p>
              <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
              <p className="text-sm opacity-90 mb-8">
                Join thousands of satisfied customers who found their perfect look with us
              </p>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-amber-200"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="md:w-1/2 p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">{formTitle}</h1>
              <p className="text-gray-600 mt-2">{formSubtitle}</p>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded mb-4 flex items-start">
                <svg
                  className="w-5 h-5 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded mb-4 flex items-start">
                <svg
                  className="w-5 h-5 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
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
                  <div className="relative">
                    <input
                      type="text"
                      id="username"
                      placeholder="e.g. HairLover"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition pl-10"
                    />
                    <svg
                      className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
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
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      placeholder="e.g. your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition pl-10"
                    />
                    <svg
                      className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label
                    htmlFor="emailCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Verification Code
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="emailCode"
                      placeholder="Enter 6-digit code"
                      value={emailCode}
                      onChange={(e) => setEmailCode(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition pl-10"
                    />
                    <svg
                      className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
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
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition pl-10"
                    />
                    <svg
                      className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {mode === MODE.LOGIN && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-amber-500 focus:ring-amber-400 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>
                  <span
                    onClick={() => setMode(MODE.RESET_PASSWORD)}
                    className="text-sm text-amber-600 hover:text-amber-700 transition font-medium"
                  >
                    Forgot password?
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg hover:shadow-amber-200/50"
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
                  <>
                    {btnText}
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </button>

              <div className="text-center text-sm text-gray-600">
                {mode === MODE.LOGIN ? (
                  <p>
                    {"Don't"} have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setMode(MODE.REGISTER)}
                      className="text-amber-600 hover:text-amber-700 font-medium transition"
                    >
                      Sign up now
                    </button>
                  </p>
                ) : mode === MODE.REGISTER ? (
                  <p>
                    Already a member?{" "}
                    <button
                      type="button"
                      onClick={() => setMode(MODE.LOGIN)}
                      className="text-amber-600 hover:text-amber-700 font-medium transition"
                    >
                      Sign in here
                    </button>
                  </p>
                ) : mode === MODE.RESET_PASSWORD ? (
                  <button
                    type="button"
                    onClick={() => setMode(MODE.LOGIN)}
                    className="text-amber-600 hover:text-amber-700 font-medium transition"
                  >
                    Back to login
                  </button>
                ) : null}
              </div>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-200 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-200 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm3 8a3 3 0 11-6 0 3 3 0 016 0zm-3 7c-2.761 0-5-2.239-5-5h2c0 1.657 1.343 3 3 3s3-1.343 3-3h2c0 2.761-2.239 5-5 5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Login;