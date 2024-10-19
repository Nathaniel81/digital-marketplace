import { 
	// useQuery,
	useMutation,
	// useInfiniteQuery,
  } from "@tanstack/react-query";
  import axios from 'axios';
//   import { QUERY_KEYS } from "./queryKeys";
  import {
	// AuthCredentialsValidator,
	TAuthCredentialsValidator,
  } from '@/lib/validators/account-credentials-validator';


// User related queries
export const createUser = async (userData: TAuthCredentialsValidator) => {
  const response = await axios.post('https://api.com/api/users/', userData);
  return response.data;
};
  
export const useCreateUser = () => {
  return useMutation({
    mutationFn: (userData: TAuthCredentialsValidator) => createUser(userData),
  });
};

const signInUser = async (data: TAuthCredentialsValidator) => {
  const response = await axios.post('https://api.com/api/auth/sign-in', data);
  return response.data;
};
  
export const useSignIn = () => {
  return useMutation({
    mutationFn: (userData: TAuthCredentialsValidator) => signInUser(userData),
  });
};
