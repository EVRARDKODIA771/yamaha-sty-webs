import { useState } from "react";
import "./Auth.css";

const API_URL =
  "https://p01--yamahabackend02--cb8j2vsxyh7n.code.run/";

export default function Auth() {

  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // ======================================================
  // SUBMIT
  // ======================================================

  const handleSubmit = async () => {

    try {

      setLoading(true);

      setError("");

      // ==================================================
      // VALIDATION
      // ==================================================

      if (!email || !password) {

        setError("Veuillez remplir tous les champs");

        setLoading(false);

        return;

      }

      if (!isLogin && !username) {

        setError("Username requis");

        setLoading(false);

        return;

      }

      // ==================================================
      // ENDPOINT
      // ==================================================

      const endpoint = isLogin
        ? "login"
        : "register";

      // ==================================================
      // BODY
      // ==================================================

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

      // ==================================================
      // REQUEST
      // ==================================================

      const response = await fetch(
        `${API_URL}/auth/${endpoint}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      // ==================================================
      // SUCCESS
      // ==================================================

      if (data.success && data.token) {

        // ==================================================
        // STORE TOKEN
        // ==================================================

        localStorage.setItem(
          "token",
          data.token
        );

        // ==================================================
        // STORE USER
        // ==================================================

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        // ==================================================
        // RELOAD
        // ==================================================

        window.location.reload();

      } else {

        setError(
          data.error || "Erreur authentification"
        );

      }

    } catch (error) {

      console.error(error);

      setError("Erreur serveur");

    } finally {

      setLoading(false);

    }

  };


  // ======================================================
  // UI
  // ======================================================

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


        {/* ========================================= */}
        {/* ERROR */}
        {/* ========================================= */}

        {error && (
          <div className="authError">
            {error}
          </div>
        )}


        {/* ========================================= */}
        {/* USERNAME */}
        {/* ========================================= */}

        {!isLogin && (

          <input
            type="text"
            placeholder="Username"
            className="authInput"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

        )}


        {/* ========================================= */}
        {/* EMAIL */}
        {/* ========================================= */}

        <input
          type="email"
          placeholder="Email"
          className="authInput"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />


        {/* ========================================= */}
        {/* PASSWORD */}
        {/* ========================================= */}

        <input
          type="password"
          placeholder="Password"
          className="authInput"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />


        {/* ========================================= */}
        {/* BUTTON */}
        {/* ========================================= */}

        <button
          onClick={handleSubmit}
          className="authBtn"
          disabled={loading}
        >

          {loading
            ? "Loading..."
            : isLogin
            ? "Login"
            : "Create Account"}

        </button>


        {/* ========================================= */}
        {/* SWITCH */}
        {/* ========================================= */}

        <div className="authSwitch">

          <button
            onClick={() => {

              setIsLogin(!isLogin);

              setError("");

            }}
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
