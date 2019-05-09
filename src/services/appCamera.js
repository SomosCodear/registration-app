class AppCamera {
  _stream = null;

  getStream() {
    return this._stream ?
      Promise.resolve(this._stream) :
      this._askForStream();
  }

  _askForStream() {
    return navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
      },
    })
    .then((stream) => {
      this._stream = stream;
      return this._stream;
    });
  }
}

export { AppCamera };
