import { SectionResponse } from './SectionResponse';

/**
 * Represents the response structure for a collection entity.
 *
 * This interface details the properties returned for a collection in the system, including
 * metadata about the collection such as its creator, title, description, and visual identifiers.
 * It also includes temporal information and details about the ownership and structural components
 * of the collection.
 */
export interface CollectionResponse {
  id: number;
  slug: string;
  createdBy: string;
  title: string;
  description: string;
  bannerImageUrl: string | null;
  logoImageUrl: string | null;
  createdOn: Date;
  updatedOn: Date;
  year: number | null;
  ownerAddress: string;
  sections: SectionResponse[];
}
