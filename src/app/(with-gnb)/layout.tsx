import WrapLayout from '@/app/wrap-layout';
import Footer from '@/components/common/client/Footer';
import Header from '@/components/common/client/Header';
import { ChildrenType } from '@/types/base';

export default function WithGnbLayout({ children }: Readonly<ChildrenType>) {
  return (
    <WrapLayout>
      <Header />
      {children}
      <Footer />
    </WrapLayout>
  );
}
