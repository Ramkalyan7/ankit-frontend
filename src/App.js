import LoginPage from "./components/Login";
import ProfilePage from "./components/ProfilePage";
import RegistrationPage from "./components/Register";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App bg-blue-100 min-h-screen">
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
