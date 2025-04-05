const firebaseConfig = {
  apiKey: "AIzaSyCnapyLzzYqwe0dZVzNile3ZPV4ICO7tx4",
  authDomain: "principal-6fb7c.firebaseapp.com",
  projectId: "principal-6fb7c",
  storageBucket: "principal-6fb7c.appspot.com",
  messagingSenderId: "700182934260",
  appId: "1:700182934260:web:4b1a117a22a4d6d24064a1",
  measurementId: "G-DRMNXQ47TD"
};
      firebase.initializeApp(firebaseConfig);
      document.addEventListener('DOMContentLoaded', function() {
      document.getElementById('principalLoginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
                firebase.auth().signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            window.location.href = "principal_dashboard.html";
          })
          .catch((error) => {
            error.message = " Invalid Email/Password.";
            alert(error.message);
          });
      });
    });