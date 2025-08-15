import axios from "axios";

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
