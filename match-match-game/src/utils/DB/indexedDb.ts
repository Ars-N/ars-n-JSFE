import { User, Stat } from '../../interfaces';

export class IndexedDb {
  private openRequest: IDBOpenDBRequest;

  constructor() {
    this.openRequest = window.indexedDB.open('match-match', 1);
    this.initDb();
  }

  initDb(): void {
    this.openRequest = window.indexedDB.open('match-match', 1);
    this.openRequest.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('top')) {
        db.createObjectStore('top', { keyPath: 'result' });
      }
      if (!db.objectStoreNames.contains('gamers')) {
        db.createObjectStore('gamers');
      }
    };
  }

  getDb(): Promise<IDBDatabase> {
    return new Promise(((resolve) => {
      this.openRequest = window.indexedDB.open('match-match', 1);
      this.openRequest.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        resolve(db);
      };
    }));
  }

  public addNewUser = (newUser: User): void => {
    this.getDb().then((db) => {
      const gamers = db.transaction('gamers', 'readwrite').objectStore('gamers');
      gamers.add(newUser, newUser.id);
    });
  };

  public getUser(): Promise<User> {
    return new Promise((resolve) => {
      this.getDb().then((db) => {
        if (db.objectStoreNames.contains('gamers')) {
          if (db) {
            const openCursor = db.transaction('gamers', 'readwrite')
              .objectStore('gamers').openCursor();
            openCursor.onsuccess = () => {
              const cursor = (openCursor).result;
              if (cursor) {
                const user: User = cursor.value;
                resolve(user);
              }
            };
          }
        }
      });
    });
  }

  public deleteGamer = (id: string): void => {
    this.getDb().then((db) => {
      const gamers = db.transaction('gamers', 'readwrite').objectStore('gamers');
      gamers.delete(id);
    });
  };

  getScore():Promise<Stat[]> {
    const listScore:Stat[] = [];
    return new Promise((resolve) => {
      this.getDb().then((db) => {
        if (db.objectStoreNames.contains('top')) {
          if (db) {
            const openCursor = db.transaction('top', 'readwrite')
              .objectStore('top').openCursor();
            openCursor.onsuccess = () => {
              const cursor = (openCursor).result;
              if (cursor) {
                const stat: Stat = cursor.value;
                listScore.push(stat);
                cursor.continue();
              } else {
                resolve(listScore);
              }
            };
          }
        }
      });
    });
  }

  // public putSettings = (newUser: User): Promise<unknown> => {
  //   return new Promise((resolve) => {
  //     this.getDb().then((db) => {
  //       const gamers = db.transaction('gamers', 'readwrite').objectStore('gamers');
  //       resolve(gamers.put(newUser));
  //     });
  //   });
  // };

  // public putSettings(newUser: User): Promise<User> {
  //   return new Promise((resolve) => {
  //     this.getDb().then((db) => {
  //       if (db.objectStoreNames.contains('gamers')) {
  //         if (db) {
  //           resolve(db.transaction('gamers', 'readwrite')
  //             .objectStore('gamers').put(newUser));
  //           // openCursor.onsuccess = () => {
  //           //   const cursor = (openCursor).result;
  //           //   if (cursor) {
  //           //     const user: User = cursor.value;
  //           //     resolve(user);
  //           //   }
  //           // };
  //         }
  //       }
  //     });
  //   });
  // }

  public addGameResult(resultGame: Stat, stats: Stat[]): Promise<Stat[]> {
    return new Promise((resolve) => {
      this.getDb().then((db) => {
        const top = db.transaction('top', 'readwrite').objectStore('top');

        const statIdx = stats.findIndex((item) => item.userId === resultGame.userId);

        if (statIdx === -1) {
          top.add({
            ...resultGame,
          });
          stats.push(resultGame);
        } else if (resultGame.result > stats[statIdx].result) {
          top.add({
            ...resultGame,
          });
          stats[statIdx] = resultGame;
        }
        resolve(stats);
      });
    });
  }
  //
  // // ----------------------------------------------------------
  // public async delUser() {
  //   // const request = this.db
  //   //   .transaction('top', 'readwrite')
  //   //   .objectStore('top')
  //   //   .delete(9);
  //   console.log(this.db
  //     .transaction('gamers', 'readwrite')
  //     .objectStore('gamers'));
  //
  //   // request.onsuccess = function () {
  //   //   console.log('Имя удалено из БД');
  //   // };
  //   //
  //   // request.onerror = function (event) {
  //   //   console.log('Ошибка при удалении объекта из БД', request.error);
  //   // };
  // }
}
