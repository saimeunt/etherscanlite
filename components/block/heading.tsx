const Heading = ({ number }: { number: number }) => (
  <div className="border-b border-gray-200 pb-5">
    <h1 className="flex items-center text-base font-semibold leading-6 text-gray-900">
      <div className="mr-2">Block</div>
      <div className="text-sm font-normal text-gray-500">#{number}</div>
    </h1>
  </div>
);

export default Heading;
