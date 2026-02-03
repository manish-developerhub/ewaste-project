/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: achievements
 * Interface for Achievements
 */
export interface Achievements {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  pointsValue?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  badgeImage?: string;
  /** @wixFieldType text */
  achievementType?: string;
}


/**
 * Collection ID: binanalytics
 * Interface for BinAnalytics
 */
export interface BinAnalytics {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  binLocationId?: string;
  /** @wixFieldType number */
  currentFillPercentage?: number;
  /** @wixFieldType datetime */
  predictedFillDate?: Date | string;
  /** @wixFieldType text */
  collectionSchedule?: string;
  /** @wixFieldType datetime */
  lastCollectionDate?: Date | string;
  /** @wixFieldType number */
  averageFillRate?: number;
}


/**
 * Collection ID: communitychallenges
 * Interface for CommunityChallenges
 */
export interface CommunityChallenges {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  challengeName?: string;
  /** @wixFieldType text */
  challengeDescription?: string;
  /** @wixFieldType date */
  startDate?: Date | string;
  /** @wixFieldType date */
  endDate?: Date | string;
  /** @wixFieldType number */
  targetPoints?: number;
  /** @wixFieldType number */
  currentPoints?: number;
  /** @wixFieldType number */
  participantCount?: number;
  /** @wixFieldType number */
  rewardPoints?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  challengeImage?: string;
}


/**
 * Collection ID: ewasteguidelines
 * Interface for EWasteGuidelines
 */
export interface EWasteGuidelines {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  categoryName?: string;
  /** @wixFieldType text */
  categoryDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  identificationImage?: string;
  /** @wixFieldType text */
  identificationTips?: string;
  /** @wixFieldType text */
  disposalInstructions?: string;
  /** @wixFieldType text */
  safetyWarnings?: string;
}


/**
 * Collection ID: feedback
 * Interface for Feedback
 */
export interface Feedback {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  feedbackType?: string;
  /** @wixFieldType text */
  feedbackMessage?: string;
  /** @wixFieldType number */
  rating?: number;
  /** @wixFieldType text */
  userEmail?: string;
  /** @wixFieldType datetime */
  submittedDate?: Date | string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType text */
  category?: string;
}


/**
 * Collection ID: recyclinglocations
 * Interface for RecyclingLocations
 */
export interface RecyclingLocations {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  locationName?: string;
  /** @wixFieldType text */
  address?: string;
  /** @wixFieldType text */
  operatingHours?: string;
  /** @wixFieldType boolean */
  isAvailable?: boolean;
  /** @wixFieldType text */
  acceptedWasteTypes?: string;
  /** @wixFieldType number */
  latitude?: number;
  /** @wixFieldType number */
  longitude?: number;
}


/**
 * Collection ID: scheduling
 * Interface for SchedulingSystem
 */
export interface SchedulingSystem {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  appointmentTitle?: string;
  /** @wixFieldType date */
  appointmentDate?: Date | string;
  /** @wixFieldType time */
  appointmentTime?: any;
  /** @wixFieldType text */
  serviceType?: string;
  /** @wixFieldType text */
  locationId?: string;
  /** @wixFieldType number */
  capacity?: number;
  /** @wixFieldType text */
  status?: string;
}
