import AddressIndex from '../../../components/address';

const AddressIndexPage = ({ params: { address } }: { params: { address: string } }) => (
  /* @ts-expect-error Async Server Component */
  <AddressIndex address={address} />
);

export default AddressIndexPage;
