import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Star, TrendingUp, Target, Zap } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Achievements } from '@/entities';
import { Image } from '@/components/ui/image';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RewardsPage() {
  const [achievements, setAchievements] = useState<Achievements[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const LIMIT = 50;

  // Mock user stats - in a real app, this would come from user data
  const userStats = {
    totalPoints: 2450,
    itemsRecycled: 47,
    achievementsUnlocked: 8,
    rank: 'Gold Recycler',
    nextMilestone: 3000,
    recyclingStreak: 12
  };

  useEffect(() => {
    loadAchievements();
  }, [skip]);

  const loadAchievements = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Achievements>('achievements', {}, { limit: LIMIT, skip });
      setAchievements(result.items);
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Failed to load achievements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const progressToNextMilestone = (userStats.totalPoints / userStats.nextMilestone) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-primary py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Trophy className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
            <h1 className="font-heading text-5xl md:text-6xl text-primary-foreground mb-6">
              Your Rewards Dashboard
            </h1>
            <p className="font-paragraph text-lg text-primary-foreground/90">
              Track your recycling journey and celebrate your environmental impact
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="w-full bg-background py-16">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Star, label: 'Total Points', value: userStats.totalPoints.toLocaleString(), color: 'text-primary' },
              { icon: Award, label: 'Items Recycled', value: userStats.itemsRecycled, color: 'text-primary' },
              { icon: Trophy, label: 'Achievements', value: userStats.achievementsUnlocked, color: 'text-primary' },
              { icon: Zap, label: 'Day Streak', value: userStats.recyclingStreak, color: 'text-primary' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-backgrounddark p-6 rounded-lg"
              >
                <stat.icon className={`w-10 h-10 ${stat.color} mb-4`} />
                <div className="font-heading text-3xl text-secondary-foreground mb-1">
                  {stat.value}
                </div>
                <div className="font-paragraph text-sm text-secondary-foreground/70">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress to Next Milestone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-primary p-8 rounded-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading text-2xl text-primary-foreground mb-1">
                  {userStats.rank}
                </h3>
                <p className="font-paragraph text-sm text-primary-foreground/80">
                  {userStats.nextMilestone - userStats.totalPoints} points to next milestone
                </p>
              </div>
              <Target className="w-12 h-12 text-primary-foreground/50" />
            </div>
            <Progress value={progressToNextMilestone} className="h-3" />
            <div className="flex justify-between mt-2">
              <span className="font-paragraph text-xs text-primary-foreground/70">
                {userStats.totalPoints} points
              </span>
              <span className="font-paragraph text-xs text-primary-foreground/70">
                {userStats.nextMilestone} points
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="w-full bg-backgrounddark py-16">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-secondary-foreground mb-4">
              Available Achievements
            </h2>
            <p className="font-paragraph text-lg text-secondary-foreground/80 max-w-2xl mx-auto">
              Unlock badges and earn points by reaching recycling milestones
            </p>
          </motion.div>

          <div className="min-h-[400px]">
            {isLoading ? null : achievements.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-background p-6 rounded-lg hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      {achievement.badgeImage && (
                        <div className="w-16 h-16 flex-shrink-0">
                          <Image
                            src={achievement.badgeImage}
                            alt={achievement.title || 'Achievement badge'}
                            className="w-full h-full object-contain"
                            width={64}
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-heading text-xl text-secondary mb-1">
                          {achievement.title || 'Untitled Achievement'}
                        </h3>
                        {achievement.achievementType && (
                          <Badge variant="outline" className="text-xs">
                            {achievement.achievementType}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {achievement.description && (
                      <p className="font-paragraph text-sm text-secondary/80 mb-4">
                        {achievement.description}
                      </p>
                    )}

                    {achievement.pointsValue !== undefined && (
                      <div className="flex items-center gap-2 pt-4 border-t border-secondary/10">
                        <Star className="w-4 h-4 text-primary" />
                        <span className="font-heading text-lg text-primary">
                          {achievement.pointsValue} points
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Award className="w-16 h-16 text-secondary-foreground/20 mx-auto mb-4" />
                <h3 className="font-heading text-2xl text-secondary-foreground mb-2">
                  No Achievements Available
                </h3>
                <p className="font-paragraph text-base text-secondary-foreground/60">
                  Check back later for new achievements
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="w-full bg-background py-16">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary p-12 rounded-lg text-center"
          >
            <TrendingUp className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
            <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground mb-4">
              Your Environmental Impact
            </h2>
            <p className="font-paragraph text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-8">
              By recycling {userStats.itemsRecycled} items, you've helped prevent harmful materials from entering landfills and contributed to a circular economy.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div>
                <div className="font-heading text-4xl text-primary-foreground mb-2">
                  {userStats.itemsRecycled}
                </div>
                <div className="font-paragraph text-sm text-primary-foreground/80">
                  Devices Recycled
                </div>
              </div>
              <div>
                <div className="font-heading text-4xl text-primary-foreground mb-2">
                  {(userStats.itemsRecycled * 2.3).toFixed(1)}kg
                </div>
                <div className="font-paragraph text-sm text-primary-foreground/80">
                  E-Waste Diverted
                </div>
              </div>
              <div>
                <div className="font-heading text-4xl text-primary-foreground mb-2">
                  {(userStats.itemsRecycled * 0.8).toFixed(0)}%
                </div>
                <div className="font-paragraph text-sm text-primary-foreground/80">
                  Materials Recovered
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
