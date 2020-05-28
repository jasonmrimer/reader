Study to test digital reading interfaces for improved reading comprehension.

###Mongo
Prepare the data model (takes some extra work on my machine) 
```shell script
sudo mongod --dbpath /Users/engineer/mongo-data --fork --syslog
mongo
```
In a separate tab: 
```shell script
cd reader
./scripts/truncate_db.js
./scripts/seed_db.js
```
Database now initialized to run the app


###Node
Clone repository and then run node
```
cd reader
npm install
node index.js
```
accessible at: localhost:4000

###Angular
Build and serve the frontend
```shell script
cd reader/frontend
npm install
ng serve
```
accessible at: localhost:4200