import Transaction from '../../../components/transaction';

const TransactionPage = ({ params: { hash } }: { params: { hash: string } }) => (
  /* @ts-expect-error Async Server Component */
  <Transaction hash={hash} />
);

export default TransactionPage;
