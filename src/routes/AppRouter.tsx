import React, { Suspense } from "react";
import { Route, Routes } from "react-router";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const AppLayout = React.lazy(() => import("../layout/AppLayout"));
const LandingPage = React.lazy(() => import("../pages/Landing/LandingPage"));
const CookingPage = React.lazy(() => import("../pages/Cooking/CookingPage"));
const EnhancePage = React.lazy(() => import("../pages/Enhance/EnhancePage"));
const AlchemyPage = React.lazy(() => import("../pages/Alchemy/AlchemyPage"));
const LoginPage = React.lazy(() => import("../pages/Login/LoginPage"));
const RegisterPage = React.lazy(() => import("../pages/Register/RegisterPage"));
const ResetPasswordPage = React.lazy(
  () => import("../pages/ResetPassword/ResetPasswordPage"),
);

// TODO:
// 지도 업데이트(효율 동선)
// 게시판
// 해양 연구소 업데이트
// 한 줄 꿀팁

const AppRouter = () => {
  return (
    <Suspense fallback={<div>...loading</div>}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LandingPage />} />
          <Route element={<PublicRoute />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route path="reset-password" element={<ResetPasswordPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="cooking" element={<CookingPage />} />
            <Route path="enhance" element={<EnhancePage />} />
            <Route path="alchemy" element={<AlchemyPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
