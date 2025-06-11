import React, { useRef, useEffect, useState } from 'react';
import { Camera, Play, Pause, RotateCcw, AlertCircle, Loader2, Download } from 'lucide-react';
import * as faceapi from 'face-api.js';

interface EmotionResult {
  emotion: string;
  confidence: number;
}

const EmotionDetection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [modelError, setModelError] = useState(false);
  const detectionInterval = useRef<NodeJS.Timeout | null>(null);

  // Load face-api models
  useEffect(() => {
    const loadModels = async () => {
      setIsLoading(true);
      setModelError(false);
      try {
        // Try to load models from the public/models directory
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]);
        setIsModelLoaded(true);
        setError(null);
      } catch (err) {
        console.error('Error loading models:', err);
        setModelError(true);
        setError('AI models not found. Please follow the setup instructions below to enable emotion detection.');
      } finally {
        setIsLoading(false);
      }
    };

    loadModels();
  }, []);

  const startCamera = async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please ensure you have granted camera permissions and try again.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    stopDetection();
  };

  const startDetection = () => {
    if (!isModelLoaded || !videoRef.current) return;

    setIsDetecting(true);
    
    detectionInterval.current = setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();

        // Clear previous drawings
        const canvas = canvasRef.current;
        const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight };
        faceapi.matchDimensions(canvas, displaySize);
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        if (detections.length > 0) {
          // Get the first face's emotions
          const expressions = detections[0].expressions;
          const maxExpression = Object.entries(expressions).reduce((max, [emotion, confidence]) => 
            confidence > max.confidence ? { emotion, confidence } : max
          , { emotion: 'neutral', confidence: 0 });

          setCurrentEmotion(maxExpression);

          // Draw face detection box
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        } else {
          setCurrentEmotion(null);
        }
      }
    }, 200); // Detection every 200ms
  };

  const stopDetection = () => {
    setIsDetecting(false);
    if (detectionInterval.current) {
      clearInterval(detectionInterval.current);
      detectionInterval.current = null;
    }
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
    setCurrentEmotion(null);
  };

  const resetDetection = () => {
    stopCamera();
    setCurrentEmotion(null);
    if (!modelError) {
      setError(null);
    }
  };

  const retryLoadModels = () => {
    window.location.reload();
  };

  const getEmotionColor = (emotion: string) => {
    const colors: { [key: string]: string } = {
      happy: 'text-yellow-400',
      sad: 'text-blue-400',
      angry: 'text-red-400',
      surprised: 'text-purple-400',
      fearful: 'text-gray-400',
      disgusted: 'text-green-400',
      neutral: 'text-cyan-400'
    };
    return colors[emotion] || 'text-white';
  };

  const getEmotionEmoji = (emotion: string) => {
    const emojis: { [key: string]: string } = {
      happy: '😊',
      sad: '😢',
      angry: '😠',
      surprised: '😲',
      fearful: '😨',
      disgusted: '🤢',
      neutral: '😐'
    };
    return emojis[emotion] || '🤔';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Emotion Detection
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Experience real-time AI-powered emotion detection. Allow camera access and start detecting!
        </p>
      </section>

      {/* Loading State */}
      {isLoading && (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center">
          <Loader2 className="h-12 w-12 text-cyan-400 mx-auto mb-4 animate-spin" />
          <h3 className="text-xl font-semibold mb-2">Loading AI Models</h3>
          <p className="text-white/70">Please wait while we prepare the emotion detection system...</p>
        </div>
      )}

      {/* Model Setup Instructions */}
      {modelError && (
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6">
          <div className="flex items-start mb-4">
            <Download className="h-6 w-6 text-orange-400 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-orange-400 mb-2">Setup Required</h3>
              <p className="text-white/80 mb-4">
                To enable emotion detection, you need to download the required AI model files:
              </p>
              <div className="bg-black/20 rounded-lg p-4 mb-4">
                <h4 className="font-semibold mb-2 text-white">Setup Instructions:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-white/70">
                  <li>Create a <code className="bg-white/10 px-2 py-1 rounded text-cyan-400">public/models</code> folder in your project</li>
                  <li>Download the face-api.js model files from the official repository</li>
                  <li>Place these files in the <code className="bg-white/10 px-2 py-1 rounded text-cyan-400">public/models</code> directory:
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li><code className="text-cyan-400">tiny_face_detector_model-weights_manifest.json</code></li>
                      <li><code className="text-cyan-400">tiny_face_detector_model-shard1</code></li>
                      <li><code className="text-cyan-400">face_landmark_68_model-weights_manifest.json</code></li>
                      <li><code className="text-cyan-400">face_landmark_68_model-shard1</code></li>
                      <li><code className="text-cyan-400">face_expression_model-weights_manifest.json</code></li>
                      <li><code className="text-cyan-400">face_expression_model-shard1</code></li>
                    </ul>
                  </li>
                  <li>Refresh this page to load the models</li>
                </ol>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/justadudewhohacks/face-api.js/tree/master/weights"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 text-sm"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Models</span>
                </a>
                <button
                  onClick={retryLoadModels}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 border border-white/20 text-sm"
                >
                  Retry Loading
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !modelError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
          <div className="flex items-center mb-3">
            <AlertCircle className="h-6 w-6 text-red-400 mr-3" />
            <h3 className="text-lg font-semibold text-red-400">Error</h3>
          </div>
          <p className="text-white/80">{error}</p>
        </div>
      )}

      {/* Main Detection Interface */}
      {isModelLoaded && !isLoading && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video and Canvas Container */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="relative aspect-video bg-black/20 rounded-xl overflow-hidden mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  onLoadedMetadata={() => {
                    if (canvasRef.current && videoRef.current) {
                      canvasRef.current.width = videoRef.current.videoWidth;
                      canvasRef.current.height = videoRef.current.videoHeight;
                    }
                  }}
                />
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-full"
                />
                {!stream && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="text-center">
                      <Camera className="h-16 w-16 text-white/50 mx-auto mb-4" />
                      <p className="text-white/70">Camera not started</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Controls */}
              <div className="flex flex-wrap gap-3 justify-center">
                {!stream ? (
                  <button
                    onClick={startCamera}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Camera className="h-5 w-5" />
                    <span>Start Camera</span>
                  </button>
                ) : (
                  <>
                    {!isDetecting ? (
                      <button
                        onClick={startDetection}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Play className="h-5 w-5" />
                        <span>Start Detection</span>
                      </button>
                    ) : (
                      <button
                        onClick={stopDetection}
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Pause className="h-5 w-5" />
                        <span>Stop Detection</span>
                      </button>
                    )}
                    <button
                      onClick={resetDetection}
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 border border-white/20 flex items-center space-x-2"
                    >
                      <RotateCcw className="h-5 w-5" />
                      <span>Reset</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Current Emotion */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-center">Detected Emotion</h3>
              {currentEmotion ? (
                <div className="text-center">
                  <div className="text-6xl mb-4">
                    {getEmotionEmoji(currentEmotion.emotion)}
                  </div>
                  <h4 className={`text-2xl font-bold capitalize mb-2 ${getEmotionColor(currentEmotion.emotion)}`}>
                    {currentEmotion.emotion}
                  </h4>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-sm text-white/70 mb-2">Confidence Level</p>
                    <div className="bg-black/20 rounded-full h-3 mb-1">
                      <div 
                        className="bg-gradient-to-r from-cyan-400 to-blue-400 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${currentEmotion.confidence * 100}%` }}
                      />
                    </div>
                    <p className="text-lg font-semibold">
                      {(currentEmotion.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-white/50">
                  {isDetecting ? (
                    <div>
                      <Loader2 className="h-8 w-8 mx-auto mb-3 animate-spin" />
                      <p>Looking for faces...</p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-4xl mb-3">🤔</div>
                      <p>No emotion detected</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-6">
              <h4 className="font-semibold text-cyan-400 mb-3">Tips for Best Results</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Ensure good lighting on your face</li>
                <li>• Look directly at the camera</li>
                <li>• Keep your face within the video frame</li>
                <li>• Try different facial expressions</li>
                <li>• Avoid wearing sunglasses or face coverings</li>
              </ul>
            </div>

            {/* Status */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/70">Status:</span>
                <span className={isDetecting ? 'text-green-400' : 'text-white/50'}>
                  {isDetecting ? 'Detecting' : 'Idle'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-white/70">Camera:</span>
                <span className={stream ? 'text-green-400' : 'text-white/50'}>
                  {stream ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-white/70">Models:</span>
                <span className={isModelLoaded ? 'text-green-400' : 'text-red-400'}>
                  {isModelLoaded ? 'Loaded' : 'Not Available'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmotionDetection;