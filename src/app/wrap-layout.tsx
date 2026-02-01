import { ChildrenType } from '@/types/base';

export default function WrapLayout({ children }: Readonly<ChildrenType>) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto flex-grow px-4 py-8">{children}</main>
    </div>
  );
}
