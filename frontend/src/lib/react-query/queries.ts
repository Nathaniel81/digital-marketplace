import { 
	useMutation,
  useQuery
  } from "@tanstack/react-query";
  import { QUERY_KEYS } from "./queryKeys";
  import axios from 'axios';
  import {
	TAuthCredentialsValidator,
  } from '@/lib/validators/account-credentials-validator';

const BASE_URL = "http://127.0.0.1:8000/api"

// User related queries
export const createUser = async (userData: TAuthCredentialsValidator) => {
  const response = await axios.post(`${BASE_URL}/user/sign-up`, userData);
  return response.data;
};
  
export const useCreateUser = () => {
  return useMutation({
    mutationFn: (userData: TAuthCredentialsValidator) => createUser(userData),
  });
};

const signInUser = async (data: TAuthCredentialsValidator) => {
  const response = await axios.post(`${BASE_URL}/user/sign-in`, data);
  return response.data;
};
  
export const useSignIn = () => {
  return useMutation({
    mutationFn: (userData: TAuthCredentialsValidator) => signInUser(userData),
  });
};

//Product related queries
const getProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCTS],
    queryFn: getProducts,
    staleTime: Infinity,
  });
};
