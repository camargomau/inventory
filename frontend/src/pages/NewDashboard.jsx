import useToken from "../context/TokenContext";
import { InventoryContext } from "../context/InventoryContext";
import Header from "../components/newDashboard/Header";

import { getUsernameFromToken } from "../utils/jwt";
import { useState, useEffect, useMemo } from "react";

import { useInventory } from "../hooks/useInventory";

export default function NewDashboard() {
  const { token, setToken } = useToken();

  const {
    items,
    loading,
    editedIds,
    deletedIds,
    addedIds,
    restoredIds,
    addModalOpen,
    setAddModalOpen,
    addError,
    setAddError,
    handleAdd,
    handleEdit,
    handleDelete,
    handleRefresh,
    handleExport,
    showDeleted,
    toggleShowDeleted,
    handleRestore,
  } = useInventory(token);

  // Extract username from token
  const username = useMemo(() => getUsernameFromToken(token), [token]);

  // State for visible fields
  const [visibleFields, setVisibleFields] = useState(["itemId", "name", "sku", "price", "quantity"]);

  // State for add item modal reset
  const [addModalKey, setAddModalKey] = useState(0);

  const context = {
    username,
    setToken,
    showDeleted,
    addModalKey,
    addModalOpen,
    handleAdd,
    addError
  }

  return (
    <InventoryContext.Provider value={context}>
      <Header />
    </InventoryContext.Provider>
  );
}
