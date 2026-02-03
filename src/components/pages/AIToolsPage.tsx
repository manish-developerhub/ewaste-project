import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Mic, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CameraDetection from '@/components/CameraDetection';
import VoiceAssistant from '@/components/VoiceAssistant';

export default function AIToolsPage() {
  const [activeTab, setActiveTab] = useState('camera');

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-primary to-accentbluelight py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-heading text-5xl md:text-6xl text-primary-foreground mb-6">
              AI-Powered E-Waste Tools
            </h1>
            <p className="font-paragraph text-lg text-primary-foreground/90">
              Use advanced camera detection and voice commands to identify e-waste and navigate the app
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="w-full bg-background py-16 border-b border-secondary/10">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-backgrounddark p-8 rounded-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-2xl text-secondary-foreground">
                  Live Camera Detection
                </h3>
              </div>
              <p className="font-paragraph text-secondary-foreground/80 mb-4">
                Point your camera at e-waste items to instantly identify them. Our AI analyzes the image and provides recycling information.
              </p>
              <ul className="space-y-2 font-paragraph text-sm text-secondary-foreground/70">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  Real-time object detection
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  Confidence scoring
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  Instant categorization
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-backgrounddark p-8 rounded-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accentbluelight/20 rounded-lg flex items-center justify-center">
                  <Mic className="w-6 h-6 text-accentbluelight" />
                </div>
                <h3 className="font-heading text-2xl text-secondary-foreground">
                  Voice Assistant
                </h3>
              </div>
              <p className="font-paragraph text-secondary-foreground/80 mb-4">
                Control the app hands-free with natural voice commands. Ask questions and get instant responses.
              </p>
              <ul className="space-y-2 font-paragraph text-sm text-secondary-foreground/70">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-accentbluelight" />
                  Natural language processing
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-accentbluelight" />
                  Voice feedback
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-accentbluelight" />
                  Smart command recognition
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="w-full bg-background py-16">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full md:w-fit grid-cols-2 mb-8 bg-backgrounddark">
              <TabsTrigger value="camera" className="font-paragraph">
                <Camera className="w-4 h-4 mr-2" />
                Camera Detection
              </TabsTrigger>
              <TabsTrigger value="voice" className="font-paragraph">
                <Mic className="w-4 h-4 mr-2" />
                Voice Assistant
              </TabsTrigger>
            </TabsList>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="camera" className="mt-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="font-heading text-2xl text-secondary-foreground mb-2">
                      Live Camera Detection
                    </h2>
                    <p className="font-paragraph text-secondary-foreground/70">
                      Enable your camera to detect and identify e-waste items in real-time. The system will analyze what it sees and provide instant feedback.
                    </p>
                  </div>
                  <CameraDetection />
                </div>
              </TabsContent>

              <TabsContent value="voice" className="mt-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="font-heading text-2xl text-secondary-foreground mb-2">
                      Voice-Controlled Assistant
                    </h2>
                    <p className="font-paragraph text-secondary-foreground/70">
                      Use voice commands to navigate the app and get information. Simply click "Start Listening" and speak naturally.
                    </p>
                  </div>
                  <VoiceAssistant />
                </div>
              </TabsContent>
            </motion.div>
          </Tabs>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full bg-backgrounddark py-16 border-t border-secondary/10">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <h2 className="font-heading text-3xl text-secondary-foreground mb-12 text-center">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: '1',
                title: 'Camera Detection',
                description: 'Point your camera at e-waste items to identify them instantly using AI-powered object detection.',
              },
              {
                number: '2',
                title: 'Voice Commands',
                description: 'Use natural voice commands to search locations, view guidelines, and check your rewards.',
              },
              {
                number: '3',
                title: 'Get Results',
                description: 'Receive instant feedback, recycling information, and nearby location recommendations.',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading text-2xl mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="font-heading text-xl text-secondary-foreground mb-2">
                  {step.title}
                </h3>
                <p className="font-paragraph text-secondary-foreground/70">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary py-16">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl text-primary-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="font-paragraph text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Try our AI tools above to identify e-waste and navigate the app with voice commands.
            </p>
            <Button
              onClick={() => setActiveTab('camera')}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-12 px-8 font-paragraph"
            >
              Start Using Tools
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
