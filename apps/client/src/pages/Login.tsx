import { useState } from "react";
import { useLogin } from "../hooks/api/useAuth";
import { motion } from "framer-motion";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const mutation = useLogin();

  // 处理错误反馈逻辑
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (name.trim() && password.trim()) {
      mutation.mutate(
        { name: name.trim(), password: password.trim() },
        {
          onError: (error: any) => {
            setErrorMsg(error.message || "登录失败");
          },
        },
      );
    } else {
      setErrorMsg("请输入用户名和密码");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 font-sans lg:px-8 sm:px-6 relative overflow-hidden">
      {/* 液态玻璃效果背景 */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-200 to-purple-200 opacity-20"
            initial={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              x: Math.random() * 100 - 20,
              y: Math.random() * 100 - 20,
              rotate: Math.random() * 360,
            }}
            animate={{
              x: [null, Math.random() * 50 - 25, 0],
              y: [null, Math.random() * 50 - 25, 0],
              rotate: [0, Math.random() * 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className="w-full max-w-md backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-10 shadow-2xl transition-all duration-300 space-y-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            欢迎回来
          </h2>
          <p className="mt-2 text-sm text-gray-600">登录您的账户继续</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="relative block w-full appearance-none border border-gray-200 bg-white/50 rounded-lg px-4 py-3 text-gray-800 transition-all duration-300 focus:z-10 focus:border-indigo-500 sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 placeholder-gray-400 shadow-sm hover:shadow-md"
                placeholder="请输入用户名"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full appearance-none border border-gray-200 bg-white/50 rounded-lg px-4 py-3 text-gray-800 transition-all duration-300 focus:z-10 focus:border-indigo-500 sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 placeholder-gray-400 shadow-sm hover:shadow-md"
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {errorMsg && (
            <div className="animate-fade-in rounded-lg bg-red-50 py-2 text-center text-sm text-red-500">
              {errorMsg}
            </div>
          )}

          <div>
            <motion.button
              type="submit"
              disabled={mutation.isPending}
              className="group relative w-full flex transform justify-center border border-transparent rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-sm text-white font-medium shadow-lg transition-all duration-300 active:scale-95 disabled:cursor-not-allowed hover:from-indigo-700 hover:to-purple-700 disabled:opacity-70 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {mutation.isPending ? (
                <span className="flex items-center">
                  <svg
                    className="mr-3 h-5 w-5 animate-spin text-white -ml-1"
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
                  登录中...
                </span>
              ) : (
                <motion.span
                  initial={{ opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  登 录
                </motion.span>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
