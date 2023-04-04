/**
 * Represents an attribute for a POAP drop or token.
 *
 * @class Attribute
 */
export class Attribute {
  /**
   * The ID of the attribute.
   *
   * @member {number}
   * @name Attribute#id
   */
  id: number;

  /**
   * The ID of the POAP drop associated with the attribute.
   *
   * @member {number}
   * @name Attribute#dropId
   */
  dropId: number;

  /**
   * The ID of the POAP token associated with the attribute, if applicable.
   *
   * @member {number|undefined}
   * @name Attribute#tokenId
   */
  tokenId?: number;

  /**
   * The key of the attribute.
   *
   * @member {string}
   * @name Attribute#key
   */
  key: string;

  /**
   * The value of the attribute.
   *
   * @member {string}
   * @name Attribute#value
   */
  value: string;

  /**
   * The timestamp when the attribute was created.
   *
   * @member {Date}
   * @name Attribute#timestamp
   */
  timestamp: Date;

  /**
   * Creates a new Attribute object.
   *
   * @constructor
   * @param {AttributeProperties} properties - The properties of the attribute.
   */
  constructor(properties: AttributeProperties) {
    this.id = properties.id;
    this.dropId = properties.dropId;
    this.tokenId = properties.tokenId ?? 0;
    this.key = properties.key;
    this.value = properties.value;
    this.timestamp = properties.timestamp;
  }
}

/**
 * The properties of an attribute.
 *
 * @interface AttributeProperties
 */
export interface AttributeProperties {
  /**
   * The ID of the attribute.
   *
   * @type {number}
   */
  id: number;

  /**
   * The ID of the POAP drop associated with the attribute.
   *
   * @type {number}
   */
  dropId: number;

  /**
   * The ID of the POAP token associated with the attribute, if applicable.
   *
   * @type {number|undefined}
   */
  tokenId?: number;

  /**
   * The key of the attribute.
   *
   * @type {string}
   */
  key: string;

  /**
   * The value of the attribute.
   *
   * @type {string}
   */
  value: string;

  /**
   * The timestamp when the attribute was created.
   *
   * @type {Date}
   */
  timestamp: Date;
}
