import { useMemo } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Scanner } from 'components';
import { AppCamera } from 'services/appCamera';

const ScanPage: NextPage = () => {
  const router = useRouter();
  const camera = useMemo(() => new AppCamera(), []);
  const onCancel = () => router.push('/');
  const onData = (data: string) => {
    const match = /DNI\s.+\s(.+),/.exec(data);
    if (match) {
      const [, ticketId] = match;
      router.push(`/ticket/${ticketId}`);
    } else {
      alert('Invalid QR code');
      onCancel();
    }
  };
  return <Scanner camera={camera} onCancel={onCancel} onData={onData} />;
};

export default ScanPage;
