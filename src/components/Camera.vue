<template lang="pug">
  .section
    video(@play="onPlay", id="camera", width="270", height="150", preload, autoplay, loop, muted)/
    canvas(id="canvas", width="270", height="150")/
    input(id="photo", type="file", style="-webkit-app-region: no-drag; z-index: 99999999999;")/
    img(id="img", src="")/
</template>

<script>
  import * as faceapi from 'face-api.js'
  import * as fs from 'fs'

  export default {
    name: 'camera',
    mounted() {
      const videoEl = document.getElementById('camera');
      const photoEl = document.getElementById('photo');
      const imgEl = document.getElementById('img');
      navigator.mediaDevices.getUserMedia({ video: {} })
        .then((stream) => {
          videoEl.srcObject = stream
        })
        .catch((error) => {
          console.log('Error!', error);
        })

      faceapi.loadSsdMobilenetv1Model('https://github.com/assap-org/models/releases/download/1.0.0')
        .then(() => console.log('loaded ssd model!'))
        .catch((error) => console.error(error))

      faceapi.loadTinyFaceDetectorModel('https://github.com/assap-org/models/releases/download/1.0.0')
        .then(() => console.log('loaded tiny model!'))
        .catch((error) => console.error(error))
    },
    methods: {
      // Based on code from
      // https://github.com/justadudewhohacks/face-api.js/blob/master/examples/examples-browser/views/webcamFaceTracking.html
      onPlay() {
        const videoEl = document.getElementById('camera')
        const canvas = document.getElementById('canvas')
        const imgEl = document.getElementById('img')

        if(videoEl.paused || videoEl.ended)
          return setTimeout(() => this.onPlay())

        faceapi
          .detectSingleFace(imgEl)
          .withFaceLandmarks()
          .withFaceDescriptors()
          .then(userDetection => {
            if (userDetection.length > 0) {
              faceMatcher = new faceapi.FaceMatcher(userDetection)
              const labels = faceMatcher.labeledDescriptors.map(ld => ld.label)
              console.log('labels', labels);

              faceapi.detectAllFaces(videoEl)
                .then((detections) => {
                  canvas.width = videoEl.width
                  canvas.height = videoEl.height
                  const detectionsForSize = detections.map(det => det.forSize(videoEl.width, videoEl.height))
                  const boxesWithText = detectionsForSize.map(({ detection, descriptor }) => {
                    new faceapi.BoxWithText(
                      detection.box,
                      faceMatcher.findBestMatch(descriptor).toString()
                    )
                  })
                  faceapi.drawDetection(canvas, boxesWithText, { withScore: true })
                })
                .catch((error) => {
                  console.log('Error', error);
                })
            }
          })



      setTimeout(() => this.onPlay())
      }
    }
  }
</script>

<style lang="sass">
  video, canvas
    position: absolute
    margin: 0
    padding: 0
    top: 0
    left: 0
    width: 270px
    height: 150px
</style>
