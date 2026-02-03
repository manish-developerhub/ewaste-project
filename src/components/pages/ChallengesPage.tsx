import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Target, Zap, Loader, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';

interface Challenge {
  _id: string;
  challengeName?: string;
  challengeDescription?: string;
  startDate?: Date;
  endDate?: Date;
  targetPoints?: number;
  currentPoints?: number;
  participantCount?: number;
  rewardPoints?: number;
  challengeImage?: string;
}

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  useEffect(() => {
    loadChallenges();
  }, []);

  const loadChallenges = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll('communitychallenges');
      setChallenges(result.items || []);
    } catch (err) {
      console.error('Failed to load challenges:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getProgressPercentage = (current?: number, target?: number) => {
    if (!target || !current) return 0;
    return Math.min((current / target) * 100, 100);
  };

  const isActive = (challenge: Challenge) => {
    if (!challenge.startDate || !challenge.endDate) return false;
    const now = new Date();
    return new Date(challenge.startDate) <= now && now <= new Date(challenge.endDate);
  };

  const getDaysRemaining = (endDate?: Date) => {
    if (!endDate) return 0;
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

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
              Community Challenges
            </h1>
            <p className="font-paragraph text-lg text-primary-foreground/90">
              Join neighborhood recycling competitions and earn rewards while making a difference
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full bg-backgrounddark py-12 border-b border-secondary/10">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Trophy, label: 'Active Challenges', value: challenges.filter(isActive).length },
              { icon: Users, label: 'Total Participants', value: challenges.reduce((sum, c) => sum + (c.participantCount || 0), 0) },
              { icon: Award, label: 'Total Rewards', value: challenges.reduce((sum, c) => sum + (c.rewardPoints || 0), 0) },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="font-paragraph text-secondary-foreground/60 text-sm mb-1">
                  {stat.label}
                </p>
                <p className="font-heading text-3xl text-secondary-foreground">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges Grid */}
      <section className="w-full bg-background py-16">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <h2 className="font-heading text-3xl text-secondary-foreground mb-12">
            Current Challenges
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : challenges.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="font-paragraph text-secondary-foreground/60">
                No challenges available at the moment. Check back soon!
              </p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={challenge._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedChallenge(challenge)}
                  className="cursor-pointer"
                >
                  <Card className="bg-backgrounddark border-secondary/10 overflow-hidden hover:border-primary/30 transition-all hover:shadow-lg h-full">
                    {/* Challenge Image */}
                    {challenge.challengeImage && (
                      <div className="relative h-48 overflow-hidden bg-secondary/5">
                        <Image
                          src={challenge.challengeImage}
                          alt={challenge.challengeName || 'Challenge'}
                          className="w-full h-full object-cover"
                          width={400}
                        />
                        {isActive(challenge) && (
                          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-paragraph font-semibold">
                            Active
                          </div>
                        )}
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="font-heading text-xl text-secondary-foreground mb-2">
                        {challenge.challengeName}
                      </h3>

                      <p className="font-paragraph text-sm text-secondary-foreground/70 mb-4">
                        {challenge.challengeDescription}
                      </p>

                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-paragraph text-xs text-secondary-foreground/60">
                            Progress
                          </span>
                          <span className="font-heading text-sm text-primary">
                            {challenge.currentPoints || 0} / {challenge.targetPoints || 0}
                          </span>
                        </div>
                        <Progress
                          value={getProgressPercentage(
                            challenge.currentPoints,
                            challenge.targetPoints
                          )}
                          className="h-2"
                        />
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-t border-b border-secondary/10">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="font-heading text-lg text-secondary-foreground">
                              {challenge.participantCount || 0}
                            </span>
                          </div>
                          <p className="font-paragraph text-xs text-secondary-foreground/60">
                            Participants
                          </p>
                        </div>

                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Zap className="w-4 h-4 text-accentbluelight" />
                            <span className="font-heading text-lg text-secondary-foreground">
                              {challenge.rewardPoints || 0}
                            </span>
                          </div>
                          <p className="font-paragraph text-xs text-secondary-foreground/60">
                            Reward Points
                          </p>
                        </div>

                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Target className="w-4 h-4 text-primary" />
                            <span className="font-heading text-lg text-secondary-foreground">
                              {getDaysRemaining(challenge.endDate)}
                            </span>
                          </div>
                          <p className="font-paragraph text-xs text-secondary-foreground/60">
                            Days Left
                          </p>
                        </div>
                      </div>

                      <Button className="w-full bg-primary text-primary-foreground hover:bg-accentbluelight h-10 font-paragraph">
                        Join Challenge
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Challenge Details Modal */}
      {selectedChallenge && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedChallenge(null)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-backgrounddark rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <h2 className="font-heading text-3xl text-secondary-foreground">
                  {selectedChallenge.challengeName}
                </h2>
                <button
                  onClick={() => setSelectedChallenge(null)}
                  className="text-secondary-foreground/60 hover:text-secondary-foreground"
                >
                  ✕
                </button>
              </div>

              {selectedChallenge.challengeImage && (
                <div className="mb-6 h-64 rounded-lg overflow-hidden">
                  <Image
                    src={selectedChallenge.challengeImage}
                    alt={selectedChallenge.challengeName || 'Challenge'}
                    className="w-full h-full object-cover"
                    width={600}
                  />
                </div>
              )}

              <p className="font-paragraph text-secondary-foreground/80 mb-6">
                {selectedChallenge.challengeDescription}
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="font-paragraph text-sm text-secondary-foreground/60 mb-2">
                    Challenge Progress
                  </p>
                  <Progress
                    value={getProgressPercentage(
                      selectedChallenge.currentPoints,
                      selectedChallenge.targetPoints
                    )}
                    className="h-3"
                  />
                  <p className="font-paragraph text-xs text-secondary-foreground/60 mt-2">
                    {selectedChallenge.currentPoints || 0} of{' '}
                    {selectedChallenge.targetPoints || 0} points
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-t border-secondary/10">
                  <div>
                    <p className="font-paragraph text-xs text-secondary-foreground/60 mb-1">
                      Participants
                    </p>
                    <p className="font-heading text-2xl text-secondary-foreground">
                      {selectedChallenge.participantCount || 0}
                    </p>
                  </div>
                  <div>
                    <p className="font-paragraph text-xs text-secondary-foreground/60 mb-1">
                      Reward Points
                    </p>
                    <p className="font-heading text-2xl text-primary">
                      {selectedChallenge.rewardPoints || 0}
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-primary text-primary-foreground hover:bg-accentbluelight h-12 font-paragraph">
                Join This Challenge
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
