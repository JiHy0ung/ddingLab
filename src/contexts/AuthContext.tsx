import { Session, User } from "@supabase/supabase-js";
import { UserInfo } from "../models/User";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface AuthContextType {
  user: User | null;
  userinfo: UserInfo | null;
  session: Session | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    username: string,
    minecraft_id: string,
    zodiac: string,
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userinfo, setUserInfo] = useState<UserInfo | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchUserInfo(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // 로그인/로그아웃 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchUserInfo(session.user.id);
      } else {
        setUserInfo(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // userInfo 테이블에서 사용자 정보 가져오기
  const fetchUserInfo = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("userinfo")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setUserInfo(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setLoading(false);
    }
  };

  // 회원가입 함수
  const signUp = async (
    email: string,
    password: string,
    username: string,
    minecraft_id: string,
    zodiac: string,
  ) => {
    // 마인크래프트 아이디 중복 체크
    const { data: existingUser, error: checkError } = await supabase
      .from("userinfo")
      .select("id")
      .eq("minecraft_id", minecraft_id)
      .maybeSingle();

    if (checkError) {
      throw checkError;
    }

    if (existingUser) {
      throw new Error("이미 사용 중인 마인크래프트 아이디입니다.");
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: username,
          minecraft_id,
          zodiac,
        },
      },
    });

    if (signUpError) throw signUpError;

    await supabase.auth.signOut();
  };

  // 로그인 함수
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  // 로그아웃 함수
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  // 비밀번호 재설정 함수
  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userinfo,
        session,
        loading,
        signUp,
        signIn,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// useAuth 훅 (Context 사용하기 쉽게)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
