
document.getElementById('startBtn').addEventListener('click', async () => {
  try {
    const displayMediaOptions = {
      video: {
        cursor: "always" // or "motion", "never"
      },
      audio: false
    };

    // Request to capture the screen
    const screenStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);

    // Set the video element's source to the screen stream
    const videoElement = document.getElementById('screenVideo');
    videoElement.srcObject = screenStream;

    // Optional: Stop sharing if the screen stream ends
    screenStream.getVideoTracks()[0].addEventListener('ended', () => {
      console.log('Screen sharing stopped');
      videoElement.srcObject = null;
    });
  } catch (error) {
    console.error("Error capturing the screen:", error);
  }
});

