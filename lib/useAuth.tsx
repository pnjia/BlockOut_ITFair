import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  apiFetchProfileStats,
  apiLogin,
  apiLoginWithGoogle,
  apiRegister,
  ProfileStatsResponse,
  TokenResponse,
} from "./authApi";

// NOTE: If `@react-native-async-storage/async-storage` is not installed in your project,
// install it with: npm install @react-native-async-storage/async-storage
// or: expo install @react-native-async-storage/async-storage

type User = {
  id?: string | number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  birthDate?: string;
  [key: string]: any;
};

// Register payload matching backend spec
type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: string; // Format: YYYY-MM-DD
};

async function resolveUserProfile(token: string): Promise<User | null> {
  try {
    const profile: ProfileStatsResponse = await apiFetchProfileStats(token);
    const resolvedUser =
      (profile as any)?.user || (profile as any)?.data || profile;

    if (resolvedUser && typeof resolvedUser === "object") {
      return resolvedUser as User;
    }
  } catch (error) {
    console.warn("AuthProvider: failed to resolve profile", error);
  }

  return null;
}

// Login payload
type LoginPayload = {
  email: string;
  password: string;
};

// Google login payload
type GoogleLoginPayload = {
  idToken: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (payload: LoginPayload) => Promise<User | null>;
  register: (payload: RegisterPayload) => Promise<User | null>;
  loginWithGoogle: (payload: GoogleLoginPayload) => Promise<User | null>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<User | null>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

const AUTH_TOKEN_KEY = "@auth_token";
const AUTH_USER_KEY = "@auth_user";

async function saveToken(token: string | null) {
  if (token) {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

async function saveUser(user: User | null) {
  if (user) {
    await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  } else {
    await AsyncStorage.removeItem(AUTH_USER_KEY);
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load saved auth from storage on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const t = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
        const u = await AsyncStorage.getItem(AUTH_USER_KEY);
        if (!mounted) return;
        if (t) setToken(t);
        if (u) setUser(JSON.parse(u));
      } catch (err) {
        console.warn("AuthProvider: error reading storage", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // helper to apply token+user after successful auth
  const applyAuth = async (
    incomingToken: string | null,
    incomingUser: User | null
  ) => {
    setToken(incomingToken);
    setUser(incomingUser);
    await saveToken(incomingToken);
    await saveUser(incomingUser);
  };

  const login = async ({ email, password }: LoginPayload) => {
    setLoading(true);
    setError(null);
    try {
      const result: TokenResponse = await apiLogin({
        email: email.trim(),
        password,
      });

      const incomingToken = result.token || (result as any).accessToken || null;

      if (!incomingToken) {
        throw new Error(
          "Login succeeded but no token was returned by the API."
        );
      }

      const incomingUser = await resolveUserProfile(incomingToken);

      await applyAuth(incomingToken, incomingUser);
      try {
        // eslint-disable-next-line no-console
        console.log("[AuthProvider] login success, user:", incomingUser);
      } catch (e) {}
      return incomingUser;
    } catch (err: any) {
      const message = err?.message || "Login error";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const register = async ({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    birthDate,
  }: RegisterPayload) => {
    setLoading(true);
    setError(null);
    try {
      await apiRegister({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
        phoneNumber: phoneNumber.trim(),
        birthDate,
      });

      const loginResult: TokenResponse = await apiLogin({
        email: email.trim(),
        password,
      });

      const incomingToken =
        loginResult.token || (loginResult as any).accessToken || null;

      if (!incomingToken) {
        await applyAuth(null, null);
        return null;
      }

      const incomingUser = await resolveUserProfile(incomingToken);

      await applyAuth(incomingToken, incomingUser);
      try {
        // eslint-disable-next-line no-console
        console.log("[AuthProvider] register success, user:", incomingUser);
      } catch (e) {}
      return incomingUser;
    } catch (err: any) {
      const message = err?.message || "Register error";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async ({ idToken }: GoogleLoginPayload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiLoginWithGoogle({ idToken });

      const incomingToken = result.token || (result as any).accessToken || null;

      if (!incomingToken) {
        throw new Error(
          "Google login succeeded but no token was returned by the API."
        );
      }

      const incomingUser = await resolveUserProfile(incomingToken);

      await applyAuth(incomingToken, incomingUser);
      return incomingUser;
    } catch (err: any) {
      setError(err?.message || "Google login error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await saveToken(null);
      await saveUser(null);
      setToken(null);
      setUser(null);
      setError(null);
    } catch (err) {
      console.warn("logout error", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    if (!token) return null;
    setLoading(true);
    setError(null);
    try {
      const refreshedUser = await resolveUserProfile(token);
      if (refreshedUser) {
        setUser(refreshedUser);
        await saveUser(refreshedUser);
        return refreshedUser;
      }
      return null;
    } catch (err) {
      setError((err as Error).message || "Refresh user error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      error,
      login,
      register,
      loginWithGoogle,
      logout,
      refreshUser,
    }),
    [user, token, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthState => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
