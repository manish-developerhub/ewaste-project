import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Volume2, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface VoiceCommand {
  command: string;
  description: string;
}

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const commands: VoiceCommand[] = [
    { command: 'find locations', description: 'Find nearby recycling locations' },
    { command: 'show guidelines', description: 'Display e-waste guidelines' },
    { command: 'check rewards', description: 'View your rewards' },
    { command: 'schedule appointment', description: 'Book a disposal appointment' },
    { command: 'show challenges', description: 'View community challenges' },
    { command: 'check analytics', description: 'View bin analytics' },
    { command: 'help', description: 'Get assistance' },
  ];

  useEffect(() => {
    // Initialize Speech Recognition
    const SpeechRecognition = window.webkitSpeechRecognition || (window as any).SpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setError(null);
        setTranscript('');
      };

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setTranscript(transcript);
            processCommand(transcript);
          } else {
            interimTranscript += transcript;
          }
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        setError(`Error: ${event.error}`);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      setError('Speech Recognition not supported in this browser');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.abort();
      setIsListening(false);
    }
  };

  const processCommand = (text: string) => {
    setIsProcessing(true);
    const lowerText = text.toLowerCase();

    let responseText = '';

    if (lowerText.includes('location')) {
      responseText = 'Finding nearby recycling locations for you.';
    } else if (lowerText.includes('guideline') || lowerText.includes('guide')) {
      responseText = 'Showing e-waste guidelines and disposal instructions.';
    } else if (lowerText.includes('reward')) {
      responseText = 'Displaying your current rewards and achievements.';
    } else if (lowerText.includes('schedule') || lowerText.includes('appointment')) {
      responseText = 'Opening the scheduling system to book your disposal appointment.';
    } else if (lowerText.includes('challenge')) {
      responseText = 'Showing community challenges and recycling competitions.';
    } else if (lowerText.includes('analytics') || lowerText.includes('bin')) {
      responseText = 'Displaying predictive analytics for bin fill times and collection schedules.';
    } else if (lowerText.includes('help')) {
      responseText = 'I can help you find locations, view guidelines, check rewards, schedule appointments, view challenges, and check analytics. Just ask!';
    } else {
      responseText = `I heard: "${text}". Try asking about locations, guidelines, rewards, scheduling, challenges, or analytics.`;
    }

    setResponse(responseText);
    speakResponse(responseText);
    setIsProcessing(false);
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      synthRef.current = new SpeechSynthesisUtterance(text);
      synthRef.current.rate = 1;
      synthRef.current.pitch = 1;
      synthRef.current.volume = 1;

      window.speechSynthesis.speak(synthRef.current);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-backgrounddark rounded-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-heading text-2xl text-secondary-foreground mb-2">
            Voice Assistant
          </h2>
          <p className="font-paragraph text-secondary-foreground/60">
            Speak naturally to control the app
          </p>
        </div>

        {/* Microphone Status */}
        <motion.div
          animate={isListening ? { scale: [1, 1.05, 1] } : {}}
          transition={isListening ? { duration: 0.6, repeat: Infinity } : {}}
          className="flex justify-center mb-8"
        >
          <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
            isListening ? 'bg-primary/20 border-2 border-primary' : 'bg-secondary/10 border-2 border-secondary/20'
          }`}>
            {isListening ? (
              <Mic className="w-12 h-12 text-primary animate-pulse" />
            ) : (
              <MicOff className="w-12 h-12 text-secondary/40" />
            )}
          </div>
        </motion.div>

        {/* Transcript */}
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6"
          >
            <p className="font-paragraph text-sm text-secondary-foreground/60 mb-1">
              You said:
            </p>
            <p className="font-heading text-lg text-primary">
              "{transcript}"
            </p>
          </motion.div>
        )}

        {/* Response */}
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-accentbluelight/10 border border-accentbluelight/30 rounded-lg p-4 mb-6"
          >
            <div className="flex items-start gap-3">
              <Volume2 className="w-5 h-5 text-accentbluelight mt-1 flex-shrink-0" />
              <div>
                <p className="font-paragraph text-sm text-secondary-foreground/60 mb-1">
                  Assistant:
                </p>
                <p className="font-heading text-lg text-accentbluelight">
                  {response}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-6"
          >
            <p className="font-paragraph text-sm text-destructive">
              {error}
            </p>
          </motion.div>
        )}

        {/* Controls */}
        <div className="flex gap-4 mb-8 justify-center">
          {!isListening ? (
            <Button
              onClick={startListening}
              disabled={isProcessing}
              className="bg-primary text-primary-foreground hover:bg-accentbluelight h-12 px-8 font-paragraph flex items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  Start Listening
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={stopListening}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 h-12 px-8 font-paragraph flex items-center gap-2"
            >
              <MicOff className="w-4 h-4" />
              Stop Listening
            </Button>
          )}
        </div>

        {/* Commands List */}
        <div className="border-t border-secondary/10 pt-8">
          <h3 className="font-heading text-lg text-secondary-foreground mb-4">
            Try These Commands
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {commands.map((cmd, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-secondary/5 border border-secondary/10 rounded-lg p-4 hover:border-primary/30 transition-colors cursor-pointer"
                onClick={() => {
                  setTranscript(cmd.command);
                  processCommand(cmd.command);
                }}
              >
                <p className="font-heading text-sm text-primary mb-1">
                  "{cmd.command}"
                </p>
                <p className="font-paragraph text-xs text-secondary-foreground/60">
                  {cmd.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
