import React from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {ScrollView} from 'react-native-gesture-handler';

import logoImage from '../../assets/logo.png';
import ActivityItem from '../../components/ActivityItem';
import ModalCreateActivity from '../../components/ModalCreateActivity';

export default function Home() {
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
        <ModalCreateActivity />
        <ScrollView style={S.list}>
          <ActivityItem />
          <ActivityItem />
          <ActivityItem />
          <ActivityItem />
          <ActivityItem />
          <ActivityItem />
          <ActivityItem />
          <ActivityItem />
          <ActivityItem />
          <ActivityItem />
          <ActivityItem />
          <ActivityItem />
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
    alignSelf: 'center',
  },
});
