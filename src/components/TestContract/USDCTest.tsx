import React from "react";
import { useAccount, useReadContract } from "wagmi";
import { USDC_ABI } from "../../constants/USDC_ABI";

// usdc: 0x634A9646f1ccEebc00B3052a32768A62021A15EF
// usdc staking: 0xAAb9fe7f19387f1C6090843625Cb26e31E33f7cC

const USDCTest = () => {
    const account = useAccount();

    console.log(account, 'account')
    const { data } = useReadContract({
        abi: USDC_ABI,
        address: account.address,
        functionName: "allowance",
        args: ["0x634A9646f1ccEebc00B3052a32768A62021A15EF", account.address]
    })

    console.log(data, 'datadatadatadata')

    return <>
        <p>USDC</p>
    </>
}

export default USDCTest