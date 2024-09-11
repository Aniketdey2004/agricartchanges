import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
export default function Cust({ component: Component }) {
    const { loggedUser } = useContext(UserContext);

    return loggedUser?.loggedInUser ? <Component /> : <Navigate to="/login"/>;
}
