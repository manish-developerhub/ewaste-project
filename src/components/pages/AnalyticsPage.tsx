import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle, Loader, Calendar, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface BinAnalytic {
  _id: string;
  binLocationId?: string;
  currentFillPercentage?: number;
  predictedFillDate?: Date;
  collectionSchedule?: string;
  lastCollectionDate?: Date;
  averageFillRate?: number;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<BinAnalytic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBin, setSelectedBin] = useState<BinAnalytic | null>(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll('binanalytics');
      setAnalytics(result.items || []);
    } catch (err) {
      console.error('Failed to load analytics:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getDaysUntilFull = (predictedDate?: Date) => {
    if (!predictedDate) return 0;
    const now = new Date();
    const predicted = new Date(predictedDate);
    const diff = predicted.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getUrgencyLevel = (fillPercentage?: number) => {
    if (!fillPercentage) return 'low';
    if (fillPercentage >= 80) return 'critical';
    if (fillPercentage >= 60) return 'high';
    if (fillPercentage >= 40) return 'medium';
    return 'low';
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  const getProgressColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      default:
        return 'bg-green-500';
    }
  };

  // Mock data for charts
  const fillTrendData = [
    { day: 'Mon', percentage: 20 },
    { day: 'Tue', percentage: 28 },
    { day: 'Wed', percentage: 35 },
    { day: 'Thu', percentage: 42 },
    { day: 'Fri', percentage: 55 },
    { day: 'Sat', percentage: 68 },
    { day: 'Sun', percentage: 75 },
  ];

  const collectionData = [
    { location: 'Zone A', collections: 12, avgFill: 65 },
    { location: 'Zone B', collections: 15, avgFill: 72 },
    { location: 'Zone C', collections: 10, avgFill: 58 },
    { location: 'Zone D', collections: 14, avgFill: 68 },
  ];

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
              Predictive Analytics
            </h1>
            <p className="font-paragraph text-lg text-primary-foreground/90">
              Monitor bin fill times and optimize collection schedules with AI-powered predictions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="w-full bg-backgrounddark py-12 border-b border-secondary/10">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                label: 'Total Bins',
                value: analytics.length,
                icon: Zap,
                color: 'text-primary',
              },
              {
                label: 'Avg Fill Rate',
                value: `${Math.round(analytics.reduce((sum, a) => sum + (a.averageFillRate || 0), 0) / (analytics.length || 1))}%`,
                icon: TrendingUp,
                color: 'text-accentbluelight',
              },
              {
                label: 'Critical Bins',
                value: analytics.filter((a) => getUrgencyLevel(a.currentFillPercentage) === 'critical').length,
                icon: AlertCircle,
                color: 'text-red-500',
              },
              {
                label: 'Collections This Week',
                value: '24',
                icon: Calendar,
                color: 'text-green-500',
              },
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-background border-secondary/10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-paragraph text-sm text-secondary-foreground/60">
                      {metric.label}
                    </p>
                    <metric.icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <p className="font-heading text-3xl text-secondary-foreground">
                    {metric.value}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="w-full bg-background py-16 border-b border-secondary/10">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <h2 className="font-heading text-3xl text-secondary-foreground mb-8">
            Trends & Insights
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Fill Trend Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-backgrounddark border-secondary/10 p-6">
                <h3 className="font-heading text-xl text-secondary-foreground mb-6">
                  Weekly Fill Trend
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={fillTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="day" stroke="#999" />
                    <YAxis stroke="#999" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #333',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="percentage"
                      stroke="#5C5CF6"
                      strokeWidth={2}
                      dot={{ fill: '#5C5CF6', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* Collection Data Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-backgrounddark border-secondary/10 p-6">
                <h3 className="font-heading text-xl text-secondary-foreground mb-6">
                  Collections by Zone
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={collectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="location" stroke="#999" />
                    <YAxis stroke="#999" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #333',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Legend />
                    <Bar dataKey="collections" fill="#5C5CF6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bins List */}
      <section className="w-full bg-background py-16">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <h2 className="font-heading text-3xl text-secondary-foreground mb-8">
            Bin Status Overview
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : analytics.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="font-paragraph text-secondary-foreground/60">
                No bin analytics data available yet
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {analytics.map((bin, index) => {
                const urgency = getUrgencyLevel(bin.currentFillPercentage);
                const daysUntilFull = getDaysUntilFull(bin.predictedFillDate);

                return (
                  <motion.div
                    key={bin._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className="bg-backgrounddark border-secondary/10 p-6 hover:border-primary/30 transition-colors cursor-pointer"
                      onClick={() => setSelectedBin(bin)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-heading text-lg text-secondary-foreground">
                            {bin.binLocationId}
                          </h3>
                          <p className="font-paragraph text-sm text-secondary-foreground/60">
                            Last collected:{' '}
                            {bin.lastCollectionDate
                              ? new Date(bin.lastCollectionDate).toLocaleDateString()
                              : 'N/A'}
                          </p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-paragraph font-semibold border ${getUrgencyColor(
                            urgency
                          )}`}
                        >
                          {urgency.toUpperCase()}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-paragraph text-sm text-secondary-foreground/60">
                            Fill Level
                          </span>
                          <span className="font-heading text-sm text-secondary-foreground">
                            {bin.currentFillPercentage || 0}%
                          </span>
                        </div>
                        <Progress
                          value={bin.currentFillPercentage || 0}
                          className="h-2"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-secondary/10">
                        <div>
                          <p className="font-paragraph text-xs text-secondary-foreground/60 mb-1">
                            Avg Fill Rate
                          </p>
                          <p className="font-heading text-lg text-primary">
                            {bin.averageFillRate || 0}%/day
                          </p>
                        </div>
                        <div>
                          <p className="font-paragraph text-xs text-secondary-foreground/60 mb-1">
                            Days Until Full
                          </p>
                          <p className="font-heading text-lg text-accentbluelight">
                            {daysUntilFull}
                          </p>
                        </div>
                        <div>
                          <p className="font-paragraph text-xs text-secondary-foreground/60 mb-1">
                            Schedule
                          </p>
                          <p className="font-heading text-lg text-secondary-foreground">
                            {bin.collectionSchedule || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Bin Details Modal */}
      {selectedBin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedBin(null)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-backgrounddark rounded-lg max-w-2xl w-full"
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <h2 className="font-heading text-3xl text-secondary-foreground">
                  {selectedBin.binLocationId}
                </h2>
                <button
                  onClick={() => setSelectedBin(null)}
                  className="text-secondary-foreground/60 hover:text-secondary-foreground"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Current Status */}
                <div>
                  <p className="font-paragraph text-sm text-secondary-foreground/60 mb-2">
                    Current Fill Level
                  </p>
                  <Progress
                    value={selectedBin.currentFillPercentage || 0}
                    className="h-3"
                  />
                  <p className="font-heading text-2xl text-secondary-foreground mt-2">
                    {selectedBin.currentFillPercentage || 0}%
                  </p>
                </div>

                {/* Predictions */}
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-secondary/10">
                  <div>
                    <p className="font-paragraph text-xs text-secondary-foreground/60 mb-1">
                      Predicted Full Date
                    </p>
                    <p className="font-heading text-lg text-secondary-foreground">
                      {selectedBin.predictedFillDate
                        ? new Date(selectedBin.predictedFillDate).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="font-paragraph text-xs text-secondary-foreground/60 mb-1">
                      Average Fill Rate
                    </p>
                    <p className="font-heading text-lg text-primary">
                      {selectedBin.averageFillRate || 0}% per day
                    </p>
                  </div>
                </div>

                {/* Collection Info */}
                <div>
                  <p className="font-paragraph text-xs text-secondary-foreground/60 mb-2">
                    Collection Schedule
                  </p>
                  <p className="font-heading text-lg text-secondary-foreground">
                    {selectedBin.collectionSchedule || 'Not specified'}
                  </p>
                </div>

                <div>
                  <p className="font-paragraph text-xs text-secondary-foreground/60 mb-2">
                    Last Collection
                  </p>
                  <p className="font-heading text-lg text-secondary-foreground">
                    {selectedBin.lastCollectionDate
                      ? new Date(selectedBin.lastCollectionDate).toLocaleDateString()
                      : 'Never'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
