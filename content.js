document.addEventListener('keydown', async (e) => {
  if (e.altKey && e.key.toLowerCase() === 'p') {
    e.preventDefault();
    hijackPiP();
  }
});

async function hijackPiP() {
  // Toggle: If a video is already floating, put it back.
  if (document.pictureInPictureElement) {
    await document.exitPictureInPicture();
    return;
  }

  let allVideos = [];

  // Pierce the Shadow DOM to find hidden video elements
  function findVideos(node) {
    const vids = node.querySelectorAll('video');
    vids.forEach(v => allVideos.push(v));

    const allChildren = node.querySelectorAll('*');
    allChildren.forEach(child => {
      if (child.shadowRoot) {
        findVideos(child.shadowRoot);
      }
    });
  }

  // Execute the search starting from the document root
  findVideos(document);

  if (allVideos.length === 0) {
    console.log('UPIPH: No video tags found in the DOM.');
    return;
  }

  let targetVideo = null;

  // Filter out paused videos to avoid grabbing background elements
  const playingVideos = allVideos.filter(v => !v.paused && v.readyState > 0);
  
  if (playingVideos.length > 0) {
    // Select the largest playing video by viewport area
    targetVideo = playingVideos.reduce((prev, current) => {
      const prevArea = prev.getBoundingClientRect().width * prev.getBoundingClientRect().height;
      const currentArea = current.getBoundingClientRect().width * current.getBoundingClientRect().height;
      return prevArea > currentArea ? prev : current;
    });
  } else {
    // Fallback: If nothing is playing, grab the largest video on screen
    targetVideo = allVideos.reduce((prev, current) => {
      const prevArea = prev.getBoundingClientRect().width * prev.getBoundingClientRect().height;
      const currentArea = current.getBoundingClientRect().width * current.getBoundingClientRect().height;
      return prevArea > currentArea ? prev : current;
    });
  }

  if (targetVideo) {
    try {
      // Strip website defense attributes before commanding the browser
      targetVideo.removeAttribute('disablePictureInPicture');
      await targetVideo.requestPictureInPicture();
    } catch (err) {
      console.error('UPIPH Failed:', err);
    }
  }
}