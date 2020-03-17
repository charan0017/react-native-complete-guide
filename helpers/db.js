import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

const executeQuery = (sqlStatement = '', args = []) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                sqlStatement,
                args,
                (_, res) => resolve(res),
                (_, err) => reject(err)
            );
        });
    });
};

export const init = () => executeQuery(
    'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
    []
);

export const insertPlace = (title, imageUri, address, lat, lng) => executeQuery(
    'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);',
    [title, imageUri, address, lat, lng]
);

export const fetchPlaces = () => executeQuery(
    'SELECT * FROM places',
    []
);
