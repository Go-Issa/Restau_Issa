import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "appFood.db";
const database_version = "1.0";
const database_displayname = "FoodApp Offline Database";
const database_size = 200000;


export default class Database {
    initDB() {
        let db;
        return new Promise((resolve) => {
          console.log("Plugin integrity check ...");
          SQLite.echoTest()
            .then(() => {
              console.log("Integrity check passed ...");
              console.log("Opening database ...");
              SQLite.openDatabase(
                database_name,
                database_version,
                database_displayname,
                database_size
              )
                .then(DB => {
                  db = DB;
                  console.log("Database OPEN");
                  db.executeSql('SELECT 1 FROM User LIMIT 1').then(() => {
                      console.log("Database is ready ... executing query ...");
                  }).catch((error) =>{
                      console.log("Received error: ", error);
                      console.log("Database not yet ready ... populating data");
                      db.transaction((tx) => {
                          tx.executeSql('CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30), email VARCHAR(30), password VARCHAR(30), phone VARCHAR(20))');
                      }).then(() => {
                          console.log("Table created successfully");
                      }).catch(error => {
                          console.log(error);
                      });
                  });
                  resolve(db);
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(error => {
              console.log("echoTest failed - plugin not functional");
            });
          });
      };


      closeDatabase(db) {
        if (db) {
          console.log("Closing DB");
          db.close()
            .then(status => {
              console.log("Database CLOSED");
            })
            .catch(error => {
              this.errorCB(error);
            });
        } else {
          console.log("Database was not OPENED");
        }
      };

      /*listCommand() {
        return new Promise((resolve) => {
          const commands = [];
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('SELECT c.comId, c.comTotal, c.comDate FROM Command c', []).then(([tx,results]) => {
                console.log("Query completed");
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  console.log(`Command ID: ${row.comId}, Command Total: ${row.comTotal}`)
                  const { comId, comTotal, comDate } = row;
                  commands.push({
                    comId,
                    comTotal,
                    comDate
                  });
                }
                console.log(commands);
                resolve(commands);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }


      listProduct(id) {
        console.log(id);
        return new Promise((resolve) => {
            const products = [];
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('SELECT * FROM Product WHERE comId = ?', [id]).then(([tx,results]) => {
                console.log("Query completed");
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  console.log(`Product ID: ${row.prodId}, Product Name: ${row.prodName}`)
                  const { prodId, prodName, prodImage, prodPrice, prodQte } = row;
                  products.push({
                    prodId,
                    prodName,
                    prodImage,
                    prodPrice,
                    prodQte
                  });
                }
                console.log(commands);
                resolve(commands);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }*/


      addUser(user) {
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('INSERT INTO User VALUES (?, ?, ?, ?, ?)', [null, user.name, user.email, user.password, user.phone]).then(([tx, results]) => {
                resolve(results);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }

      /*addProduct(prod) {
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('INSERT INTO Product VALUES (?, ?, ?, ?)', [prod.comId, prod.prodName, prod.prodImage, prod.prodPrice]).then(([tx, results]) => {
                resolve(results);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }*/

      userByEmail(email) {
        console.log(email);
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('SELECT * FROM User WHERE email = ?', [email]).then(([tx,results]) => {
                console.log(results);
                if(results.rows.length > 0) {
                  let row = results.rows.item(0);
                  resolve(row);
                }
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }

}