import { Route, Routes } from "react-router";
import AppLayout from "./layout/AppLayout";
import LandingPage from "./pages/Landing/LandingPage";
import CookingPage from "./pages/Cooking/CookingPage";
import EnhancePage from "./pages/Enhance/EnhancePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="cooking" element={<CookingPage />} />
        <Route path="enhance" element={<EnhancePage />} />
      </Route>
    </Routes>
  );
}

export default App;
