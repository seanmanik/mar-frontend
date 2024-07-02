import { api } from "..";
import { LoginRequestBody } from "./types";

// export const loginRequest = async (data: LoginRequestBody): Promise<void> => {
export const loginRequest = (data: LoginRequestBody): string => {
  // const response = await api.post("/User/Login", data);

  // return response.data;

  return "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIzIiwibmJmIjoxNzE5OTMzMTA5LCJleHAiOjE3MjAwMTk1MDksImlhdCI6MTcxOTkzMzEwOX0.QHnKZCF5ik9xnLAm3gLqyMVk6ntCOTQZh2xvfBdU22jtwfBv07J4DKRrvu-naJjpvwTbzrQw0Y8Xxe1FvTLUOQ";
};
