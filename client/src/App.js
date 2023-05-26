import React, { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import MovieDeatailsPage from "./Components/MovieDeatailsPage";
import AddMoviePage from "./Components/MovieUpdates/AddMoviePage";
import Navbar from "./Components/Navbar";
import LoginForm from "./Components/USERS/LoginForm";
import RegistrationForm from "./Components/USERS/RegistrationForm";
import UserDetails from "./Components/USERS/UserDetails";

//dynamic import for lazy loading
const Home = React.lazy(() => import("./Components/Home"));
const MovieEditPage = React.lazy(() =>
  import("./Components/MovieUpdates/MovieEditPage")
);

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense
        fallback={
          <h1 className="text-center">
            Getting things ready Please wait...
            <div className="text-center">
              <div className="spinner-border " role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          </h1>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:name" element={<UserDetails />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/movie/add" element={<AddMoviePage />} />
          <Route path="/movie/:id" element={<MovieDeatailsPage />} />
          <Route path="/movie/edit/:id" element={<MovieEditPage />} />
        </Routes>
      </Suspense>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;
