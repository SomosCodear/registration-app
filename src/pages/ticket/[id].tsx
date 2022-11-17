import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSearchTicketQuery, useRedeemTicketMutation } from 'services/api';
import { Results } from 'components/results';

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
    ? String(loadError)
    : failedToRedeem
    ? String(redeemError)
    : '';

  console.log({ redeemResponse });
  return (
    <Results
      doingCheckIn={isRedeeming}
      redeemed={redeemResponse?.redeemed === false}
      error={error}
      data={data || {}}
      success={isSuccess}
      onAction={() => redeemTicket({ ticketId })}
      onCancel={() => router.push('/')}
    />
  );
};

export default TicketPage;
