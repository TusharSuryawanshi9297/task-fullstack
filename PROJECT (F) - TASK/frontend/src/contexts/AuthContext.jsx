// import React, { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// // Create context
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem("user")) || null
//   );
//   const [token, setToken] = useState(localStorage.getItem("token") || null);

//   // Load user from token on mount
//   useEffect(() => {
//     const loadUser = async () => {
//       if (token && !user) {
//         try {
//           const res = await api.get("/auth/me", {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setUser(res.data.user);
//           localStorage.setItem("user", JSON.stringify(res.data.user));
//         } catch (err) {
//           logout();
//         }
//       }
//     };
//     loadUser();
//   }, [token]);

//   // Login function
//   const login = async (email, password) => {
//     try {
//       const res = await api.post("/auth/login", { email, password });
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       setToken(res.data.token);
//       setUser(res.data.user);

//       // Navigate based on role
//       switch (res.data.user.role) {
//         case "admin":
//           navigate("/admin/dashboard");
//           break;
//         case "owner":
//           navigate("/owner/dashboard");
//           break;
//         case "user":
//           navigate("/user/dashboard");
//           break;
//         default:
//           navigate("/login");
//           break;
//       }
//     } catch (err) {
//       throw err.response?.data?.message || "Login failed";
//     }
//   };

//   // Signup function
//   const signup = async (signupData) => {
//     try {
//       await api.post("/auth/signup", signupData);
//       alert("Signup successful! Please login.");
//       navigate("/login");
//     } catch (err) {
//       throw err.response?.data?.message || "Signup failed";
//     }
//   };

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setToken(null);
//     setUser(null);
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, signup, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true); // <-- new

  useEffect(() => {
    const loadUser = async () => {
      if (token && !user) {
        try {
          const res = await api.get("/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        } catch (err) {
          logout();
        }
      }
      setLoading(false); // <-- mark finished
    };
    loadUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const normalizedUser = {
        ...res.data.user,
        role:
          res.data.user.role === "store_owner" ? "owner" : res.data.user.role,
      };
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(normalizedUser));
      setToken(res.data.token);
      setUser(normalizedUser);

      switch (normalizedUser.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "owner":
          navigate("/owner/dashboard");
          break;
        case "user":
          navigate("/user/dashboard");
          break;
        default:
          navigate("/login");
      }
    } catch (err) {
      throw err.response?.data?.message || "Login failed";
    }
  };

  const signup = async (signupData) => {
    try {
      await api.post("/auth/signup", signupData);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      throw err.response?.data?.message || "Signup failed";
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  // console.log("AuthProvider user:", user, "loading:", loading);

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
