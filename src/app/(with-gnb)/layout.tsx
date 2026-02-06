import WrapLayout from '@/app/wrap-layout';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
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
