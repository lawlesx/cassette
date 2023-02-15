'use client'
import { PublicLockV11, UnlockV11 } from '@unlock-protocol/contracts'
import { ethers } from 'ethers';
import { useContractWrite, usePrepareContractWrite } from 'wagmi'

const CreateNft = () => {

  const lockInterface = new ethers.utils.Interface(PublicLockV11.abi);
  const params = lockInterface.encodeFunctionData(
    "initialize(address,uint256,address,uint256,uint256,string)",
    [
      "0x3D02B87ae906F1D6f130832f67E5c10C9f869205",
      31 * 60 * 60 * 24, // 30 days in seconds
      ethers.constants.AddressZero, // We use the base chain currency
      ethers.utils.parseUnits("0.0001", 18), // 0.01 Eth
      1000,
      "Unlock Membership Testing",
    ]
  );

  const { config, error } = usePrepareContractWrite({
    address: '0x1FF7e338d5E582138C46044dc238543Ce555C963',
    abi: UnlockV11.abi,
    functionName: 'createUpgradeableLockAtVersion',
    args: [params, 11],
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)
  console.log(error, data, write)

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
