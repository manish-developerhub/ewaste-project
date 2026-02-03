import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Star, AlertCircle, CheckCircle, Loader, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';

interface FeedbackItem {
  _id: string;
  feedbackType?: string;
  feedbackMessage?: string;
  rating?: number;
  userEmail?: string;
  submittedDate?: Date;
  status?: string;
  category?: string;
}

export default function FeedbackPage() {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [offlineMode, setOfflineMode] = useState(false);
  const [pendingFeedback, setPendingFeedback] = useState<FeedbackItem[]>([]);
  
  const [formData, setFormData] = useState({
    feedbackType: 'suggestion',
    feedbackMessage: '',
    rating: 5,
    userEmail: '',
    category: 'general',
  });

  useEffect(() => {
    loadFeedback();
    checkOnlineStatus();
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const checkOnlineStatus = () => {
    setOfflineMode(!navigator.onLine);
  };

  const handleOnline = () => {
    setOfflineMode(false);
    syncPendingFeedback();
  };

  const handleOffline = () => {
    setOfflineMode(true);
  };

  const loadFeedback = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll('feedback');
      setFeedbackList(result.items || []);
    } catch (err) {
      console.error('Failed to load feedback:', err);
      setError('Failed to load feedback');
    } finally {
      setIsLoading(false);
    }
  };

  const syncPendingFeedback = async () => {
    if (pendingFeedback.length === 0) return;

    try {
      for (const item of pendingFeedback) {
        await BaseCrudService.create('feedback', {
          _id: item._id,
          feedbackType: item.feedbackType,
          feedbackMessage: item.feedbackMessage,
          rating: item.rating,
          userEmail: item.userEmail,
          submittedDate: new Date(),
          status: 'new',
          category: item.category,
        });
      }
      setPendingFeedback([]);
      await loadFeedback();
      setSuccess('Pending feedback synced successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Failed to sync feedback:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.feedbackMessage.trim()) {
      setError('Please enter your feedback message');
      return;
    }

    if (!formData.userEmail.trim()) {
      setError('Please enter your email address');
      return;
    }

    try {
      setIsSubmitting(true);
      const newFeedback: FeedbackItem = {
        _id: crypto.randomUUID(),
        feedbackType: formData.feedbackType,
        feedbackMessage: formData.feedbackMessage,
        rating: formData.rating,
        userEmail: formData.userEmail,
        submittedDate: new Date(),
        status: 'new',
        category: formData.category,
      };

      if (offlineMode) {
        // Store locally for offline mode
        setPendingFeedback([...pendingFeedback, newFeedback]);
        setSuccess('Feedback saved locally. It will sync when you\'re back online!');
      } else {
        // Submit directly
        await BaseCrudService.create('feedback', newFeedback);
        setSuccess('Thank you for your feedback!');
        await loadFeedback();
      }

      // Reset form
      setFormData({
        feedbackType: 'suggestion',
        feedbackMessage: '',
        rating: 5,
        userEmail: '',
        category: 'general',
      });
      setShowForm(false);
    } catch (err) {
      console.error('Failed to submit feedback:', err);
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-secondary/20'
            }`}
          />
        ))}
      </div>
    );
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'new':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
              Share Your Feedback
            </h1>
            <p className="font-paragraph text-lg text-primary-foreground/90">
              Help us improve the recycling experience. Your feedback matters and helps us serve you better.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Offline Banner */}
      {offlineMode && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border-b border-yellow-200 px-8 md:px-16 py-4"
        >
          <div className="max-w-[100rem] mx-auto flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <p className="font-paragraph text-sm text-yellow-800">
              You're offline. Your feedback will be saved locally and synced when you're back online.
              {pendingFeedback.length > 0 && ` (${pendingFeedback.length} pending)`}
            </p>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <section className="w-full bg-background py-16">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          {/* CTA Button */}
          <div className="flex justify-end mb-8">
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-primary text-primary-foreground hover:bg-accentbluelight h-11 px-6 font-paragraph"
            >
              {showForm ? 'Cancel' : 'Submit Feedback'}
            </Button>
          </div>

          {/* Feedback Form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-backgrounddark rounded-lg p-8 mb-12"
            >
              <h2 className="font-heading text-2xl text-secondary-foreground mb-6">
                Tell Us What You Think
              </h2>

              {error && (
                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-6">
                  <p className="font-paragraph text-sm text-destructive">{error}</p>
                </div>
              )}

              {success && (
                <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-6">
                  <p className="font-paragraph text-sm text-green-800">{success}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-paragraph text-sm text-secondary-foreground mb-2 block">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.userEmail}
                      onChange={(e) =>
                        setFormData({ ...formData, userEmail: e.target.value })
                      }
                      required
                      className="bg-secondary/5 border-secondary/20"
                    />
                  </div>

                  <div>
                    <label className="font-paragraph text-sm text-secondary-foreground mb-2 block">
                      Feedback Type
                    </label>
                    <Select
                      value={formData.feedbackType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, feedbackType: value })
                      }
                    >
                      <SelectTrigger className="bg-secondary/5 border-secondary/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="suggestion">Suggestion</SelectItem>
                        <SelectItem value="bug-report">Bug Report</SelectItem>
                        <SelectItem value="compliment">Compliment</SelectItem>
                        <SelectItem value="feature-request">Feature Request</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="font-paragraph text-sm text-secondary-foreground mb-2 block">
                      Category
                    </label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger className="bg-secondary/5 border-secondary/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="ui">User Interface</SelectItem>
                        <SelectItem value="performance">Performance</SelectItem>
                        <SelectItem value="locations">Locations</SelectItem>
                        <SelectItem value="rewards">Rewards</SelectItem>
                        <SelectItem value="scheduling">Scheduling</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="font-paragraph text-sm text-secondary-foreground mb-2 block">
                      Rating
                    </label>
                    <div className="flex items-center gap-2 bg-secondary/5 border border-secondary/20 rounded-md p-3">
                      <Select
                        value={formData.rating.toString()}
                        onValueChange={(value) =>
                          setFormData({ ...formData, rating: parseInt(value) })
                        }
                      >
                        <SelectTrigger className="w-20 bg-transparent border-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 cursor-pointer transition-colors ${
                              star <= formData.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-secondary/20'
                            }`}
                            onClick={() => setFormData({ ...formData, rating: star })}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-paragraph text-sm text-secondary-foreground mb-2 block">
                    Your Feedback
                  </label>
                  <Textarea
                    placeholder="Share your thoughts, suggestions, or report any issues..."
                    value={formData.feedbackMessage}
                    onChange={(e) =>
                      setFormData({ ...formData, feedbackMessage: e.target.value })
                    }
                    required
                    className="bg-secondary/5 border-secondary/20 min-h-32"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-accentbluelight h-11 font-paragraph disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          )}

          {/* Feedback List */}
          <div>
            <h2 className="font-heading text-3xl text-secondary-foreground mb-8">
              Recent Feedback
            </h2>

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : feedbackList.length === 0 && pendingFeedback.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <MessageSquare className="w-12 h-12 text-secondary/20 mx-auto mb-4" />
                <p className="font-paragraph text-secondary-foreground/60 mb-4">
                  No feedback yet. Be the first to share your thoughts!
                </p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-primary text-primary-foreground hover:bg-accentbluelight h-11 px-6 font-paragraph"
                >
                  Submit Feedback
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {/* Pending Feedback */}
                {pendingFeedback.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-heading text-lg text-secondary-foreground mb-4">
                      Pending (Offline) - {pendingFeedback.length}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {pendingFeedback.map((item, index) => (
                        <motion.div
                          key={item._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="bg-backgrounddark border-secondary/10 p-6 opacity-75">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="font-heading text-lg text-secondary-foreground">
                                  {item.feedbackType}
                                </h3>
                                <p className="font-paragraph text-xs text-secondary-foreground/60">
                                  {item.userEmail}
                                </p>
                              </div>
                              <div className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-paragraph">
                                Pending Sync
                              </div>
                            </div>

                            <p className="font-paragraph text-sm text-secondary-foreground/80 mb-4">
                              {item.feedbackMessage}
                            </p>

                            <div className="flex items-center justify-between">
                              <div>{renderStars(item.rating || 0)}</div>
                              <span className="font-paragraph text-xs text-secondary-foreground/60">
                                {item.category}
                              </span>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submitted Feedback */}
                {feedbackList.length > 0 && (
                  <div>
                    <h3 className="font-heading text-lg text-secondary-foreground mb-4">
                      Submitted - {feedbackList.length}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {feedbackList.map((item, index) => (
                        <motion.div
                          key={item._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="bg-backgrounddark border-secondary/10 p-6 hover:border-primary/30 transition-colors">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="font-heading text-lg text-secondary-foreground">
                                  {item.feedbackType}
                                </h3>
                                <p className="font-paragraph text-xs text-secondary-foreground/60">
                                  {item.userEmail}
                                </p>
                              </div>
                              <div
                                className={`px-3 py-1 rounded-full text-xs font-paragraph ${getStatusColor(
                                  item.status
                                )}`}
                              >
                                {item.status || 'new'}
                              </div>
                            </div>

                            <p className="font-paragraph text-sm text-secondary-foreground/80 mb-4">
                              {item.feedbackMessage}
                            </p>

                            <div className="flex items-center justify-between">
                              <div>{renderStars(item.rating || 0)}</div>
                              <span className="font-paragraph text-xs text-secondary-foreground/60">
                                {item.category}
                              </span>
                            </div>

                            {item.submittedDate && (
                              <p className="font-paragraph text-xs text-secondary-foreground/50 mt-4 pt-4 border-t border-secondary/10">
                                {new Date(item.submittedDate).toLocaleDateString()}
                              </p>
                            )}
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
