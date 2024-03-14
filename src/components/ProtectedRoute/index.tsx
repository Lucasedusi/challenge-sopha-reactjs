// ProtectedRoute.tsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { Home } from "../../pages/Home";

export function ProtectedRoute() {
	const { signed } = useContext(AuthContext);

	return signed ? <Home /> : <Navigate to="/" replace />;
}
