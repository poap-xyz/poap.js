import { UpdateOrCreateSection } from './UpdateOrCreateSection';

export interface PutCollectionsInput {
  title: string;
  description: string;
  createdBy: string;
  logo: string;
  bannerImageUrl: string;
  logoImageUrl: string;
  sections: UpdateOrCreateSection[];
  collectionId: number;
  year: number | null;
}
