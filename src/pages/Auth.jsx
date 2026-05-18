import { useState } from "react";
import "./Auth.css";

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
    <div className="authPage">

      <div className="authGlow"></div>

      <div className="authCard">

        <div className="authLogo">
          Y
        </div>

        <h1 className="authTitle">
          Yamaha STY
        </h1>

        <p className="authSubtitle">
          Style Analyzer Platform
        </p>

        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            className="authInput"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="authInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="authInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="authBtn"
        >
          {isLogin ? "Login" : "Create Account"}
        </button>

        <div className="authSwitch">
          <button
            onClick={() => setIsLogin(!isLogin)}
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
