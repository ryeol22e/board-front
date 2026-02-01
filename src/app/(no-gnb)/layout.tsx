import WrapLayout from '@/app/wrap-layout';
import { ChildrenType } from '@/types/base';
import Providers from '../providers';

export default function NoGnbLayout({ children }: Readonly<ChildrenType>) {
  return (
    <Providers>
      <WrapLayout>{children}</WrapLayout>
    </Providers>
  );
}
