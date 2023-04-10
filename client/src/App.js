import Aos from "aos";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ScrollOnTop from "./ScrollOnTop";
import AboutUs from "./Screens/AboutUs";
import ContactUs from "./Screens/ContactUs";
import AddMusic from "./Screens/Dashboard/Admin/AddMusic";
import Categories from "./Screens/Dashboard/Admin/Categories";
import Dashboard from "./Screens/Dashboard/Admin/Dashboard";
import MusicsList from "./Screens/Dashboard/Admin/MusicList";
import Users from "./Screens/Dashboard/Admin/Users";
import FavoritesMusics from "./Screens/Dashboard/FavoritesMusics";
import Password from "./Screens/Dashboard/Password";
import Profile from "./Screens/Dashboard/Profile";
import HomeScreen from "./Screens/HomeScreen";
import Login from "./Screens/Login";
import MusicsPage from "./Screens/Musics";
import NotFound from "./Screens/NotFound";
import Register from "./Screens/Register";
import SingleMusic from "./Screens/SingleMusic";
import WatchPage from "./Screens/WatchPage";
import DrawerContext from "./Context/DrawerContext";
import ToastContainer from "./Components/Notfications/ToastContainer";
import { AdminProtectedRouter, ProtectedRouter } from "./ProtectedRouter";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesAction } from "./Redux/Actions/CategoriesActions";
import { getAllMusicsAction } from "./Redux/Actions/MusicsActions";
import { getFavoriteMusicsAction } from "./Redux/Actions/userActions";
import toast from "react-hot-toast";
import EditMusic from "./Screens/Dashboard/Admin/EditMusic";

function App() {
  Aos.init();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { isError, isSuccess } = useSelector((state) => state.userLikeMusic);
  const { isError: catError } = useSelector((state) => state.categoryGetAll);

  useEffect(() => {
    dispatch(getAllCategoriesAction());
    dispatch(getAllMusicsAction({}));
    if (userInfo) {
      dispatch(getFavoriteMusicsAction());
    }
    if (isError || catError) {
      toast.error(isError || catError);
      dispatch({ type: "LIKE_Music_RESET" });
    }
    if (isSuccess) {
      dispatch({ type: "LIKE_Music_RESET" });
    }
  }, [dispatch, userInfo, isError, catError, isSuccess]);

  return (
    <>
      <ToastContainer />
      <DrawerContext>
        <ScrollOnTop>
          <Routes>
            {/* ************ PUBLIC ROUTERS *************** */}
            <Route path="/" element={<HomeScreen />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/musics" element={<MusicsPage />} />
            <Route path="/musics/:search" element={<MusicsPage />} />
            <Route path="/music/:id" element={<SingleMusic />} />
            <Route path="/watch/:id" element={<WatchPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
            {/* ************ PRIVATE PUBLIC ROUTERS *************** */}
            <Route element={<ProtectedRouter />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/password" element={<Password />} />
              <Route path="/favorites" element={<FavoritesMusics />} />
              {/* ************ ADMIN ROUTERS *************** */}
              <Route element={<AdminProtectedRouter />}>
                <Route path="/musicslist" element={<MusicsList />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/users" element={<Users />} />
                <Route path="/addmusic" element={<AddMusic />} />
                <Route path="/edit/:id" element={<EditMusic />} />
              </Route>
            </Route>
          </Routes>
        </ScrollOnTop>
      </DrawerContext>
    </>
  );
}

export default App;
