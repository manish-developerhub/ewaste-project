import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';

interface Appointment {
  _id: string;
  appointmentTitle?: string;
  appointmentDate?: Date;
  appointmentTime?: string;
  serviceType?: string;
  locationId?: string;
  capacity?: number;
  status?: string;
}

export default function SchedulingPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    appointmentTitle: '',
    appointmentDate: '',
    appointmentTime: '',
    serviceType: 'large-item-disposal',
    locationId: '',
    capacity: 1,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll('scheduling');
      setAppointments(result.items || []);
    } catch (err) {
      setError('Failed to load appointments');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const newAppointment = {
        _id: crypto.randomUUID(),
        appointmentTitle: formData.appointmentTitle,
        appointmentDate: new Date(formData.appointmentDate),
        appointmentTime: formData.appointmentTime,
        serviceType: formData.serviceType,
        locationId: formData.locationId,
        capacity: formData.capacity,
        status: 'pending',
      };

      await BaseCrudService.create('scheduling', newAppointment);
      setSuccess('Appointment booked successfully!');
      setFormData({
        appointmentTitle: '',
        appointmentDate: '',
        appointmentTime: '',
        serviceType: 'large-item-disposal',
        locationId: '',
        capacity: 1,
      });
      setShowForm(false);
      loadAppointments();
    } catch (err) {
      setError('Failed to book appointment');
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'confirmed':
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
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
              Schedule Your Disposal
            </h1>
            <p className="font-paragraph text-lg text-primary-foreground/90">
              Book time slots for large item disposal or schedule pickup services at your convenience
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full bg-background py-16">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          {/* CTA Button */}
          <div className="flex justify-end mb-8">
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-primary text-primary-foreground hover:bg-accentbluelight h-11 px-6 font-paragraph"
            >
              {showForm ? 'Cancel' : 'Book New Appointment'}
            </Button>
          </div>

          {/* Booking Form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-backgrounddark rounded-lg p-8 mb-12"
            >
              <h2 className="font-heading text-2xl text-secondary-foreground mb-6">
                Book an Appointment
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
                      Appointment Title
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., Old Computer Disposal"
                      value={formData.appointmentTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, appointmentTitle: e.target.value })
                      }
                      required
                      className="bg-secondary/5 border-secondary/20"
                    />
                  </div>

                  <div>
                    <label className="font-paragraph text-sm text-secondary-foreground mb-2 block">
                      Service Type
                    </label>
                    <Select
                      value={formData.serviceType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, serviceType: value })
                      }
                    >
                      <SelectTrigger className="bg-secondary/5 border-secondary/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="large-item-disposal">Large Item Disposal</SelectItem>
                        <SelectItem value="pickup-service">Pickup Service</SelectItem>
                        <SelectItem value="bulk-disposal">Bulk Disposal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="font-paragraph text-sm text-secondary-foreground mb-2 block">
                      Date
                    </label>
                    <Input
                      type="date"
                      value={formData.appointmentDate}
                      onChange={(e) =>
                        setFormData({ ...formData, appointmentDate: e.target.value })
                      }
                      required
                      className="bg-secondary/5 border-secondary/20"
                    />
                  </div>

                  <div>
                    <label className="font-paragraph text-sm text-secondary-foreground mb-2 block">
                      Time
                    </label>
                    <Input
                      type="time"
                      value={formData.appointmentTime}
                      onChange={(e) =>
                        setFormData({ ...formData, appointmentTime: e.target.value })
                      }
                      required
                      className="bg-secondary/5 border-secondary/20"
                    />
                  </div>

                  <div>
                    <label className="font-paragraph text-sm text-secondary-foreground mb-2 block">
                      Location ID
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter location ID"
                      value={formData.locationId}
                      onChange={(e) =>
                        setFormData({ ...formData, locationId: e.target.value })
                      }
                      required
                      className="bg-secondary/5 border-secondary/20"
                    />
                  </div>

                  <div>
                    <label className="font-paragraph text-sm text-secondary-foreground mb-2 block">
                      Capacity (items)
                    </label>
                    <Input
                      type="number"
                      min="1"
                      value={formData.capacity}
                      onChange={(e) =>
                        setFormData({ ...formData, capacity: parseInt(e.target.value) })
                      }
                      required
                      className="bg-secondary/5 border-secondary/20"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-accentbluelight h-11 font-paragraph"
                >
                  Confirm Booking
                </Button>
              </form>
            </motion.div>
          )}

          {/* Appointments List */}
          <div>
            <h2 className="font-heading text-3xl text-secondary-foreground mb-8">
              Your Appointments
            </h2>

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : appointments.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="font-paragraph text-secondary-foreground/60 mb-4">
                  No appointments scheduled yet
                </p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-primary text-primary-foreground hover:bg-accentbluelight h-11 px-6 font-paragraph"
                >
                  Book Your First Appointment
                </Button>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {appointments.map((appointment, index) => (
                  <motion.div
                    key={appointment._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-backgrounddark border-secondary/10 p-6 hover:border-primary/30 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-heading text-xl text-secondary-foreground">
                          {appointment.appointmentTitle}
                        </h3>
                        <div
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-paragraph ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {getStatusIcon(appointment.status)}
                          {appointment.status || 'pending'}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-secondary-foreground/70">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="font-paragraph text-sm">
                            {appointment.appointmentDate
                              ? new Date(appointment.appointmentDate).toLocaleDateString()
                              : 'N/A'}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-secondary-foreground/70">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="font-paragraph text-sm">
                            {appointment.appointmentTime || 'N/A'}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-secondary-foreground/70">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="font-paragraph text-sm">
                            {appointment.locationId || 'N/A'}
                          </span>
                        </div>

                        <div className="pt-3 border-t border-secondary/10">
                          <p className="font-paragraph text-xs text-secondary-foreground/60">
                            Service: {appointment.serviceType || 'N/A'} • Capacity:{' '}
                            {appointment.capacity || 0} items
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
