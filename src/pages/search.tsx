import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Finder } from 'components/finder';
import { useSearchTicketQuery, extractApiError } from 'services/api';

const SearchPage: NextPage = () => {
  const router = useRouter();
  const [value, setValue] = useState('');
  const { data, isFetching, isError, error } = useSearchTicketQuery(
    {
      dni: value,
    },
    { skip: !value },
  );

  useEffect(() => {
    if (data) {
      router.push(`/ticket/${data.ticketId}`);
    }
  }, [data, router]);

  const onCancel = () => router.push('/');
  return (
    <Finder
      searching={isFetching}
      onCancel={onCancel}
      onSearch={setValue}
      error={isError ? extractApiError(error) : ''}
    />
  );
};

export default SearchPage;
