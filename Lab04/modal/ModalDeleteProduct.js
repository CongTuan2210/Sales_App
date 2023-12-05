import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const ModalDeleteProduct = ({
  visible,
  onRequestClose,
  onPressCloseModal,
  onDeleteProduct,
  productToDelete,
  idCart
}) => {
  return (
    <Modal
      hardwareAccelerated
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.centered_modal}>
        <View style={styles.showModal}>
          <Text style={styles.text_modal}>
            Are you sure you want to delete this product?
          </Text>
          <View style={styles.btn}>
            <TouchableOpacity
              style={styles.accept_btn}
              onPress={() => onDeleteProduct(idCart, productToDelete)}>
              <Text style={styles.text_accept}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancel_btn}
              onPress={onPressCloseModal}>
              <Text style={styles.text_accept}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  showModal: {
    width: 300,
    height: 150,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
  },
  centered_modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  text_modal: {
    width: '90%',
    fontSize: 18,
    paddingHorizontal: 5,
    color: '#000000',
    fontWeight: '600',
    marginTop: 25,
  },
  btn: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accept_btn: {
    height: 40,
    width: 100,
    marginTop: 10,
    backgroundColor: '#fe2200',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  cancel_btn: {
    height: 40,
    width: 100,
    marginTop: 10,
    backgroundColor: '#078ee6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text_accept: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
});

export default ModalDeleteProduct;
