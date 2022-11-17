import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Start } from 'components';

const HomePage: NextPage = () => {
  const router = useRouter();
  const goToScan = () => router.push('/scan');
  const goToSearch = () => router.push('/search');
  return <Start onScanClick={goToScan} onSearchClick={goToSearch} />;
};

export default HomePage;
