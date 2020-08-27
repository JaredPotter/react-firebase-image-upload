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
  const [existingImageUrl, setExistingImageUrl] = React.useState(
    "https://firebasestorage.googleapis.com/v0/b/react-firebase-image-upl-53de3.appspot.com/o/images%2FScreen%20Shot%202020-06-15%20at%209.09.13%20PM%20(2).png?alt=media&token=cfd9b764-6c6f-4fc4-ab08-34750a0c4037"
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const inputFileElement = React.useRef(null);

  function handleUploadClick() {
    const file = inputFileElement.current.files[0];
    setIsLoading(true);

    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`images/${file.name}`);
    fileRef.put(file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log("File available at", downloadURL);
        setExistingImageUrl(downloadURL);
        setIsLoading(false);
      });
    });
  }

  function handleImageChange() {
    setExistingImageUrl("");
  }

  return (
    <div className="App">
      {isLoading ? <div>UPLOADING...</div> : null}
      {existingImageUrl ? (
        <>
          <img src={existingImageUrl} className="image-preview" />
          <button onClick={handleImageChange}>Change</button>
        </>
      ) : (
        <>
          <input
            type="file"
            ref={inputFileElement}
            accept="image/png, image/jpeg"
          />
          <button onClick={handleUploadClick}>Upload</button>
        </>
      )}
    </div>
  );
}

export default App;
