import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const playerOn = document.querySelector('#vimeo-player');
const player = new Vimeo(playerOn);

setPlayerTime();

player.on('timeupdate', throttle(saveTime, 1000));

function saveTime(time) {
  localStorage.setItem('videoplayer-current-time', time.seconds);
}

function setPlayerTime() {
  const timeCurrent = localStorage.getItem('videoplayer-current-time');

  if (timeCurrent) player.setCurrentTime(timeCurrent);
}

