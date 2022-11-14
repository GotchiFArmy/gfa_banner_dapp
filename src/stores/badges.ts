import { TransactionResponse } from "@ethersproject/providers";
import { BigNumber, ContractInterface, ethers } from "ethers";
import { defineStore } from "pinia";
import { useEthers } from "vue-dapp";
import { oldBannerAbi } from "../consts/abis/old-banner-abi";
import { openseaAbi } from "../consts/abis/opensea-abi";

const { address, provider } = useEthers()

export const useBadges = defineStore({
    id: 'badges',
    state: () => {
        const badge1: BadgeData = {
            contract: import.meta.env.VITE_BANNER1,
            id: import.meta.env.VITE_BANNER1_ID,
            url: import.meta.env.VITE_BANNER1_URL,
            count: 0,
            name: "The Gotchi FArmy Gang #1",
            abi: openseaAbi
        }

            const badge2: BadgeData = {
            contract: import.meta.env.VITE_BANNER2,
            id: import.meta.env.VITE_BANNER2_ID,
            url: import.meta.env.VITE_BANNER2_URL,
            count: 0,
            name: "The Gotchi FArmy Gang #2",
            abi: openseaAbi
        }

        const badge3: BadgeData = {
            contract: import.meta.env.VITE_BANNER3,
            id: import.meta.env.VITE_BANNER3_ID,
            url: import.meta.env.VITE_BANNER3_URL,
            count: 0,
            name: "The Gotchi FArmy Gang #3",
            abi: openseaAbi
        }

        const badge4: BadgeData = {
            contract: import.meta.env.VITE_BANNER4,
            id: import.meta.env.VITE_BANNER4_ID,
            url: import.meta.env.VITE_BANNER4_URL,
            count: 0,
            name: "The Gotchi FArmy Gang #4",
            abi: oldBannerAbi
        }
        return {
            badge1,
            badge2,
            badge3,
            badge4,
            loaded: false
        }
    }, 
    actions: {
        async loadBadges() {
            this.badge1 = await loadBadge(this.badge1)
            this.badge2 = await loadBadge(this.badge2)
            this.badge3 = await loadBadge(this.badge3)
            this.badge4 = await loadBadge(this.badge4)
            this.loaded = true
        }
    }, 
    getters: {
        getBadgesArray(): Array<BadgeData> {
            return [
                this.badge1,
                this.badge2,
                this.badge3,
                this.badge4,
            ]
        }
    }
})

async function loadBadge(badge: BadgeData): Promise<BadgeData> {
    if (address.value && provider.value) {
        try {
            const contract = new ethers.Contract(badge.contract, badge.abi as ContractInterface, provider.value)
            const response = await contract.balanceOf(address.value, badge.id) as TransactionResponse
            if (typeof response._isBigNumber === 'boolean') {
                badge.count = response.toNumber()
            }
        } catch (e) {
            console.log(e)
        }
    }
    return badge
}

export type BadgeData = {
    contract: string
    id: string
    url: string
    name: string
    count: number
    abi: ContractInterface
}