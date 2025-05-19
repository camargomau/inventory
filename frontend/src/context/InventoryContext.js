import { createContext, useContext } from 'react';

export const InventoryContext = createContext();

export default function useInventory() {
	return useContext(InventoryContext);
}
