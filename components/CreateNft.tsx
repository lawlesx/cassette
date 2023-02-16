'use client'
import { CassetteUnlockFactory, CassetteUnlockFactory__factory } from '@/contracts/abis/types';
import contractAddress from '@/utils/contract';
import { PublicLockV12 } from '@unlock-protocol/contracts'
import { BigNumber, ethers } from 'ethers';
import { useContract, useContractWrite, usePrepareContractWrite, useProvider, useSigner } from 'wagmi'

const CreateNft = () => {
  // const { data: signer, isError, isLoading } = useSigner()

  // const onCreate = async () => {


  //   if (!signer) {
  //     console.log('No signer', signer);
  //     return
  //   }

  //   const unlock = new ethers.Contract(contractAddress.cassetteUnlockFactory[80001], CassetteUnlockFactory__factory.abi, signer);
  //   const transaction = await unlock.deployLock("0x3D02B87ae906F1D6f130832f67E5c10C9f869205", params, 'New Unlock Membership Testing', 'UNLOCKTESTING', 'ipfs://bafybeifrnutuq4zdrzg7zyxwxk2qhvmybyvz43tg3h7bequ5ywd6ippgsi/')
  //   console.log('transaction', transaction);
  //   const receipt = await transaction.wait();
  //   const lockAddress = receipt.logs[0].address;
  //   console.log(lockAddress);
  // }

  const lockInterface = new ethers.utils.Interface(PublicLockV12.abi);
  const params = lockInterface.encodeFunctionData(
    "initialize(address,uint256,address,uint256,uint256,string)",
    [
      "0x3D02B87ae906F1D6f130832f67E5c10C9f869205",
      31 * 60 * 60 * 24, // 30 days in seconds
      ethers.constants.AddressZero, // We use the base chain currency
      ethers.utils.parseUnits("0.0001", 18), // 0.01 Eth
      1000,
      "New Unlock Membership Testing",
    ]
  );

  // const contract = useContract({
  //   address: contractAddress.cassetteUnlockFactory[80001],
  //   abi: CassetteUnlockFactory__factory.abi,
  // })

  // contract?.deployLock()
  console.log('Params', params);

  const { config } = usePrepareContractWrite({
    address: contractAddress.cassetteUnlockFactory[80001],
    abi: CassetteUnlockFactory__factory.abi,
    functionName: 'deployLock',
    args: ["0x3D02B87ae906F1D6f130832f67E5c10C9f869205", params as `0x${string}`, 'New Unlock Membership Testing', 'UNLOCKTESTING', 'ipfs://bafybeifrnutuq4zdrzg7zyxwxk2qhvmybyvz43tg3h7bequ5ywd6ippgsi/'],
  })
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
