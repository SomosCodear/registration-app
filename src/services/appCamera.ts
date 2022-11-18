export class AppCamera {
  private stream: MediaStream | null = null;

  async getStream() {
    if (this.stream) return this.stream;
    return this.askForStream();
  }

  private async askForStream() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
      },
    });

    this.stream = stream;
    return stream;
  }
}
