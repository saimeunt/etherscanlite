import AddressNft from '../../../../components/address/nft';

const AddressNftPage = ({ params: { address } }: { params: { address: string } }) => (
  /* @ts-expect-error Async Server Component */
  <AddressNft address={address} />
);

export const dynamic = 'force-dynamic';

export default AddressNftPage;
