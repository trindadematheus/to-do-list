import React from 'react';
import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

const {width} = Dimensions.get('window');

import Schema from './database/schema';
import Task from './database/models/Task';
import Routes from './routes';

const adapter = new SQLiteAdapter({
  dbName: 'todo',
  schema: Schema,
});

const database = new Database({
  adapter,
  modelClasses: [Task],
  actionsEnabled: true,
});

export default function App() {
  let rem = 14;

  if (width > 768) {
    rem = 30;
  } else if (width > 414) {
    rem = 21;
  } else if (width > 375) {
    rem = 18;
  } else if (width > 320) {
    rem = 16;
  }

  EStyleSheet.build({
    $rem: rem,
  });

  return (
    <>
      <DatabaseProvider database={database}>
        <Routes />
      </DatabaseProvider>
    </>
  );
}
