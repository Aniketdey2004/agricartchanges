import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function Farmer({ component: Component }) {
    const { loggedUser } = useContext(UserContext);

    return loggedUser?.loggedInFarmer ? <Component /> : <Navigate to="/login-farmer"/>;
}
