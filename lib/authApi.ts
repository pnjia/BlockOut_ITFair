import { NativeModules, Platform } from "react-native";

const DEFAULT_PROTOCOL = process.env.EXPO_PUBLIC_API_PROTOCOL || "http";
const DEFAULT_PORT = process.env.EXPO_PUBLIC_API_PORT || "3000";
const DEFAULT_BASE_URL = `${DEFAULT_PROTOCOL}://localhost:${DEFAULT_PORT}`;

const sanitizeUrl = (url: string) => url.replace(/\/$/, "");

const buildUrlFromHost = (host: string) =>
  `${DEFAULT_PROTOCOL}://${host}:${DEFAULT_PORT}`;

const extractHost = (raw?: string | null) => {
  if (!raw || typeof raw !== "string") {
    return null;
  }
  const normalized = raw
    .replace(/^exp:\/\//, "")
    .replace(/^https?:\/\//, "")
    .split("?")[0];
  return normalized.split(":")[0];
};

const normalizeHost = (host?: string | null) => {
  if (!host) {
    return null;
  }
  const trimmed = host.trim();
  if (!trimmed) {
    return null;
  }
  if (trimmed === "localhost" || trimmed === "127.0.0.1") {
    if (Platform.OS === "android") {
      return "10.0.2.2";
    }
    return "localhost";
  }
  return trimmed;
};

const getHostFromSourceCode = () => {
  const scriptURL = NativeModules.SourceCode?.scriptURL as string | undefined;
  if (!scriptURL) {
    return null;
  }
  const match = scriptURL.match(/https?:\/\/([^:/]+)(?::\d+)?/);
  return match?.[1] ?? null;
};

const getGlobalHostHints = () => {
  const globalObject = globalThis as Record<string, any>;
  return [
    globalObject?.expo?.hostUri,
    globalObject?.expo?.manifest?.hostUri,
    globalObject?.expo?.manifest?.debuggerHost,
    globalObject?.expo?.manifest2?.extra?.expoClient?.hostUri,
    globalObject?.expo?.manifest2?.extra?.expoClient?.debuggerHost,
    globalObject?.__EXPO_MANIFEST__?.hostUri,
    globalObject?.__EXPO_MANIFEST__?.debuggerHost,
    globalObject?.__EXPO_DEV_SERVER_URL__,
    globalObject?.__DEV_SERVER_URL__,
    globalObject?.location?.origin,
    globalObject?.location?.host,
  ];
};

const resolveInitialBaseUrl = (): string => {
  const envUrl =
    process.env.EXPO_PUBLIC_API_URL || process.env.EXPO_PUBLIC_API_BASE_URL;
  if (envUrl) {
    return sanitizeUrl(envUrl);
  }

  const envHost =
    process.env.EXPO_PUBLIC_API_HOST || process.env.EXPO_PUBLIC_API_IP;
  if (envHost) {
    if (/^https?:\/\//.test(envHost)) {
      return sanitizeUrl(envHost);
    }
    const normalized = normalizeHost(envHost);
    if (normalized) {
      const protocol = process.env.EXPO_PUBLIC_API_PROTOCOL || DEFAULT_PROTOCOL;
      const port = process.env.EXPO_PUBLIC_API_PORT || DEFAULT_PORT;
      return `${protocol}://${normalized}:${port}`;
    }
  }

  // If running on Android and no explicit env override is provided,
  // default to the deployed backend hosted on Vercel so Android builds
  // hit the production/dev backend instead of localhost.
  if (Platform.OS === "android") {
    const DEFAULT_REMOTE_URL = "https://block-out-be-it-fair.vercel.app";
    return sanitizeUrl(DEFAULT_REMOTE_URL);
  }

  const hostCandidates = [
    getHostFromSourceCode(),
    ...getGlobalHostHints().map((hint) => extractHost(hint)),
  ];

  for (const candidate of hostCandidates) {
    const normalized = normalizeHost(candidate);
    if (normalized) {
      return buildUrlFromHost(normalized);
    }
  }

  return DEFAULT_BASE_URL;
};

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestConfig<TBody> = {
  method?: HttpMethod;
  token?: string;
  body?: TBody;
};

type ApiEnvelope<T> = T & {
  message?: string;
};

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type GoogleLoginPayload = {
  idToken: string;
};

export type ForgotPasswordPayload = {
  phoneNumber: string;
};

export type ResetPasswordPayload = {
  phoneNumber: string;
  resetToken: string;
  newPassword: string;
};

export type PersonalizePayload = {
  gender: "MALE" | "FEMALE";
  height: number;
  weight: number;
};

export type BlockConfigPayload = {
  appsToBlock: string[];
};

export type EquipItemPayload = {
  itemId: string;
  category: "TOP" | "SHIRT" | "PANTS" | "SHOES";
};

export type UpdateProfilePicturePayload = {
  avatarUrl: string;
};

export type MintRewardPayload = {
  workoutType: string;
  count: number;
  duration: number;
  walletAddress: string;
};

export type VerifyPurchasePayload = {
  txHash: string;
  itemId: string;
};

export type UpdateAccountPayload = {
  fullName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
};

export type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};

export type NotificationTogglePayload = {
  enabled: boolean;
};

export type WorkoutPreferenceOption = {
  type: string;
  isEnabled: boolean;
};

export type WorkoutPreferencePayload = {
  workouts: WorkoutPreferenceOption[];
};

export type WalletActionPayload = {
  action: "CONNECT" | "DISCONNECT";
  walletAddress?: string;
};

export type TokenResponse = ApiEnvelope<{
  token: string;
  refreshToken?: string;
}>;

export type RegisterResponse = ApiEnvelope<Record<string, unknown>>;

export type ForgotPasswordResponse = ApiEnvelope<{ resetToken: string }>;

export type HomeDataResponse = {
  userProfile: Record<string, unknown>;
  equipped: Record<string, unknown>;
  stats: Record<string, unknown>;
  inventory: Record<string, unknown>;
};

export type ProfileStatsResponse = {
  user?: Record<string, unknown>;
  stats?: Record<string, unknown>;
  [key: string]: unknown;
};

export type ShopListResponse = Record<string, unknown>;

export type MintRewardResponse = ApiEnvelope<{
  unlockTime?: string;
  reward?: Record<string, unknown>;
}>;

export type VerifyPurchaseResponse = ApiEnvelope<{ itemId?: string }>;

export type NotificationStatusResponse = {
  enabled: boolean;
};

export type WorkoutPreferencesResponse = {
  preferences: Record<string, boolean>;
};

export type WalletStatusResponse = {
  isConnected: boolean;
  walletAddress: string | null;
};

let apiBaseUrl = resolveInitialBaseUrl();

// Debug: print resolved API base URL at startup so we can confirm which
// backend the app will call (useful when diagnosing runtime crashes that
// may be related to network or environment differences).
try {
  // eslint-disable-next-line no-console
  console.log("[authApi] resolved apiBaseUrl:", apiBaseUrl);
} catch (e) {
  // ignore
}

const parseResponse = async (res: Response) => {
  const text = await res.text();

  if (!text) {
    if (!res.ok) {
      throw new Error(`Request failed (${res.status})`);
    }
    return undefined;
  }

  try {
    return JSON.parse(text);
  } catch (_error) {
    if (!res.ok) {
      throw new Error(text || `Request failed (${res.status})`);
    }
    return text;
  }
};

async function request<T, TBody = unknown>(
  path: string,
  config: RequestConfig<TBody> = {}
): Promise<T> {
  const { method = "GET", token, body } = config;

  const headers: Record<string, string> = {};

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = (await parseResponse(response)) as ApiEnvelope<T> | T;

  if (!response.ok) {
    const message = (data as ApiEnvelope<T>)?.message;
    throw new Error(message || `Request failed (${response.status})`);
  }

  return data as T;
}

export function setApiBaseUrl(newBaseUrl: string): void {
  apiBaseUrl = newBaseUrl.replace(/\/$/, "");
}

export const getApiBaseUrl = () => apiBaseUrl;

// Auth
export const apiRegister = (payload: RegisterPayload) =>
  request<RegisterResponse, RegisterPayload>("/api/auth/register", {
    method: "POST",
    body: payload,
  });

export const apiLogin = (payload: LoginPayload) =>
  request<TokenResponse, LoginPayload>("/api/auth/login", {
    method: "POST",
    body: payload,
  });

export const apiLoginWithGoogle = (payload: GoogleLoginPayload) =>
  request<TokenResponse, GoogleLoginPayload>("/api/auth/google", {
    method: "POST",
    body: payload,
  });

export const apiForgotPassword = (payload: ForgotPasswordPayload) =>
  request<ForgotPasswordResponse, ForgotPasswordPayload>(
    "/api/auth/forgot-password",
    {
      method: "POST",
      body: payload,
    }
  );

export const apiResetPassword = (payload: ResetPasswordPayload) =>
  request<ApiEnvelope<Record<string, unknown>>, ResetPasswordPayload>(
    "/api/auth/reset-password",
    {
      method: "POST",
      body: payload,
    }
  );

// Onboarding
export const apiPersonalizeUser = (
  token: string,
  payload: PersonalizePayload
) =>
  request<ApiEnvelope<Record<string, unknown>>, PersonalizePayload>(
    "/api/user/personalize",
    {
      method: "PUT",
      token,
      body: payload,
    }
  );

export const apiSaveBlockConfig = (
  token: string,
  payload: BlockConfigPayload
) =>
  request<ApiEnvelope<Record<string, unknown>>, BlockConfigPayload>(
    "/api/user/block-config",
    {
      method: "POST",
      token,
      body: payload,
    }
  );

// Home & Avatar
export const apiFetchHomeData = (token: string) =>
  request<HomeDataResponse>("/api/user/avatar", {
    method: "GET",
    token,
  });

export const apiEquipItem = (token: string, payload: EquipItemPayload) =>
  request<ApiEnvelope<Record<string, unknown>>, EquipItemPayload>(
    "/api/user/avatar",
    {
      method: "PUT",
      token,
      body: payload,
    }
  );

// Profile & Stats
export const apiFetchProfileStats = (token: string) =>
  request<ProfileStatsResponse>("/api/user/profile", {
    method: "GET",
    token,
  });

export const apiUpdateProfilePicture = (
  token: string,
  payload: UpdateProfilePicturePayload
) =>
  request<ApiEnvelope<Record<string, unknown>>, UpdateProfilePicturePayload>(
    "/api/user/profile",
    {
      method: "PUT",
      token,
      body: payload,
    }
  );

// Shop & Rewards
export const apiFetchShopList = (token: string) =>
  request<ShopListResponse>("/api/shop/list", {
    method: "GET",
    token,
  });

export const apiMintReward = (token: string, payload: MintRewardPayload) =>
  request<MintRewardResponse, MintRewardPayload>("/api/reward/mint", {
    method: "POST",
    token,
    body: payload,
  });

export const apiVerifyPurchase = (
  token: string,
  payload: VerifyPurchasePayload
) =>
  request<VerifyPurchaseResponse, VerifyPurchasePayload>(
    "/api/shop/verify-purchase",
    {
      method: "POST",
      token,
      body: payload,
    }
  );

// Settings - Account
export const apiUpdateAccount = (
  token: string,
  payload: UpdateAccountPayload
) =>
  request<ApiEnvelope<Record<string, unknown>>, UpdateAccountPayload>(
    "/api/settings/account",
    {
      method: "PUT",
      token,
      body: payload,
    }
  );

export const apiChangePassword = (
  token: string,
  payload: ChangePasswordPayload
) =>
  request<ApiEnvelope<Record<string, unknown>>, ChangePasswordPayload>(
    "/api/settings/account",
    {
      method: "PATCH",
      token,
      body: payload,
    }
  );

export const apiDeleteAccount = (token: string) =>
  request<ApiEnvelope<Record<string, unknown>>>("/api/settings/account", {
    method: "DELETE",
    token,
  });

// Settings - Preferences & Wallet
export const apiGetNotificationSettings = (token: string) =>
  request<NotificationStatusResponse>("/api/settings/notification", {
    method: "GET",
    token,
  });

export const apiToggleNotificationSettings = (
  token: string,
  payload: NotificationTogglePayload
) =>
  request<ApiEnvelope<Record<string, unknown>>, NotificationTogglePayload>(
    "/api/settings/notification",
    {
      method: "POST",
      token,
      body: payload,
    }
  );

export const apiGetWorkoutPreferences = (token: string) =>
  request<WorkoutPreferencesResponse>("/api/settings/workout-preferences", {
    method: "GET",
    token,
  });

export const apiSaveWorkoutPreferences = (
  token: string,
  payload: WorkoutPreferencePayload
) =>
  request<ApiEnvelope<Record<string, unknown>>, WorkoutPreferencePayload>(
    "/api/settings/workout-preferences",
    {
      method: "POST",
      token,
      body: payload,
    }
  );

export const apiGetWalletStatus = (token: string) =>
  request<WalletStatusResponse>("/api/settings/wallet", {
    method: "GET",
    token,
  });

export const apiUpdateWalletStatus = (
  token: string,
  payload: WalletActionPayload
) =>
  request<ApiEnvelope<Record<string, unknown>>, WalletActionPayload>(
    "/api/settings/wallet",
    {
      method: "POST",
      token,
      body: payload,
    }
  );
