import React, { useRef, useEffect } from 'react';
import jsQR from 'jsqr';
import styled from 'styled-components';
import { Button, Screen } from 'styles';
import type { AppCamera } from 'services/appCamera';

type ScanQROptions = {
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  onData: (data: string) => void;
};

const scanQR = (options: ScanQROptions) => {
  let done = false;
  const { video, canvas, context, onData } = options;
  if (video.readyState === video.HAVE_ENOUGH_DATA && canvas) {
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert',
    });
    if (code && code.data) {
      done = true;
      onData(code.data);
    }
  }

  if (!done) {
    requestAnimationFrame(() => scanQR(options));
  }
};

export type ScannerProps = {
  camera: AppCamera;
  onData: (data: string) => void;
  onCancel: () => void;
};

export const Scanner: React.FC<ScannerProps> = ({ camera, onData, onCancel }) => {
  const [error, setError] = React.useState('');
  const [ready, setReady] = React.useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (ready || !canvasRef.current) return;
    camera
      .getStream()
      .then((stream) => {
        contextRef.current = canvasRef.current!.getContext('2d');
        const video = document.createElement('video');
        video.srcObject = stream;
        video.setAttribute('playsinline', 'true');
        video.play();
        videoRef.current = video;
        requestAnimationFrame(() =>
          scanQR({
            video,
            canvas: canvasRef.current!,
            context: contextRef.current!,
            onData,
          }),
        );
        setReady(true);
      })
      .catch((error) => {
        // This is on purpose, no time for a proper error handling... suck it.
        // eslint-disable-next-line no-console
        console.error(error);
        setError(error.message || 'Unable to access the camera');
      });
  }, [canvasRef, ready, onData, camera]);

  return (
    <Screen>
      <Container>
        {error ? <Error>{error}</Error> : <Canvas ref={canvasRef} />}
        <Button color="secondary" large onClick={onCancel}>
          Cancel
        </Button>
      </Container>
    </Screen>
  );
};

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
