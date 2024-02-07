var scanner = new Instascan.Scanner({ 
  video: document.getElementById('preview'), 
  scanPeriod: 5, 
  mirror: false 
});

scanner.addListener('scan', function(content) {
  alert(content);
});

Instascan.Camera.getCameras().then(function(cameras) {
  if (cameras.length > 0) {
    // Start the scanner with the back camera (index 0)
    scanner.start(cameras[0]);
  } else {
    console.error('No cameras found.');
    alert('No cameras found.');
  }
}).catch(function(e) {
  console.error(e);
  alert(e);
});
