import AddressToken from '../../../../components/address/token';

const AddressTokenPage = ({ params: { address } }: { params: { address: string } }) => (
  /* @ts-expect-error Async Server Component */
  <AddressToken address={address} />
);

export default AddressTokenPage;
