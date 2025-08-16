import axios from "axios";
import { getToken, saveToken } from "./secureToken";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export const authenticate = async (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  if (!response.data.idToken) {
    console.log(response.data);
    throw new Error("Authentication failed");
  }
  const data = response.data;
  return data;
};

export const createUser = async (email, password) => {
  const data = await authenticate("signUp", email, password);
  return data;
};

export const login = async (email, password) => {
  const data = await authenticate("signInWithPassword", email, password);
  return data;
};

export const refreshIdToken = async () => {
  const refreshToken = await getToken("vocabReviserRefreshToken");
  if (!refreshToken) throw new Error("No refresh token found");

  const url = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;

  const res = await axios.post(url, {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const { id_token, refresh_token } = res.data;

  // Save new tokens
  await saveToken("vocabReviserToken", id_token);
  await saveToken("vocabReviserRefreshToken", refresh_token);

  return id_token;
};
