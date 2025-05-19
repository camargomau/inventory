import { createContext, useContext } from 'react';

export const TokenContext = createContext();

export default function useToken() {
	return useContext(TokenContext);
}
