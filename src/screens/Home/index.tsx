import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {ScrollView} from 'react-native-gesture-handler';
import {useDatabase} from '@nozbe/watermelondb/hooks';

import logoImage from '../../assets/logo.png';
import TaskItem from '../../components/TaskItem';
import ModalCreateTask from '../../components/ModalCreateTask';

export default function Home() {
  const [tasks, setTasks] = useState([]);

  const database = useDatabase();

  useEffect(() => {
    searchAllTasks();
  }, []);

  async function searchAllTasks() {
    const allTasks: any = await database.get('tasks').query().fetch();

    setTasks(allTasks);
  }

  return (
    <View style={S.container}>
      <StatusBar
        animated={true}
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Image style={S.image} source={logoImage} />
      <View style={S.card}>
        <ModalCreateTask setTasks={setTasks} />
        <ScrollView style={S.list}>
          {tasks.map((task, key) => (
            <TaskItem key={key} task={task} setTasks={setTasks} />
          ))}
        </ScrollView>
        <Text style={S.copyright}>Desenvolvido por Matheus Trindade</Text>
      </View>
    </View>
  );
}

const S = EStyleSheet.create({
  container: {
    flex: 1,
    padding: '1.25rem',
    backgroundColor: '#673ab7',
  },
  image: {
    alignSelf: 'center',
    height: '4.375rem',
    width: '10.625rem',
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: 'white',
    padding: '1.25rem',
    borderRadius: '0.5rem',
    flex: 1,
  },
  list: {
    marginTop: '1.25rem',
  },
  copyright: {
    color: '#A49DAB',
    marginTop: '1.25rem',
    alignSelf: 'center',
  },
});
