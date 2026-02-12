import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useUserRole() {
  const [isCook, setIsCook] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserRole();
  }, []);

  async function checkUserRole() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("userinfo")
        .select("role, admin")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      const userRoles = data?.role || [];
      setIsCook(userRoles.includes("cook") || data?.admin);
    } catch (error) {
      console.error("Error checking user role:", error);
    } finally {
      setLoading(false);
    }
  }

  return { isCook, loading };
}
