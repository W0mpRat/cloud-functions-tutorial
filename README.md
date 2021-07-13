# cloud-functions-tutorial

### Initial Setup
- `firebase login`
- `firebase init`
- `firebase serve` will serve ./public (use emulators instead)
- `firebase emulators:start --only "hosting","functions","auth","firestore" --inspect-functions --import ./backups/emulator/`
- `firebase deploy`

### Setup Emulator Backup Folder
- While the emulators are running from the ./functions folder: `firebase emulators:export ./backups/emulator`

### Copy firestore data to local emulator
- Guidelines here: [link](https://medium.com/firebase-developers/how-to-import-production-data-from-cloud-firestore-to-the-local-emulator-e82ae1c6ed8)
- `gcloud config set project cloud-functions-tutorial-feb9e `
- `gcloud firestore export gs://cloud-functions-tutorial-feb9e.appspot.com/exports-folder`
  - this will require billing setup on the project
- `cd functions`
- `gsutil -m cp -r gs://cloud-functions-tutorial-feb9e.appspot.com/exports-folder ./backups/emulator/firestore_export/ `
- Test the data, look at emualtor UI  (still within the ./functions folder): 
  - `firebase emulators:start --only firestore --import ./backups/emulator/`

### Import auth to local emulator
- Bring auth down from prod: `firebase auth:export --format json ./backups/emulator/auth_export/accounts.json`
- Test the data, look at emualtor UI  (still within the ./functions folder):
  - `firebase emulators:start --only auth --import ./backups/emulator/`

![image](https://user-images.githubusercontent.com/3271894/121212395-8c27a980-c83a-11eb-9f7c-c4265c1bfcf8.png)
