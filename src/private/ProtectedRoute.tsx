import { TUser } from "@/interface";
import { useCurrentToken, useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode;
    role?: string;
  }

  
  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role = '' }) => {
    const token = useAppSelector(useCurrentToken);
    const user = useAppSelector(useCurrentUser) as TUser;

    if (!token) {
      return <Navigate to={'/login'} replace={true} />;
    }
  
    if (!user) {
      return <Navigate to={'/login'} replace={true} />;
    }
  
    if (role && user.role  !== role) {
      return <Navigate to={'/login'} replace={true} />;
    }
  
    return <>{children}</>;
  };

export default ProtectedRoute;