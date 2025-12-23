import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthstore";
import Hyperspeed from "./components/Hyperspeed";
import { Toaster } from "react-hot-toast";


function App() {
  const { cheackAuth, authuser, ischeackingAuth } = useAuthStore();

  useEffect(() => {
    cheackAuth();
  }, [cheackAuth]);


  if (ischeackingAuth && !authuser) {
    return (
      <div className="h-[50vh] w-[50vw]">
        <Hyperspeed
          effectOptions={{
            onSpeedUp: () => {},
            onSlowDown: () => {},
            distortion: "turbulentDistortion",
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 4,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [400 * 0.03, 400 * 0.2],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0xffffff,
              brokenLines: 0xffffff,
              leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
              rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
              sticks: 0x03b3c3,
            },
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route element = {<Navigate to =  "/" />} path="*" />
        <Route element={authuser ? <Home/>: <Navigate to = "/signin" />} path="/" />
        <Route element={authuser ? <Navigate to = "/" />:<SignupPage />} path="/signup" />
        <Route element={authuser ? <Navigate to = "/" />:<SigninPage />} path="/signin" />
        <Route element={authuser ? <ProfilePage />: <Navigate to = "/signin" />} path="/profile" />
        <Route element={<SettingsPage />} path="/settings" />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
