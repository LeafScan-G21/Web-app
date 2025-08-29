import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/auth/supabaseClient";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      });

    return () => {
      authListener.subscription.unsubscribe();
    };
    }, []);
    return (
      <AuthContext.Provider value={{ user, session, loading }}>
        {children}
      </AuthContext.Provider>
    );

};

export const useAuth = () => {
  return useContext(AuthContext);
}