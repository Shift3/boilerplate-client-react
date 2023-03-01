import { Agent } from 'common/models';
import { openDB, DBSchema, IDBPDatabase, StoreNames } from 'idb';

interface BoilerplateDB extends DBSchema {
    'agents': {
        value: Agent;
        key: number;
    }
}

const dbPromise = openDB<BoilerplateDB>('agents-store', 1, { 
    upgrade(db: IDBPDatabase<BoilerplateDB>) {
        if (!db.objectStoreNames.contains('agents')) {
            db.createObjectStore('agents', { keyPath: 'id' });
        }
    },
});

export const writeData = (st: StoreNames<BoilerplateDB>, data: Agent) => {
    return dbPromise
        .then((db) => {
            const tx = db.transaction(st, 'readwrite');
            const store = tx.objectStore(st);
            store.put(data);
            return tx.done;
        });
}

export const readAllData = (st: StoreNames<BoilerplateDB>) => {
    return dbPromise
        .then((db) => {
            const tx = db.transaction(st, 'readonly');
            const store = tx.objectStore(st);
            return store.getAll();
        });
}

export const readSpecifiedData = (st: StoreNames<BoilerplateDB>, key: number) => {
    return dbPromise
        .then((db) => {
            const tx = db.transaction(st, 'readonly');
            const store = tx.objectStore(st);
            return store.get(key);
        });
}

export const clearAllData = (st: StoreNames<BoilerplateDB>) => {
    return dbPromise
        .then((db) => {
            const tx = db.transaction(st, 'readwrite');
            const store = tx.objectStore(st);
            store.clear();
            return tx.done;
        });
}