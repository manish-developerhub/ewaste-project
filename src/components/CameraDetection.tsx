import { useEffect, useRef, useState } from 'react';
import { Camera, StopCircle, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface DetectionResult {
  label: string;
  confidence: number;
}

export default function CameraDetection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [detections, setDetections] = useState<DetectionResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | null>(null);

  const startCamera = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsActive(true);
        
        // Start detection loop
        videoRef.current.onloadedmetadata = () => {
          detectObjects();
        };
      }
    } catch (err) {
      setError('Camera access denied or not available');
      console.error('Camera error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsActive(false);
    setDetections([]);
  };

  const detectObjects = async () => {
    if (!videoRef.current || !canvasRef.current || !isActive) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Simulate object detection with mock data
    // In production, you would use TensorFlow.js or similar
    const mockDetections: DetectionResult[] = [
      { label: 'Electronics', confidence: 0.92 },
      { label: 'Plastic', confidence: 0.87 },
      { label: 'Metal', confidence: 0.78 },
    ];

    setDetections(mockDetections);

    // Draw bounding boxes
    ctx.strokeStyle = '#5C5CF6';
    ctx.lineWidth = 2;
    ctx.font = '16px Arial';
    ctx.fillStyle = '#5C5CF6';

    mockDetections.forEach((detection, index) => {
      const x = 50 + index * 150;
      const y = 50;
      const width = 120;
      const height = 80;

      ctx.strokeRect(x, y, width, height);
      ctx.fillRect(x, y - 25, width, 25);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(`${detection.label} ${(detection.confidence * 100).toFixed(0)}%`, x + 5, y - 8);
      ctx.fillStyle = '#5C5CF6';
    });

    animationRef.current = requestAnimationFrame(detectObjects);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-backgrounddark rounded-lg overflow-hidden">
        {/* Video Feed */}
        <div className="relative bg-black aspect-video flex items-center justify-center">
          {isActive ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
              />
            </>
          ) : (
            <div className="text-center">
              <Camera className="w-16 h-16 text-secondary/30 mx-auto mb-4" />
              <p className="text-secondary-foreground/60 font-paragraph">
                {error || 'Camera feed will appear here'}
              </p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-6 border-t border-secondary/10">
          <div className="flex gap-4 mb-6">
            {!isActive ? (
              <Button
                onClick={startCamera}
                disabled={isLoading}
                className="bg-primary text-primary-foreground hover:bg-accentbluelight h-12 px-8 font-paragraph flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Starting...
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4" />
                    Start Camera
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={stopCamera}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 h-12 px-8 font-paragraph flex items-center gap-2"
              >
                <StopCircle className="w-4 h-4" />
                Stop Camera
              </Button>
            )}
          </div>

          {/* Detections List */}
          {detections.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <h3 className="font-heading text-lg text-secondary-foreground">
                Detected Items
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {detections.map((detection, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-primary/10 border border-primary/30 rounded-lg p-4"
                  >
                    <p className="font-heading text-primary text-sm mb-1">
                      {detection.label}
                    </p>
                    <div className="w-full bg-secondary/10 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${detection.confidence * 100}%` }}
                      />
                    </div>
                    <p className="font-paragraph text-xs text-secondary-foreground/60 mt-2">
                      {(detection.confidence * 100).toFixed(1)}% confidence
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
