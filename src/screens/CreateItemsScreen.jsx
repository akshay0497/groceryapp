import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';

const CreateItemsScreen = ({ groceryData, setGroceryData }) => {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [prices, setPrices] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [itemId, setItemId] = useState(null);

  const addGroceryHandler = () => {
    const newItem = {
      id: Date.now(),
      name: item,
      quantity: quantity,
      unit: unit,
      price: prices,
      supplier: supplierName,
    };
    setGroceryData([...groceryData, newItem]);
    resetForm();
  };

  const updateItemHandler = () => {
    const updatedItems = groceryData.map((groceryItem) =>
      groceryItem.id === itemId
        ? {
            ...groceryItem,
            name: item,
            quantity: quantity,
            unit: unit,
            price: prices,
            supplier: supplierName,
          }
        : groceryItem
    );
    setGroceryData(updatedItems);
    resetForm();
  };

  const handleDelete = (id) => {
    console.log("Grocery Data Before Delete:", groceryData);
    const updatedData = groceryData.filter((item) => item.id !== id);

    if (updatedData.length !== groceryData.length) {
      console.log("State is changing, updating...", updatedData);
      setGroceryData(updatedData);
    } else {
      console.log("No change in data, skipping setGroceryData");
    }
  };

  const handleEdit = (id) => {
    const itemToEdit = groceryData.find((item) => item.id === id);
    setIsEdit(true);
    setItemId(id);
    setItem(itemToEdit.name);
    setQuantity(itemToEdit.quantity);
    setUnit(itemToEdit.unit);
    setPrices(itemToEdit.price);
    setSupplierName(itemToEdit.supplier);
  };

  const resetForm = () => {
    setItem('');
    setQuantity('');
    setUnit('');
    setSupplierName('');
    setPrices('');
    setIsEdit(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Item Name"
        style={styles.input}
        value={item}
        onChangeText={setItem}
      />
      <TextInput
        placeholder="Enter Price"
        style={styles.input}
        value={prices}
        keyboardType="numeric"
        onChangeText={setPrices}
      />
      <TextInput
        placeholder="Enter Quantity"
        style={styles.input}
        value={quantity}
        keyboardType="numeric"
        onChangeText={setQuantity}
      />
      <TextInput
        placeholder="Enter Unit (e.g., kg, liters)"
        style={styles.input}
        value={unit}
        onChangeText={setUnit}
      />
      <TextInput
        placeholder="Enter Supplier Name"
        style={styles.input}
        value={supplierName}
        onChangeText={setSupplierName}
      />

      <Pressable style={styles.btn} onPress={isEdit ? updateItemHandler : addGroceryHandler}>
        <Text style={styles.btnText}>{isEdit ? 'Update Item' : 'Add Item'}</Text>
      </Pressable>

      <FlatList
        data={groceryData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemWrapper}>
            <View
              style={[
                styles.itemContainer,
                { backgroundColor: item.quantity <= 50 ? '#FFCCCC' : '#D7F6BF' },
              ]}
            >
              <Text style={[styles.itemText, styles.column]}>{item.name}</Text>
              <Text style={[styles.itemText, styles.column]}>{item.quantity}</Text>
              <Text style={[styles.itemText, styles.column]}>{item.supplier}</Text>
              <View style={styles.actionContainer}>
                <Pressable onPress={() => handleEdit(item.id)}>
                  <Text style={styles.actionBtn}>Edit</Text>
                </Pressable>
                <Pressable onPress={() => handleDelete(item.id)}>
                  <Text style={styles.actionBtn}>Delete</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={{ gap: 15 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: '4%',
    gap: 15,
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 15,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  btn: {
    backgroundColor: '#1E2A47',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 7,
    marginTop: 15,
  },
  btnText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  headingTxt: {
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  itemText: {
    fontWeight: '500',
    fontSize: 15,
    textAlign: 'center',
    color: '#555',
  },
  column: {
    width: '21%',
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtn: {
    fontWeight: '600',
    fontSize: 14,
    color: '#1E2A47',
    textDecorationLine: 'underline',
  },
  itemWrapper: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default CreateItemsScreen;
