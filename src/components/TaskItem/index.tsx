import React, {useState} from 'react';
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CheckBox from '@react-native-community/checkbox';
import {useDatabase} from '@nozbe/watermelondb/hooks';

export default function TaskItem({task, setTasks}: any) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [checked, setChecked] = useState(task.status);

  const database = useDatabase();

  async function handleChecked(newValue: boolean) {
    await database.action(async () => {
      const selectedTask = await database.get('tasks').find(task.id);

      await selectedTask.update((task: any) => {
        task.status = newValue;
      });

      setChecked(newValue);
    });
  }

  async function handleUpdate() {
    await database.action(async () => {
      const selectedTask = await database.get('tasks').find(task.id);

      const updatedTask = await selectedTask.update((task: any) => {
        task.title = title;
        task.description = description;
        task.status = checked;
      });

      setTasks((state: any) => {
        const findedTask = state.findIndex((t: any) => t.id === task.id);

        state[findedTask] = updatedTask;

        return [...state];
      });

      setShowModal(false);
    });
  }

  async function handleDelete() {
    Alert.alert('Apagar tarefa', 'Deseja apagar permanentemente essa tarefa?', [
      {
        text: 'Não',
        onPress: () => {},
        style: 'cancel',
      },
      {text: 'Sim', onPress: () => deleteTask()},
    ]);
  }

  async function deleteTask() {
    await database.action(async () => {
      const selectedTask = await database.get('tasks').find(task.id);
      await selectedTask.destroyPermanently();

      setShowModal(false);

      setTasks((state: any) => {
        const findedTask = state.findIndex((t: any) => t.id === task.id);

        state.splice(findedTask, 1);

        return [...state];
      });
    });
  }

  return (
    <>
      <TouchableOpacity onPress={() => setShowModal(true)} style={S.container}>
        <View style={S.wrapper}>
          <CheckBox
            disabled={false}
            value={checked}
            tintColors={{true: '#673ab7', false: '#c9a5d8'}}
            onValueChange={handleChecked}
          />
          <View>
            <Text style={S.title}>{task.title}</Text>
            <Text style={S.subTitle}>{task.description}</Text>
          </View>
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
                onPress={handleDelete}
                style={{...S.actionButton, backgroundColor: '#DC3545'}}>
                <Text style={S.actionButtonText}>Apagar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleUpdate}
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
  wrapper: {
    flexDirection: 'row',
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
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
