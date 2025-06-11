# Face-API.js Model Files

This directory should contain the required model files for emotion detection to work properly.

## Required Files

Download the following files from the [face-api.js GitHub repository](https://github.com/justadudewhohacks/face-api.js/tree/master/weights) and place them in this directory:

### Tiny Face Detector Model
- `tiny_face_detector_model-weights_manifest.json`
- `tiny_face_detector_model-shard1`

### Face Landmark 68 Model  
- `face_landmark_68_model-weights_manifest.json`
- `face_landmark_68_model-shard1`

### Face Expression Model
- `face_expression_model-weights_manifest.json` 
- `face_expression_model-shard1`

## Download Instructions

1. Visit: https://github.com/justadudewhohacks/face-api.js/tree/master/weights
2. Download each of the 6 files listed above
3. Place them directly in this `public/models` directory
4. Refresh your application

Once these files are in place, the emotion detection feature will work properly.