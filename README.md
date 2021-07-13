# cloud-functions-tutorial

### Initial Setup
- `firebase login`
- `firebase init`
- `firebase serve` will serve ./public (use emulators instead)
- `firebase emulators:start --only "hosting","functions","auth","firestore" --inspect-functions`
- `firebase deploy`

### Copy firestore data to local emulator
- Guidelines here: [link](https://medium.com/firebase-developers/how-to-import-production-data-from-cloud-firestore-to-the-local-emulator-e82ae1c6ed8)
- `gcloud config set project cloud-functions-tutorial-feb9e `
- `gcloud firestore export gs://cloud-functions-tutorial-feb9e.appspot.com/exports-folder`
  - this will require billing setup on the project
- `cd functions`
- `gsutil -m cp -r gs://cloud-functions-tutorial-feb9e.appspot.com/exports-folder .`
- Test the data (still within the ./functions folder): 
  - `firebase emulators:start --only firestore --import ./exports-folder`

![image](https://user-images.githubusercontent.com/3271894/121212395-8c27a980-c83a-11eb-9f7c-c4265c1bfcf8.png)
