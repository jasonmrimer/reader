This is a web app used to test digital reading interfaces for improved reading comprehension. It uses rapid visual serial presentation to display passages to readers and then asks several comprehension questions to test reading comprehension. 

![](example.gif)

###Mongo
Prepare the data model by installing mongodb. Note, this takes extra work on macOS Catalina. Most internet mongo instructions will work fine but use these extra for the mac setup. The following commands will start a mongo process.

Setup a data folder and then use its path:
```shell script
sudo mongod --dbpath [insert_path_here] --fork --syslog
```
<br/>

Navigate to the project root directory then run these commands setup the db collections and prep the data.
```shell script
cd reader
./scripts/truncate_db.js
./scripts/seed_db.js
```
Database now initialized to run the app

<br/>

###Node
Clone repository and then run node
```
cd reader
npm install
node index.js
```
accessible at: localhost:4000

<br/>

###Angular
Build and serve the frontend
```shell script
cd reader/frontend
npm install
ng serve
```
accessible at: localhost:4200
