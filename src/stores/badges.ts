import { TransactionResponse, Web3Provider } from "@ethersproject/providers";
import { ContractInterface, ethers } from "ethers";
import { Network } from "@ethersproject/networks";
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
            name: "Gotchi FArmy Gang #1",
            abi: openseaAbi
        }

        const badge2: BadgeData = {
            contract: import.meta.env.VITE_BANNER2,
            id: import.meta.env.VITE_BANNER2_ID,
            url: import.meta.env.VITE_BANNER2_URL,
            count: 0,
            name: "Gotchi FArmy Gang #2",
            abi: openseaAbi
        }

        const badge3: BadgeData = {
            contract: import.meta.env.VITE_BANNER3,
            id: import.meta.env.VITE_BANNER3_ID,
            url: import.meta.env.VITE_BANNER3_URL,
            count: 0,
            name: "Gotchi FArmy Gang #3",
            abi: openseaAbi
        }

        const badgeGold: BadgeData = {
            contract: import.meta.env.VITE_BANNER_GOLD,
            id: import.meta.env.VITE_BANNER_GOLD_ID,
            url: import.meta.env.VITE_BANNER_GOLD_URL,
            count: 0,
            name: "Gotchi FArmy Gang VIP",
            abi: openseaAbi
        }

        const badge4: BadgeData = {
            contract: import.meta.env.VITE_BANNER4,
            id: import.meta.env.VITE_BANNER4_ID,
            url: import.meta.env.VITE_BANNER4_URL,
            count: 0,
            name: "Gotchi FArmy Gang #4",
            abi: oldBannerAbi
        }
        return {
            badge1,
            badge2,
            badge3,
            badge4,
            badgeGold,
            remainingBadge4: 0,
            loaded: false,
            purchased: false
        }
    },
    actions: {
        async loadBadges() {
            this.badge1.count = await loadBadgesCount(this.badge1)
            this.badge2.count = await loadBadgesCount(this.badge2)
            this.badge3.count = await loadBadgesCount(this.badge3)
            this.badge4.count = await loadBadgesCount(this.badge4)
            this.badgeGold.count = await loadBadgesCount(this.badgeGold)
            this.remainingBadge4 = await loadBadgesCount(this.badge4, import.meta.env.VITE_DISTRIBUTOR)
            this.loaded = true
        },
        async loadRemainingBadges() {
            this.remainingBadge4 = await loadBadgesCount(this.badge4, import.meta.env.VITE_DISTRIBUTOR)
        }
    },
    getters: {
        getBadgesArray(): Array<BadgeData> {
            return [
                this.badge1,
                this.badge2,
                this.badge3,
                this.badgeGold,
                this.badge4,
            ]
        }
    }
})

async function loadBadgesCount(badge: BadgeData, wallet: string = address.value): Promise<number> {
    let count = 0
    let toUseProvider
    if (!provider.value) {
        const matic: Network = {
            name: 'matic',
            chainId: parseInt(import.meta.env.VITE_NETWORK_ID),
            _defaultProvider: (providers) => new providers.JsonRpcProvider(import.meta.env.VITE_NETWORK_RPC)
        }
        toUseProvider = ethers.getDefaultProvider(matic);
    } else {
        toUseProvider = provider.value
    }

    try {
        const contract = new ethers.Contract(badge.contract, badge.abi as ContractInterface, toUseProvider)
        const response = await contract.balanceOf(wallet, badge.id) as TransactionResponse
        if (typeof response._isBigNumber === 'boolean') {
            count = response.toNumber()
        }
    } catch (e) {
        console.log(e)
    }
    return count
}

// function buildBadgeImg(id:string, width:number): string {
//     return `import.meta.env.VITE_OPENSEA_IMG_URL/${id}?w=${width.toString()}&auto=format`
// }

export type BadgeData = {
    contract: string
    id: string
    url: string
    name: string
    count: number
    abi: ContractInterface
}