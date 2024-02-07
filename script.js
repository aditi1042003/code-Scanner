var scanner = new Instascan.Scanner({ 
  video: document.getElementById('preview'), 
  scanPeriod: 5, 
  mirror: false 
});

scanner.addListener('scan', function(content) {
  document.getElementById('scannedContent').innerText = content;
  // Fetch user info from JSON based on the scanned content (ID)
  fetchUserInfo(content);
});

Instascan.Camera.getCameras().then(function(cameras) {
  if (cameras.length > 0) {
     scanner.start(cameras.length > 1 ? cameras[1] : cameras[0]);
  } else {
    console.error('No cameras found.');
    alert('No cameras found.');
  }
}).catch(function(e) {
  console.error(e);
  alert(e);
});

function fetchUserInfo(userID) {
  // Fetch data from your JSON file
  fetch('Dummy_Users.json')
    .then(response => response.json())
    .then(data => {
      // Find the user info based on the provided userID
      const user = data.find(user => user._id.$oid === userID);
      if (user) {
        // Display user info
        document.getElementById('userInfo').innerHTML = `
          <p>User ID: ${user._id.$oid}</p>
          <p>Name: ${user.name}</p>
          <p>College: ${user.college}</p>
          <p>College Roll No: ${user.collegeRollNo}</p>
          <p>Scanned: ${user.scanned ? 'Yes' : 'No'}</p>
        `;
      } else {
        // Display message if user not found
        document.getElementById('userInfo').innerText = 'User not found';
      }
    })
    .catch(error => console.error('Error fetching user info:', error));
}
