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
  const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail');
  console.log("Authenticated email:", loggedInUserEmail);

});
function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "main.html";
  }).catch((error) => {
    console.error("Error logging out:", error);
  });
}
document.getElementById('logoutButton').addEventListener('click', function() {
  logout();
});  
const db = firebase.firestore();
document.getElementById('submitDetails').addEventListener('click', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const rollNumber = document.getElementById('rollNumber').value;
  const year = document.getElementById('year').value;
  const branch = document.getElementById('branch').value;
  const bonafideType = document.querySelector('.dropdown-content .active').id;
  const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail');
  db.collection("students").add({
    name: name,
    rollNumber: rollNumber,
    email: loggedInUserEmail,
    year: year,
    branch: branch,
    bonafideType: bonafideType,
    submittedAt:firebase.firestore.FieldValue.serverTimestamp()
  })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    document.getElementById('submissionMessage').style.display = 'block';
    displaySubmissionDetails();
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
})
function toggleDropdown() {
  var dropdownContent = document.querySelector('.dropdown-content');
  dropdownContent.classList.toggle('show');
}
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName('dropdown-content');
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
const bonafideTypeLinks = document.querySelectorAll('.dropdown-content a');
bonafideTypeLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    bonafideTypeLinks.forEach(function(link) {
      link.classList.remove('active');
    });
    this.classList.add('active');
    toggleDropdown();
  });
});
window.onload = displaySubmissionDetails;
function displaySubmissionDetails() {
  const tableBody = document.getElementById('submissionDetailsTableBody');
  tableBody.innerHTML = '';
  const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail');
  db.collection('students').where('email', '==', loggedInUserEmail).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const row = tableBody.insertRow();
      const nameCell = row.insertCell();
      nameCell.textContent = data.name;
      const rollNumberCell = row.insertCell();
      rollNumberCell.textContent = data.rollNumber;
      const statusCell = row.insertCell();
      const downloadCell = row.insertCell();
      if (data.approved === true) {
        statusCell.textContent = 'Approved';
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download';
        downloadCell.appendChild(downloadButton);
        const bonafideContent = `This is to certify that Mr/Mrs <b><u> ${data.name} </u></b> with roll number<b><u> ${data.rollNumber} </b></u> is a bonafide student of this college and studying in ${data.branch} in ${data.year}th year. This certificate is being issued on the request of the student for the purpose of<b> ${data.bonafideType} </b> application.`;
        downloadButton.addEventListener('click', function () {
          const certificateContent = certificateTemplate.replace('--content as above--', bonafideContent);
          html2pdf().from(certificateContent).save();
        });
      } else {
        statusCell.textContent = 'Pending';
      }
    });
  }).catch((error) => {
    console.error('Error fetching submission details: ', error);
  });
}
const certificateTemplate = `
<style>
    body {
      font-family: Arial, sans-serif;
    }
    .certificate-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      max-width: 600px;
      margin: 0 auto;
      padding: 50px;
      background-color: #f9f9f9;
      height: 100vh;
      page-break-after: always;
    }
    h2 {
      text-align: center;
      font-weight: bold;
      line-height:4;
      font-size: 24px;
      text-decoration: underline;
      margin-bottom: 10px; /* Adjusted margin for better spacing */
    }
    p {
      text-align: justify;
      line-height:2;
       /* Set content text to bold */
    }
    .logo-container {
      display: flex;
      align-items: center; /* Align items horizontally */
      margin-bottom: 20px; /* Add margin for better spacing */
    }
    .logo {
      width: 80px; /* Decrease logo size */
      margin-right: 10px; /* Add margin for better spacing */
    }
    h1 {
      font-size: 24px; 
      text-align: center;
                 /* Adjust the font size as needed */
      margin: 0; /* Remove default margin */
    }
    .signature {
      position: absolute;
      bottom: 87px;
      right: 0px;
    }
  </style>
</head>
<body>
<div class="certificate-container">
  <div class="logo-container">
    <img class="logo" src="logo.png" alt="Logo"><h1>SIDDARTHA INSTITUTE OF SCIENCE AND TECHNOLOGY, PUTTUR</h1>
  </div>
  <h2>Bonafide Certificate</h2>
  <p>--content as above-- </p>
  <div class="signature">
    <img src="principal.png" alt="Authorized Signature">
  </div>
</div>
`;