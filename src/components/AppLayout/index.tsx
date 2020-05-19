import { FC } from 'react';

type Props = {};

const AppLayout: FC<Props> = ({ children }) => (
  <div>
    hello,
    {children}
  </div>
);

export default AppLayout;
