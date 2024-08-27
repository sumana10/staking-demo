import React from 'react';
import { useWeb3Contract } from 'react-moralis';
import StakingAbi from '../constants/Staking.json';
import TokenAbi from '../constants/RewardToken.json';
import { Form } from 'web3uikit';
import { ethers } from 'ethers';

function StakeForm() {
  // const stakingAddress = "0x30b4b1150BCD5B838812a41BD9d46d61FF0c32c9"; //replace this with the address where you have deployed your staking Smart Contract
  // const tesTokenAddress = "0x1fa9C2FDdc7C747aeCbf7D4E6dAd280da4D5607b"; //replace this with the address where you have deployed your Reward Token Smart Contract

  const tesTokenAddress = "0xb82785D38d1bE5AeE1101D43B934b3821019D8dA";
  const stakingAddress = "0x35a656A100D7B36186149d7930C2c4CFf25e2806";

  const { runContractFunction } = useWeb3Contract();

  let approveOptions = {
    abi: TokenAbi.abi,
    contractAddress: tesTokenAddress,
    functionName: 'approve'
  };

  let stakeOptions = {
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: 'stake'
  };

  async function handleStakeSubmit(data) {
    const amountToApprove = data.data[0].inputResult;
    approveOptions.params = {
      amount: ethers.utils.parseEther(amountToApprove, 'ether'),
      spender: stakingAddress
    };

    const tx = await runContractFunction({
      params: approveOptions,
      onError: (error) => console.log(error),
      onSuccess: () => {
        handleApproveSuccess(approveOptions.params.amount);
      }
    });
  }

  async function handleApproveSuccess(amountToStakeFormatted) {
    stakeOptions.params = {
      amount: amountToStakeFormatted
    };
    try {
    const tx = await runContractFunction({
      params: stakeOptions,
      onError: (error) => console.log(error)
    });

    await tx.wait(0)
    console.log('Stake transaction complete');

  } catch (e) { console.log(e); }	
  }

  return (
    <>
    <div className="myDiv">
   
      <Form
      
        onSubmit={handleStakeSubmit}
        data={[
          {
            inputWidth: '50%',
            name: 'Amount to stake ',
            type: 'number',
            value: '',
            key: 'amountToStake'
          }
        ]}
        title="Stake Now!"
      ></Form>
     
    
    </div>
   
  </>
  );
}

export default StakeForm;
