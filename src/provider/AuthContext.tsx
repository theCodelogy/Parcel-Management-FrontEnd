// import React, { createContext, useContext, ReactNode } from "react";
// import Cookies from "js-cookie"; // Import js-cookie

// interface AuthContextType {
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const logout = () => {
//     console.log("Logging out");
//     setAuth(null);
//     Cookies.remove("token"); // Remove the token from cookies
//   };

//   const authInfo = {
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
