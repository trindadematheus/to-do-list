import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, Modal, View, TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CheckBox from '@react-native-community/checkbox';
import {useDatabase} from '@nozbe/watermelondb/hooks';

export default function ModalCreateTask({setTasks}: any) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [checked, setChecked] = useState(false);

  const database = useDatabase();

  useEffect(() => {
    clearForm();
  }, [showModal]);

  async function handleAddTask() {
    await database.action(async () => {
      const newTask = await database.get('tasks').create((task: any) => {
        task.title = title;
        task.description = description;
        task.status = checked;
      });

      setTasks((state: any) => [...state, newTask]);
      setShowModal(false);
    });
  }

  function clearForm() {
    setTitle('');
    setDescription('');
    setChecked(false);
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        activeOpacity={0.8}
        style={S.button}>
        <Text style={S.buttonText}>+ Nova Atividade</Text>
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
              <Text style={S.modalTitle}>Adicionar nova atividade</Text>
              <Text style={S.modalTitle}>X</Text>
            </TouchableOpacity>

            <View style={S.formGroup}>
              <Text style={S.textInputLabel}>Titulo</Text>
              <TextInput
                value={title}
                onChangeText={text => setTitle(text)}
                style={S.textInput}
              />
            </View>
            <View style={S.formGroup}>
              <Text style={S.textInputLabel}>Descrição</Text>
              <TextInput
                value={description}
                onChangeText={text => setDescription(text)}
                style={S.textInput}
              />
            </View>

            <View style={S.status}>
              <CheckBox
                disabled={false}
                value={checked}
                tintColors={{true: '#673ab7', false: '#c9a5d8'}}
                onValueChange={newValue => setChecked(newValue)}
              />
              <Text style={S.textInputLabel}>Status</Text>
            </View>

            <View style={S.actions}>
              <TouchableOpacity
                onPress={clearForm}
                style={{...S.actionButton, backgroundColor: '#DC3545'}}>
                <Text style={S.actionButtonText}>Limpar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAddTask}
                style={{
                  ...S.actionButton,
                  backgroundColor: '#007BFF',
                  marginLeft: 20,
                }}>
                <Text style={S.actionButtonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const S = EStyleSheet.create({
  button: {
    backgroundColor: '#673ab7',
    padding: '0.625rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '0.5rem',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
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
    color: '#593c70',
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
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '1.25rem',
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
