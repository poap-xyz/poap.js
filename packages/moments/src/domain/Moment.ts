import { CreateMomentResponse } from '@poap-xyz/providers';
import { MomentResponse } from '../queries/PaginatedMoments';

/**
 * Represents a moment.
 */
export class Moment {
  /**
   * A UUID.
   */
  public readonly id: string;

  /**
   * The author of the moment (for now only ETH accounts).
   */
  public readonly author: string;

  /**
   * When the moment was received on the API.
   */
  public readonly createdOn: Date;

  /**
   * The drop IDs associated with the moment.
   */
  public readonly dropIds: number[];

  /**
   * The description of the moment.
   */
  public readonly description: string | null;

  /**
   * The cid of the moment in Registry
   */
  public readonly cid: string | null;

  public static fromCompass(response: MomentResponse): Moment {
    return new Moment(
      response.id,
      response.author,
      new Date(response.created_on),
      response.drops.map((drop) => drop.drop_id),
      response.description,
      response.cid,
    );
  }

  public static fromCreated(response: CreateMomentResponse): Moment {
    return new Moment(
      response.id,
      response.author,
      response.createdOn,
      response.dropIds || [],
      response.description,
      response.cid,
    );
  }

  constructor(
    id: string,
    author: string,
    createdOn: Date,
    dropIds?: number[],
    description?: string | null,
    cid?: string | null,
  ) {
    this.id = id;
    this.author = author;
    this.createdOn = createdOn;
    this.dropIds = dropIds || [];
    this.description = description || null;
    this.cid = cid || null;
  }
}
