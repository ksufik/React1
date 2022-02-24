import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { selectAuth } from "../../store/profile/selectors";
import { Outlet } from "react-router";

export const PublicRoute = ({ children }) => {
  const authed = useSelector(selectAuth);

  // return authed ? children : <Navigate to="/profile" replace />
  //так не работает
  return !authed ? <Outlet /> : <Navigate to="/profile" replace />
}