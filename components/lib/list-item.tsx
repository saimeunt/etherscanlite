import { ReactNode } from 'react';
import classNames from 'classnames';

const ListItem = ({
  title,
  border = false,
  children,
}: {
  title: string;
  border?: boolean;
  children: ReactNode;
}) => (
  <div
    className={classNames(
      { 'border-t border-gray-200': border },
      'py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6',
    )}
  >
    <dt className="flex text-sm font-medium text-gray-500">{title}:</dt>
    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">{children}</dd>
  </div>
);

export default ListItem;
