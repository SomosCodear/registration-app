import jsQR from 'jsqr';
import './index.scss';

class App {
  constructor() {
    this._screens = Array.from(document.querySelectorAll('.screen')).map((element) => {
      const name = element.dataset.screen || element.id;
      return {
        name,
        element,
      };
    });

    this._canvasElement = document.getElementById('canvas');
    this._video = document.createElement('video');
    this._scanning = false;

    document.querySelector('#scanBtn').addEventListener('click', () => {
      this._loadScanner();
    });

    this._showScreen('action');

    this._detectQR = this._detectQR.bind(this);
  }

  _showScreen(name) {
    this._screens.forEach((screen) => {
      // eslint-disable-next-line no-param-reassign
      screen.element.style.display = screen.name === name ?
        'block' :
        'none';
    });
  }

  _getScreenElement(name) {
    return this._screens.find((screen) => screen.name === name).element;
  }

  _loadScanner() {
    this._showScreen('scanner');

    navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      this._scanning = true;
      this.canvasContext = this._canvasElement.getContext('2d');
      this._video.srcObject = stream;
      this._video.setAttribute('playsinline', true);
      this._video.play();
      requestAnimationFrame(this._detectQR);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
  }

  _detectQR() {
    if (this._video.readyState === this._video.HAVE_ENOUGH_DATA) {
      this._canvasElement.height = this._video.videoHeight;
      this._canvasElement.width = this._video.videoWidth;
      this.canvasContext.drawImage(
        this._video,
        0,
        0,
        this._canvasElement.width,
        this._canvasElement.height,
      );
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this._canvasElement.width,
        this._canvasElement.height,
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });
      if (code && code.data) {
        this._showResults(code.data);
      }
    }

    if (this._scanning) {
      requestAnimationFrame(this._detectQR);
    }
  }

  _showResults(data) {
    this._scanning = false;
    const screen = this._getScreenElement('results');
    screen.innerHTML = data.split('\n').join('<br />');
    this._showScreen('results');
  }
}

// eslint-disable-next-line no-new
new App();
