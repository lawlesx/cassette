'use client'
import { CassetteUnlockFactory__factory } from '@/contracts/abis/types';
import contractAddress from '@/utils/contract';
import { PublicLockV12 } from '@unlock-protocol/contracts'
import { ethers } from 'ethers';
import { useContractWrite, usePrepareContractWrite } from 'wagmi'

const CreateNft = () => {
  const lockInterface = new ethers.utils.Interface(PublicLockV12.abi);
  const params = lockInterface.encodeFunctionData(
    "initialize(address,uint256,address,uint256,uint256,string)",
    [
      //* Should be factory address
      contractAddress.cassetteUnlockFactory[80001],
      31 * 60 * 60 * 24, // 30 days in seconds
      ethers.constants.AddressZero, // We use the base chain currency
      ethers.utils.parseUnits("0.0001", 18), // 0.01 Eth
      1000,
      "Trying New 17 Feb",
    ]
  );

  const { config, isError } = usePrepareContractWrite({
    address: contractAddress.cassetteUnlockFactory[80001],
    abi: CassetteUnlockFactory__factory.abi,
    functionName: 'deployLock',
    args: ["0x3D02B87ae906F1D6f130832f67E5c10C9f869205", params as `0x${string}`, "Trying New 17 Feb", "Trying New 17 Feb", 'ipfs://bafybeifrnutuq4zdrzg7zyxwxk2qhvmybyvz43tg3h7bequ5ywd6ippgsi/'],
  })
  console.log('IsError', isError);

  const { data, isLoading, isSuccess, write } = useContractWrite(config)
  console.log('Data', data, write)

  return (
    <div className="w-1/2 p-10 rounded-xl">
      <button
        disabled={!write}
        onClick={() => write?.()}
        className="bg-orange-500 rounded-full p-4 text-white active:bg-orange-600 transition-colors"
      >
        {isLoading ? 'Loading' : isSuccess ? 'Deployed' : 'Deploy Unlock Contract'}
      </button>
    </div>
  )
}

export default CreateNft
