// Utilizando la API key proporcionada
const apiKey = 'AIzaSyCPtIwDtYMbf9_H7vKxfXE0-fXvX5MwvV8';
const channelId = 'UCwPqKWgrxA2CZxJ3u5XGkrg'; // ID del canal

const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=9`;

function createVideoGallery(videos) {
  const videoGrid = document.getElementById('videoGrid');

  videos.forEach(video => {
    const videoId = video.id.videoId;

    const videoDiv = document.createElement('div');
    videoDiv.classList.add('video');

    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}`);
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('frameborder', '0');

    videoDiv.appendChild(iframe);
    videoGrid.appendChild(videoDiv);
  });

  setInterval(() => {
    videoGrid.style.transform = `translateX(-${videoGrid.firstElementChild.offsetWidth + 15}px)`;
    videoGrid.appendChild(videoGrid.firstElementChild);
  }, 3000);
}

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const videos = data.items;
    createVideoGallery(videos);
  })
  .catch(error => console.error('Error al obtener datos del canal:', error));

document.addEventListener('DOMContentLoaded', () => {
  const videoGrid = document.getElementById('videoGrid');

  videoGrid.addEventListener('click', event => {
    const videoClicked = event.target.closest('.video');

    if (videoClicked) {
      event.preventDefault();
      const videoUrl = videoClicked.querySelector('iframe').src;
      window.open(videoUrl, '_blank', 'width=800,height=600');
    }
  });
});
