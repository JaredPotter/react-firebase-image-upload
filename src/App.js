import React from "react";
import firebase from "firebase";
import "./App.css";

const firebaseConfig = {
  apiKey: "AIzaSyDQhxehYuEYW-cU5OWLS9j0UfidpGhEJhA",
  authDomain: "react-firebase-image-upl-53de3.firebaseapp.com",
  databaseURL: "https://react-firebase-image-upl-53de3.firebaseio.com",
  projectId: "react-firebase-image-upl-53de3",
  storageBucket: "react-firebase-image-upl-53de3.appspot.com",
  messagingSenderId: "72374117543",
  appId: "1:72374117543:web:86fe77989ac1686251e782",
  measurementId: "G-60X1V0SCQP",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  const inputFileElement = React.useRef(null);

  function handleUploadClick() {
    const file = inputFileElement.current.files[0];

    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`images/${file.name}`);
    fileRef.put(file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log("File available at", downloadURL);
      });
    });
  }

  return (
    <div className="App">
      <input
        type="file"
        ref={inputFileElement}
        accept="image/png, image/jpeg"
      />
      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}

export default App;
