import { httpClient } from "../config/AxiosHelper";

export const createRoomApi = async (roomDetail) => {
  const respone = await httpClient.post(`/api/rooms/create`, roomDetail, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
  return respone.data;
};

export const joinChatApi = async (roomId) => {
  const response = await httpClient.get(`/api/rooms/retrieve/${roomId}`);
  return response.data;
};

export const sendOtp = async (email) => {
  const response = await httpClient.post(`/otp/send?email=${email}`);
  return response.data;
};

export const verifyOtp = async (email,otp) => {
  const response = await httpClient.post(`/otp/verify?email=${email}&otp=${otp}`);
  return response.data;
};

export const createUserDetails = async (email) => {
  const response = await httpClient.get(`/api/users/register?userid=${email}`);
  return response.data;
};

export const getUserDetails = async (email) => {
  const response = await httpClient.get(`/api/users/retrieve?userid=${email}`);
  return response.data;
};


export const getMessagess = async (roomId, size = 50, page = 0) => {
  const response = await httpClient.get(
    `/api/rooms/${roomId}/messages?size=${size}&page=${page}`
  );
  return response.data;
};
