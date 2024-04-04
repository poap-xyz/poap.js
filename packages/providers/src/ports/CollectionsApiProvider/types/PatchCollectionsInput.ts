import { UpdateOrCreateSection } from './UpdateOrCreateSection';

export interface PatchCollectionsInput {
  title: string;
  description: string;
  createdBy: string;
  logo: string;
  bannerImageUrl: string;
  logoImageUrl: string;
  sections: UpdateOrCreateSection[];
  collectionId: number;
  year: number | null;
  ownerAddress: string;
}
