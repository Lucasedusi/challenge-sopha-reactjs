import { Route, Routes } from "react-router-dom";
import { Account } from "./pages/Account";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

export function Router() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/home" element={<Home />} />
			<Route path="/account" element={<Account />} />
		</Routes>
	);
}
