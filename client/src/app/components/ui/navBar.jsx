import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logoutUser } from "../../store/userSlice";
import cookieService from "../../service/cookie.service";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refresh = cookieService.getRefreshToken();
  const access = cookieService.getAccessToken();

  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    console.log(user);
    console.log(isLoggedIn);

    if (isLoggedIn && !user) {
      dispatch(fetchUser());
    } else if (!access && refresh) {
      dispatch(fetchUser());
    } else if (!access && !refresh) {
      dispatch(logoutUser());
    }
  }, [dispatch, access, refresh, isLoggedIn, user]);

  const handleLogout = () => {
    dispatch(logoutUser())
      .then(() => {
        cookieService.removeAuthData();
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <div className="main-nav">
      <div className="nav-info">
        <div className="h-name">SNOW PEAK HOTEL</div>
        <div className="address">
          Красная Поляна, Краснодарский край, 354392
        </div>
      </div>
      <div className="nav-bar">
        <div className="n-div">
          <Link className="n-link" to="home">
            ГЛАВНАЯ
          </Link>
        </div>
        <div className="n-div">
          <Link className="n-link" to="rooms">
            НОМЕРА
          </Link>
        </div>
        <div className="n-div">
          <Link className="n-link" to="booking">
            ТЕст
          </Link>
        </div>
        {access && user?.admin ? (
          <div className="n-div">
            <Link className="n-link" to="admin">
              ВСЕ НОМЕРА
            </Link>
          </div>
        ) : null}
        {access ? (
          <div className="n-div">
            <Link className="n-link" to="home" onClick={handleLogout}>
              ВЫХОД
            </Link>
          </div>
        ) : (
          <div className="n-div">
            <Link className="n-link" to="login">
              ЛИЧНЫЙ КАБИНЕТ
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
