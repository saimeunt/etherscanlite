import AddressInternal from '../../../../components/address/internal';

const AddressInternalPage = ({ params: { address } }: { params: { address: string } }) => (
  /* @ts-expect-error Async Server Component */
  <AddressInternal address={address} />
);

export default AddressInternalPage;
