// routes.tsx
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Account } from "./pages/Account";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

export function Router() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/account" element={<Account />} />
			<Route element={<ProtectedRoute />}>
				<Route path="/home" element={<Home />} />
			</Route>
		</Routes>
	);
}
