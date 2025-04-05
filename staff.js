const firebaseConfig = {
  apiKey: "AIzaSyDlPEOTUyjHM6N0pk8-Cw6nCB-9Ah-BcFE",
  authDomain: "staff-eac78.firebaseapp.com",
  projectId: "staff-eac78",
  storageBucket: "staff-eac78.appspot.com",
  messagingSenderId: "483148358074",
  appId: "1:483148358074:web:bd38c4939aa75496297d83",
  measurementId: "G-XJQM77FDKZ"
};
      firebase.initializeApp(firebaseConfig);
document.addEventListener('DOMContentLoaded', function() {
      document.getElementById('staffLoginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
                firebase.auth().signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            window.location.href = "staff_dashboard.html";
          })
          .catch((error) => {
            error.message = " Invalid Email/Password.";
            alert(error.message);
          });
      });
    });
      