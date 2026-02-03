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
