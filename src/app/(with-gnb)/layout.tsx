import Footer from '@/components/common/client/Footer';
import Header from '@/components/common/client/Header';
import WrapLayout from '@/app/wrap-layout';
import { ChildrenType } from '@/types/base';
import Providers from '../providers';

export default function WithGnbLayout({ children }: Readonly<ChildrenType>) {
  return (
    <Providers>
      <WrapLayout>
        <Header />
        {children}
        <Footer />
      </WrapLayout>
    </Providers>
  );
}
