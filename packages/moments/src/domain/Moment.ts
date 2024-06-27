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
   * The drop ID related to the moment.
   */
  public readonly dropId: number;

  /**
   * The token ID related to the moment (optional).
   */
  public readonly tokenId?: number;

  /**
   * The description of the moment.
   */
  public readonly description?: string;

  /**
   * The cid of the moment in Registry
   */
  public readonly cid?: string;

  public static fromCompass(response: MomentResponse): Moment {
    return new Moment(
      response.id,
      response.author,
      new Date(response.created_on),
      response.drop_id,
      response.token_id,
      response.description,
      response.cid,
    );
  }

  public static fromCreated(response: CreateMomentResponse): Moment {
    return new Moment(
      response.id,
      response.author,
      response.createdOn,
      response.dropId,
      response.tokenId,
      response.description,
      response.cid,
    );
  }

  constructor(
    id: string,
    author: string,
    createdOn: Date,
    dropId: number,
    tokenId?: number,
    description?: string,
    cid?: string,
  ) {
    this.id = id;
    this.author = author;
    this.createdOn = createdOn;
    this.dropId = dropId;
    this.tokenId = tokenId;
    this.description = description;
    this.cid = cid;
  }
}
