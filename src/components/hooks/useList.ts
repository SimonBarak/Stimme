function useList(
  items: Item[],
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
) {
  const createItem = (newItem: Omit<Item, "id">) => {
    const newItemWithId = { ...newItem, id: Date.now().toString() };
    setItems([...items, newItemWithId]);
  };

  const updateItem = (id: string, updatedItem: Partial<Omit<Item, "id">>) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return { createItem, updateItem, deleteItem };
}

export default useList;
