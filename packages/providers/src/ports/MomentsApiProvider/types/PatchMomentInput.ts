/**
 * Object describing the input required to update a Moment.
 * @typedef {Object} PatchMomentInput
 * @property {string} cid - The cid of the moment in Registry under the format:
 * {<Version>-<Signer>-<Signature>.<Type>} allows you to fetch and verify the
 * content of the moment in Registry.
 */
export interface PatchMomentInput {
  cid?: string;
}
