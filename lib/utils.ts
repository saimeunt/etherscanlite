import { BlockWithTransactions, BigNumber } from 'alchemy-sdk';
import { fromUnixTime, formatDistance } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

import alchemy from './alchemy';

export const truncateAddress = (address: string) =>
  `${address.substring(0, 8)}…${address.substring(address.length - 8)}`;

export const truncateHash = (hash: string) => `${hash.substring(0, 14)}…`;

export const formatEther = (ether: number | bigint, precision = 5) =>
  new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: precision,
  }).format(ether);

export const formatTimestamp = (timestamp: number, withDate = true) => {
  const timestampDate = fromUnixTime(timestamp);
  const timestampDistance = formatDistance(timestampDate, new Date(), {
    includeSeconds: true,
    addSuffix: true,
  });
  const timestampDateFormatted = formatInTimeZone(
    timestampDate,
    'UTC',
    'MMM-dd-yyyy hh:mm:ss aa +z',
  );
  return withDate ? `${timestampDistance} (${timestampDateFormatted})` : timestampDistance;
};

export const getBlockReward = async (block: BlockWithTransactions) => {
  const { receipts } = await alchemy.core.getTransactionReceipts({
    blockHash: block.hash,
  });
  const transactions = receipts || [];
  const minerTips = transactions.map(({ transactionHash, gasUsed }) => {
    const { gasPrice = BigNumber.from(0) } = block.transactions.find(
      ({ hash }) => hash === transactionHash,
    ) || {
      gasPrice: BigNumber.from(0),
    };
    const gasUsedBigInt = gasUsed.toBigInt
      ? gasUsed.toBigInt()
      : BigInt(gasUsed as unknown as string);
    return gasUsedBigInt * gasPrice.toBigInt();
  });
  const sumMinerTips =
    block.transactions.length > 0
      ? minerTips.reduce((prevTip, currentTip) => prevTip + currentTip)
      : BigInt(0);
  const baseFeePerGas = block.baseFeePerGas ? block.baseFeePerGas.toBigInt() : BigInt(0);
  const burnedFee = block.gasUsed.toBigInt() * baseFeePerGas;
  return { blockReward: sumMinerTips - burnedFee, sumMinerTips, burnedFee };
};
