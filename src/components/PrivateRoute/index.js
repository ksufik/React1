import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { selectAuth } from "../../store/profile/selectors";
import { Outlet } from "react-router";

export const PrivateRoute = ({ children }) => {
  const authed = useSelector(selectAuth);

  // return authed ? children : <Navigate to="/" replace />
  //так не работает
  return authed ? <Outlet /> : <Navigate to="/" replace />
}