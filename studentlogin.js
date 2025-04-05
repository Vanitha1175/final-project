
const firebaseConfig = {
  apiKey: "AIzaSyCp1r3YzC6Y7cr1RGkkqUE3fx97IWdOT-g",
  authDomain: "student-a260a.firebaseapp.com",
  projectId: "student-a260a",
  storageBucket: "student-a260a.appspot.com",
  messagingSenderId: "1069846278949",
  appId: "1:1069846278949:web:6da7e236301f7af11960cc",
  measurementId: "G-XDTS4G12ZZ"
};
  firebase.initializeApp(firebaseConfig);
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('studentLoginForm').addEventListener('submit', function(event) {
      event.preventDefault();
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    sessionStorage.setItem('loggedInUserEmail', email);
    window.location.href = "student_dashboard.html";
  })
  .catch((error) => {
    error.message = " Invalid Email/Password.";
    alert(error.message);
  });
    });
  });
  
 