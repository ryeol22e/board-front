import WrapLayout from '@/app/wrap-layout';
import { ChildrenType } from '@/types/base';

export default function NoGnbLayout({ children }: Readonly<ChildrenType>) {
  return <WrapLayout>{children}</WrapLayout>;
}
