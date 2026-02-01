import React, { Suspense } from "react";
import { Route, Routes } from "react-router";

const AppLayout = React.lazy(() => import("../layout/AppLayout"));
const LandingPage = React.lazy(() => import("../pages/Landing/LandingPage"));
const CookingPage = React.lazy(() => import("../pages/Cooking/CookingPage"));
const EnhancePage = React.lazy(() => import("../pages/Enhance/EnhancePage"));
const LoginPage = React.lazy(() => import("../pages/Login/LoginPage"));
const RegisterPage = React.lazy(() => import("../pages/Register/RegisterPage"));

const AppRouter = () => {
  return (
    <Suspense fallback={<div>...loading</div>}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="cooking" element={<CookingPage />} />
          <Route path="enhance" element={<EnhancePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
