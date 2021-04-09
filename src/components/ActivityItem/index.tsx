import React, {useState} from 'react';
import {Text, View, Modal, TouchableOpacity, TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function ActivityItem() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setShowModal(true)} style={S.container}>
        <View>
          <Text style={S.title}>Estudar Programação</Text>
          <Text style={S.subTitle}>Estudar apps offline</Text>
        </View>

        <Text style={S.arrow}>{'>'}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <View style={S.modalWrapper}>
          <View style={S.modalContainer}>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={S.modalHeader}>
              <Text style={S.modalTitle}>Editar atividade</Text>
              <Text style={S.modalTitle}>X</Text>
            </TouchableOpacity>

            <View style={S.formGroup}>
              <Text style={S.textInputLabel}>Titulo</Text>
              <TextInput style={S.textInput} />
            </View>
            <View style={S.formGroup}>
              <Text style={S.textInputLabel}>Descrição</Text>
              <TextInput style={S.textInput} />
            </View>

            <View style={S.actions}>
              <TouchableOpacity
                style={{...S.actionButton, backgroundColor: '#DC3545'}}>
                <Text style={S.actionButtonText}>Apagar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...S.actionButton,
                  backgroundColor: '#007BFF',
                  marginLeft: 20,
                }}>
                <Text style={S.actionButtonText}>Atualizar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const S = EStyleSheet.create({
  container: {
    borderBottomWidth: '0.0313rem',
    borderBottomColor: '#e3c3f1',
    paddingBottom: '1.25rem',
    marginBottom: '1.25rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '#2d2033',
  },
  subTitle: {
    color: '#896f96',
  },
  arrow: {
    fontSize: '1rem',
    color: '#896f96',
  },
  modalWrapper: {
    flex: 1,
    backgroundColor: 'rgba(25, 18, 31, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    borderRadius: '0.5rem',
    backgroundColor: 'white',
    width: '90%',
    padding: '1.25rem',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.25rem',
    paddingBottom: '1.25rem',
    borderBottomWidth: '0.0625rem',
    borderBottomColor: '#f0dcfd',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: '0.875rem',
    color: '#280b58',
  },
  formGroup: {
    marginBottom: '1.25rem',
  },
  textInputLabel: {
    color: '#9b70be',
    fontSize: '0.625rem',
    marginBottom: '0.25rem',
  },
  textInput: {
    backgroundColor: '#D5D4D4',
    height: '2.5rem',
    paddingHorizontal: '0.625rem',
    color: 'black',
    fontSize: '0.75rem',
    borderRadius: '0.5rem',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    paddingHorizontal: '1.25rem',
    paddingVertical: '0.625rem',
    borderRadius: '0.5rem',
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
  },
});
