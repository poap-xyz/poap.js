export interface MomentsApiProvider {
  requestUploadUrl(): Promise<string>;
}
