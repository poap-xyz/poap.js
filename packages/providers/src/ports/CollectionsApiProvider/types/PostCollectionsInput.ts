import { UpdateOrCreateSection } from './UpdateOrCreateSection';
/**
 * Describes the input structure for creating a new collection.
 *
 * This interface outlines the information needed to create a collection, including
 * its title, description, creator, visual assets, and structural components like sections.
 */
export interface PostCollectionsInput {
  title: string;
  description: string;
  createdBy: string;
  logoImageUrl: string;
  bannerImageUrl: string;
  sections: UpdateOrCreateSection[];
  year: number;
  ownerAddress: string;
}
