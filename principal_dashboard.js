const firebaseConfig = {
  apiKey: "AIzaSyDlPEOTUyjHM6N0pk8-Cw6nCB-9Ah-BcFE",
  authDomain: "staff-eac78.firebaseapp.com",
  projectId: "staff-eac78",
  storageBucket: "staff-eac78.appspot.com",
  messagingSenderId: "483148358074",
  appId: "1:483148358074:web:bd38c4939aa75496297d83",
  measurementId: "G-XJQM77FDKZ"
};; 
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "main.html"; 
  }).catch((error) => {
    console.error("Error logging out:", error);
  });
}
const db = firebase.firestore();
emailjs.init({
  publicKey: "7KjPQnsBFiFRbeLFs",
});
function sendEmail(studentEmail, bonafideContent) {
  const emailParams = {
    to_email: studentEmail,
    message_html: bonafideContent
  };
  emailjs.send("service_9iy156e","template_qm2dvfr", emailParams)
    .then(function(response) {
      console.log("Email sent successfully!", response);
    })
    .catch(function(error) {
      console.error("Error sending email:", error);
    });
}
function generateBonafide(studentData) {
  const certificateTemplate = `
    <style>
    body {
      font-family: Arial, sans-serif;
    }
    .certificate-container {
      position: relative;
      max-width: 600px;
      margin: 0 auto;
      padding: 200px;
      border: 2px solid #333;
      border-radius: 10px;
      background-color: #f9f9f9;
    }
    h2 {
      text-align: center;
    }
    p {
      text-align: center;
    }
    .signature {
      position: absolute;
      bottom: 0px;
      right: 0px;
    }
    </style>
    <div class="certificate-container">
      <h2>Bonafide Certificate</h2>
      <p><strong>Name:</strong> ${studentData.name}</p>
      <p><strong>Roll Number:</strong> ${studentData.rollNumber}</p>
      <p><strong>Year:</strong> ${studentData.year}</p>
      <p><strong>Branch:</strong> ${studentData.branch}</p>
      <p><strong>Bonafide Type:</strong> ${studentData.bonafideType}</p>
      <p>This is to certify that ${studentData.salutation} ${studentData.name} with roll number ${studentData.rollNumber} is a bonafide student of this college and studying in ${studentData.year} year of ${studentData.branch} branch. This certificate is being issued on the request of the student for the purpose of ${studentData.bonafideType} application.</p>
      <div class="signature">
        <p>Authorized Signature</p>
        <img src="signature.png" alt="Authorized Signature">
      </div>
    </div>
  `;
  return certificateTemplate;
}
function sendBonafideEmail(studentEmail, studentData) {
  const bonafideContent = generateBonafide(studentData);
  sendEmail(studentEmail, bonafideContent);
}
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('send-mail')) {
    const studentDetail = event.target.closest('.student-detail');
    const studentEmail = "projectworkforbonafide@gmail.com";
    const studentData = {
      name: studentDetail.querySelector('p:nth-child(1)').innerText.split(": ")[1],
      rollNumber: studentDetail.querySelector('p:nth-child(2)').innerText.split(": ")[1],
      year: studentDetail.querySelector('p:nth-child(3)').innerText.split(": ")[1],
      branch: studentDetail.querySelector('p:nth-child(4)').innerText.split(": ")[1],
      bonafideType: studentDetail.querySelector('p:nth-child(5)').innerText.split(": ")[1],
      salutation: "Mr."
    };
    sendBonafideEmail(studentEmail, studentData);
  }
});
function displayApprovedStudentDetails() {
  const studentDetailsContainer = document.getElementById('studentDetails');
  studentDetailsContainer.innerHTML = '';
  db.collection("students").where("approved", "==", true).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const studentData = doc.data();
            const studentDetails = `
        <div class="student-detail" data-id="${doc.id}">
          <p><strong>Name:</strong> ${studentData.name}</p>
          <p><strong>Roll Number:</strong> ${studentData.rollNumber}</p>
          <p><strong>Year:</strong> ${studentData.year}</p>
          <p><strong>Branch:</strong> ${studentData.branch}</p>
          <p><strong>Bonafide Type:</strong> ${studentData.bonafideType}</p>
          <button class="send-mail" data-email="${studentData.email}">Approve</button>
        </div>
      `;
      studentDetailsContainer.innerHTML += studentDetails;
    });
  }).catch((error) => {
    console.error("Error fetching documents: ", error);
  });
}
displayApprovedStudentDetails();
function approveStudent(id) {
  db.collection("students").doc(id).update({
    approved: true
  })
  .then(() => {
    console.log("Document successfully updated");
    const approveButton = document.querySelector(`.student-detail[data-id="${id}"] .send-mail`);
    if (approveButton) {
      approveButton.remove();
    }
  })
  .catch((error) => {
    console.error("Error updating document: ", error);
  });
}
document.addEventListener('click', function(event) {
if (event.target.classList.contains('approve')) {
  const studentDetail = event.target.closest('.student-detail');
  const studentId = studentDetail.dataset.id;
  approveStudent(studentId);
}
});