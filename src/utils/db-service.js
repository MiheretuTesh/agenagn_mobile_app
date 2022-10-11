import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {FavoriteDB} from '../models';

const tableName = 'favoriteData';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'favorite-data.db', location: 'default'});
};

export const createTable = async db => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        value TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

export const getFavorites = async db => {
  try {
    const favoriteItems = [];
    const results = await db.executeSql(
      `SELECT rowid as id,value FROM ${tableName}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        favoriteItems.push(result.rows.item(index));
      }
    });
    return favoriteItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todoItems !!!');
  }
};

export const saveFavoriteItems = async (db, favoriteItems) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
    favoriteItems.map(i => `(${i.id}, '${i.value}')`).join(',');

  return db.executeSql(insertQuery);
};

export const deleteFavoriteItem = async (db, id) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async db => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};
