import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  useSearchTicketQuery,
  useRedeemTicketMutation,
  extractApiError,
} from 'services/api';
import { Results } from 'components';

const TicketPage: NextPage = () => {
  const router = useRouter();
  const ticketId = router.query.id as string;
  const {
    data,
    isError: failedToLoad,
    error: loadError,
  } = useSearchTicketQuery({ ticketId }, { skip: !ticketId });
  const [
    redeemTicket,
    {
      data: redeemResponse,
      isLoading: isRedeeming,
      isSuccess,
      isError: failedToRedeem,
      error: redeemError,
    },
  ] = useRedeemTicketMutation();

  const error = failedToLoad
    ? extractApiError(loadError)
    : failedToRedeem
    ? extractApiError(redeemError!)
    : '';

  const redeemedAlready =
    data?.ticketStatus === 'redeemed' || redeemResponse?.redeemed === false;

  return (
    <Results
      doingCheckIn={isRedeeming}
      redeemed={redeemedAlready}
      error={error}
      data={data || {}}
      success={isSuccess}
      onAction={() => redeemTicket({ ticketId })}
      onCancel={() => router.push('/')}
    />
  );
};

export default TicketPage;
