self.addEventListener('message', event => {
  const { code, version } = event.data;

  try {
    const markers = [{
      startLineNumber: 1,
      endLineNumber: 1,
      startColumn: 1,
      endColumn: 10,
      message: 'message!',
      severity: 2,
      source: 'babylonjs',
    }];

    self.postMessage({ markers, version });
  } catch (e) {
    console.error('marker.worker: ' + e);
    /* Ignore error */
  }
});