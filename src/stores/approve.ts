import { BigNumber, ContractInterface, ethers } from "ethers";
import { TransactionResponse } from "@ethersproject/providers";
import { defineStore } from "pinia";
import { useEthers } from "vue-dapp";
import { erc20Abi } from "../consts/abis/erc20Abi";
import { uchildErc20Abi } from "../consts/abis/uchild-erc20-abi";

const { address, signer, provider } = useEthers()

export const useApproves = defineStore({
    id: 'approve',
    state: () => {
        return {
            banner4: BigNumber.from(0),
            newBanner: BigNumber.from(0)
        }
    },
    actions: {
        async loadApproveStatus() {
            this.banner4 = await loadApproveStatus(import.meta.env.VITE_DISTRIBUTOR)
            // To use later when 
            // this.newBanner = await loadApproveStatus(import.meta.env.VITE_BANNER4)
        }
    }
})

async function loadApproveStatus(bannerContract: string) {
    let value = BigNumber.from(0)
    if (address.value && signer.value) {
        try {
            const contract = new ethers.Contract(import.meta.env.VITE_GHST, erc20Abi as ContractInterface, signer.value)
            contract.connect(signer.value)
            const response = await contract.functions.allowance(address.value, bannerContract)
            if (typeof response[0]._isBigNumber === 'boolean') {
                value = response[0]
            }
        } catch (e) {
            console.log(e)
        }
    }
    return value
}