import { cache } from 'react';
import ClientHeader from './client/ClientHeader';
import { appFetch } from '@/utils/appFetch';

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'Contact', href: '/contact' },
];

const fetchData = cache(async () => {
  return await appFetch<Array<{ name: string; href: string }>>(
    '/api/common/gnb',
  );
});

export default async function Header() {
  // const { data } = await fetchData();
  return <ClientHeader menus={menuItems} />;
}
