import { Routes, Route } from "react-router-dom";
import HomePage from "./Page/HomePage";
import ProfilePage from "./Page/ProfilePage";
import Layout from "./components/Layout";
import AuthPage from "./Page/AuthPage";
import NeedAuth from "./components/NeedAuth";
import { useAutoLogout } from "./Hooks/useAutoLogout";
import StudentPage from "./Page/StudentPage";

const App = () => {
  useAutoLogout();

  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route
          path={"/profile"}
          element={
            <NeedAuth>
              <ProfilePage />
            </NeedAuth>
          }
        />
        <Route path={"/auth-form"} element={<AuthPage />} />
        <Route
          path={"/student"}
          element={
            <NeedAuth>
              <StudentPage />
            </NeedAuth>
          }
        />
      </Routes>
    </Layout>
  );
};

export default App;
