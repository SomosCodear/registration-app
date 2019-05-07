import React from 'react';
import PropTypes from 'prop-types';
import jsQR from 'jsqr';
import styled from 'styled-components';
import { Button, Screen } from '../styles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Canvas = styled.canvas`
  height: calc(100vw - 2.5rem);
  width: calc(100vw - 2.5rem);
  margin-bottom: 5.375rem;
`;

const Error = styled.p`
  color: ${({ theme }) => theme.palette.generics.black};
  margin: 0;
  padding: 1.25rem 0;
  font-size: 16px;
`;

export class Scanner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };

    this._refs = {};

    this._saveCanvasRef = this._saveCanvasRef.bind(this);
    this._startScanning = this._startScanning.bind(this);
    this._scanQR = this._scanQR.bind(this);
  }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(this._startScanning)
    .catch((error) => {
      this.setState(() => ({
        error: error.message || 'Unable to access the camera',
      }));
    });
  }

  componentWillUnmount() {
    const [track] = this._refs.video.srcObject.getTracks();
    if (track) {
      track.stop();
    }
  }

  render() {
    const { onCancel } = this.props;
    const { error } = this.state;
    return (
      <Screen>
        <Container>
          {
            error ?
              <Error>{error}</Error> :
              <Canvas ref={this._saveCanvasRef} />
          }
          <Button color="secondary" large onClick={onCancel}>Cancel</Button>
        </Container>
      </Screen>
    );
  }

  _saveCanvasRef(ref) {
    this._refs.canvasElement = ref;
  }

  _startScanning(stream) {
    this._refs.canvasContext = this._refs.canvasElement.getContext('2d');
    const video = document.createElement('video');
    video.srcObject = stream;
    video.setAttribute('playsinline', true);
    video.play();
    this._refs.video = video;
    requestAnimationFrame(this._scanQR);
  }

  _scanQR() {
    let done = false;
    const { video, canvasElement, canvasContext } = this._refs;
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;
      canvasContext.drawImage(
        video,
        0,
        0,
        canvasElement.width,
        canvasElement.height,
      );
      const imageData = canvasContext.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height,
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });
      if (code && code.data) {
        done = true;
        const { onData } = this.props;
        onData(code.data);
      }
    }

    if (!done) {
      requestAnimationFrame(this._scanQR);
    }
  }
}

Scanner.propTypes = {
  onData: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
