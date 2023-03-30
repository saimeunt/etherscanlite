import Transactions from '../../../../components/transactions';

const TransactionsPage = ({ params: { number } }: { params: { number: string } }) => (
  /* @ts-expect-error Async Server Component */
  <Transactions number={number} />
);

export const dynamic = 'force-dynamic';

export default TransactionsPage;
