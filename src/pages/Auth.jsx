import { useState } from "react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const endpoint = isLogin
        ? "login"
        : "register";

      const body = isLogin
        ? {
            email,
            password,
          }
        : {
            username,
            email,
            password,
          };

      const response = await fetch(
        `https://p01--yamahabackend--cb8j2vsxyh7n.code.run/auth/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);

        window.location.reload();
      } else {
        alert(data.error || "Erreur");
      }
    } catch (error) {
      console.error(error);

      alert("Erreur serveur");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] bg-white/10 blur-3xl rounded-full"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center text-black text-3xl font-bold">
            Y
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white text-center">
          Yamaha STY
        </h1>

        <p className="text-zinc-400 text-center mt-2 mb-8">
          Style Analyzer Platform
        </p>

        {/* Username */}
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            className="w-full bg-zinc-800 text-white p-4 rounded-xl mb-4 outline-none border border-zinc-700 focus:border-white transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-zinc-800 text-white p-4 rounded-xl mb-4 outline-none border border-zinc-700 focus:border-white transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-zinc-800 text-white p-4 rounded-xl mb-6 outline-none border border-zinc-700 focus:border-white transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-white text-black font-bold py-4 rounded-xl hover:scale-[1.02] transition-all duration-300"
        >
          {isLogin ? "Login" : "Create Account"}
        </button>

        {/* Switch */}
        <div className="text-center mt-6">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-zinc-400 hover:text-white transition"
          >
            {isLogin
              ? "Create an account"
              : "Already have an account ?"}
          </button>
        </div>

      </div>
    </div>
  );
}
