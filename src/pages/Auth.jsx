import { useState } from "react";

import "./Auth.css";

// ======================================================
// BACKEND URL
// ======================================================

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL;

console.log(
  "BACKEND URL :",
  BACKEND_URL
);

export default function Auth() {

  // ======================================================
  // MODE
  // ======================================================

  const [isLogin, setIsLogin] =
    useState(true);

  // ======================================================
  // FORM
  // ======================================================

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  // ======================================================
  // UI
  // ======================================================

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

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

        setError(
          "Veuillez remplir tous les champs"
        );

        return;

      }

      if (!isLogin && !username) {

        setError(
          "Username requis"
        );

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
      // DEBUG
      // ==================================================

      console.log(
        "ENDPOINT :",
        endpoint
      );

      console.log(
        "BODY :",
        body
      );

      console.log(
        "FULL URL :",
        `${BACKEND_URL}/auth/${endpoint}`
      );

      // ==================================================
      // REQUEST
      // ==================================================

      const response = await fetch(
        `${BACKEND_URL}/auth/${endpoint}`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(body),
        }
      );

      // ==================================================
      // DEBUG RESPONSE
      // ==================================================

      console.log(
        "RESPONSE STATUS :",
        response.status
      );

      // ==================================================
      // PARSE JSON
      // ==================================================

      const data = await response.json();

      console.log(
        "BACKEND RESPONSE :",
        data
      );

      // ==================================================
      // SUCCESS
      // ==================================================

      if (
        data.success &&
        data.token
      ) {

        // ==============================================
        // STORE TOKEN
        // ==============================================

        localStorage.setItem(
          "token",
          data.token
        );

        // ==============================================
        // STORE USER
        // ==============================================

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        console.log(
          "AUTH SUCCESS"
        );

        // ==============================================
        // RELOAD
        // ==============================================

        window.location.reload();

      } else {

        setError(

          data.error ||

          "Erreur authentification"

        );

      }

    } catch (error) {

      console.error(
        "AUTH ERROR :",
        error
      );

      setError(
        "Erreur serveur"
      );

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

        {/* ========================================= */}
        {/* LOGO */}
        {/* ========================================= */}

        <div className="authLogo">
          Y
        </div>

        {/* ========================================= */}
        {/* TITLE */}
        {/* ========================================= */}

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
              setUsername(
                e.target.value
              )
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
            setEmail(
              e.target.value
            )
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
            setPassword(
              e.target.value
            )
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

              setIsLogin(
                !isLogin
              );

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
