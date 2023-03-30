import Block from '../../../components/block';

const BlockPage = ({ params: { number } }: { params: { number: string } }) => (
  /* @ts-expect-error Async Server Component */
  <Block number={Number(number)} />
);

export const dynamic = 'force-dynamic';

export default BlockPage;
