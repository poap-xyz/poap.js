import { PoapsClient, POAPReservation } from '@poap-xyz/poaps';
import { handleError } from '../utils/handleError';

export const email_reservation_poap = async (
  client: PoapsClient,
): Promise<void> => {
  try {
    const data: POAPReservation = await client.emailReservation({
      mintCode: 'your_poap_code',
      email: 'your@email.io',
      sendEmail: true,
    });
    console.log(data);
  } catch (error) {
    handleError(error);
  }
};
