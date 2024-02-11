const { connectToDb , getDb } =require('./db');
const { ObjectId } = require('mongodb'); 

let db ;
connectToDb((err)=>{
    //after the connection to db is established then the node should run
    // if(!err){
    //     app.listen(3000 , ()=>{
    //         console.log('app listening on port 3000')
    //     })
    // }
    db=getDb()

})


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
      const user = db.collection('Student_details').findOne({_id: new ObjectId(userID)});
      if (user) {
        // Display user info
        const userInfoElement = document.getElementById('userInfo');
        if (user.Entry_Status === 0) { // If never scanned before
          userInfoElement.innerHTML = `
            <p>User ID: ${user._id.$oid}</p>
            <p>Name: ${user.name}</p>
            <p>College: ${user.college}</p>
            <p>College Roll No: ${user.collegeRollNo}</p>
            <p><strong style="color: green;">New Entry</strong></p>
          `;
          //updation of entry
          db.collection('Student_details')
          .updateOne({_id: new ObjectId(req.params.id)} , {$set : {'Entry_Status': '1'}})
          .then(result =>{
              res.status(200).json(result)
          })
          .catch(err =>{
              res.status(500).json({error: "could not update the document"})
          })


        } else { // If already scanned
          userInfoElement.innerHTML = `
            <p>User ID: ${user._id.$oid}</p>
            <p>Name: ${user.name}</p>
            <p>College: ${user.college}</p>
            <p>College Roll No: ${user.collegeRollNo}</p>
            <p><strong style="color: red;">ALREADY ENTERED</strong></p>
          `;
        }
      } else {
        // Display message if user not found
        document.getElementById('userInfo').innerText = 'User not found';
      }
    })
    .catch(error => console.error('Error fetching user info:', error));
}

// Event listener for the "Scan Again" button
document.getElementById('scanAgainButton').addEventListener('click', function() {
  // Reload the page to start scanning again
  location.reload();
});
