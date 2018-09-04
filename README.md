# Welcome to the backend

## In order to get the backend up and running,
1. Install the OS specific version of [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)
   - If you are using a Ubuntu OS then run mongo service by typing `sudo service mongod start` in the terminal window.
   - If you are using a Mac OS X then run mongo service by typing `mongo --host 127.0.0.1:27017` in the terminal window.
   - If you are using a Windows OS then first create a data directory to store all data by typing `md "\data\db" "\data\log"` in the command prompt and then run mongo service by executing `mongod.exe` file from `C:\Program Files\MongoDB\Server\4.0\bin\` directory or by typing `"C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="c:\data\db"` in the command prompt.
2. Once MongoDB is installed, proceed to installing [NodeJS](https://nodejs.org/en/download/). Choose the OS specific version of NodeJS. You can verify if NodeJS is successfully installed by typing the following in the terminal window/command prompt.
```
> node -v
```
You should see `v10.8.0` or some other version being printed on the window. NodeJS installs `npm` as well. TO verify that `npm` is successfully installed, issue a similar command in your terminal window/command prompt.
```
> npm -v
```
You should see the `npm` version number installed on your system.
3. After installing `NodeJS` and `npm`, install `express` by running `npm install -g express` in the terminal window/command prompt.
   - For Linux environments, you might have to run `sudo npm install -g express`.
4. Once all this is done, navigate to the backend's root directory from the terminal window/command prompt. Simply type `cd <backend's root directory>` in the terminal window/command prompt.
> __Note__: Please don't type `<backend's root directory>` in the window. The root directory differs from system to system. In my system, the backend's root directory is `/home/ericsson/Documents/web`. In your system it might be something else.
5. Then run `npm install --save`.
   - For Linux environments, you might have to run `sudo npm install --save`.

Now the backend is ready. In order to run it, issue the following command in your terminal window/command prompt.
```
npm start
```

> __Note__: Please do not close this terminal window/command prompt in order to keep the backend up and running.

This backend handles all the HTTP requests received from the drone and the frontend. The backend is a simple HTTP REST server which has the following endpoints:
1. `/addItem`: Usually called by the drone. This endpoint adds an item to a bin.
2. `/items`: Usually called by the frontend. This endpoint returns all the items present in all the bins.
3. `/deleteDb`: This endpoint is triggered whenever a user clicks on "Clear Database" button on the frontend. As the name says, it deletes all the entries from the database.