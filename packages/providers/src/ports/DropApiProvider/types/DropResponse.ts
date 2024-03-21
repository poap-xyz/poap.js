/**
 * Represents the response data from a drop API.
 * @interface
 */
export interface DropResponse {
  /**
   * The ID of the drop.
   * @type {number}
   */
  id: number;
  /**
   * The fancy ID of the drop.
   * @type {string}
   */
  fancy_id: string;
  /**
   * The name of the drop.
   * @type {string}
   */
  name: string;
  /**
   * The description of the drop.
   * @type {string}
   */
  description: string;
  /**
   * The city of the drop.
   * @type {string}
   */
  city: string;
  /**
   * The country of the drop.
   * @type {string}
   */
  country: string;
  /**
   * The event URL of the drop.
   * @type {string}
   */
  event_url: string;
  /**
   * The image URL of the drop.
   * @type {string}
   */
  image_url: string;
  /**
   * The animation URL of the drop.
   * @type {string}
   */
  animation_url: string;
  /**
   * The year of the drop.
   * @type {number}
   */
  year: number;
  /**
   * The start date of the drop.
   * @type {string}
   */
  start_date: string;
  /**
   * The end date of the drop.
   * @type {string}
   */
  end_date: string;
  /**
   * The expiry date of the drop.
   * @type {string}
   */
  expiry_date: string;
  /**
   * Whether the drop was created by an admin or not.
   * @type {boolean}
   */
  from_admin: boolean;
  /**
   * Whether the drop is a virtual event or not.
   * @type {boolean}
   */
  virtual_event: boolean;
  /**
   * The ID of the event template used for the drop, if available.
   * @type {?number}
   */
  event_template_id?: number | null;
  /**
   * Whether the drop is private or not.
   * @type {boolean}
   */
  private_event: boolean;
  /**
   * The channel of the drop.
   * @type {string}
   */
  channel: string;
  /**
   * The platform of the drop.
   * @type {string}
   */
  platform: string;
  /**
   * The type of location of the drop.
   * @type {string}
   */
  location_type: string;
  /**
   * The timezone of the drop.
   * @type {string}
   */
  timezone: string;
  /**
   * The date the drop was created.
   * @type {string}
   */
  created_date: string;
}
