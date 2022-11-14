import { TransactionReceipt, TransactionResponse } from '@ethersproject/abstract-provider'
import { BigNumber, Contract } from 'ethers'
import { defineStore } from 'pinia'
import { useEthers } from 'vue-dapp'

export const useTx = defineStore({
    id: 'tx',
    state: () => {
        //const txResponse:TransactionResponse | null = null
        const txResponse = {} as TransactionResponse
        const txReceipt = {} as TransactionReceipt
        const show:boolean = false
        const txException:any = null
        const txTitle:string = ""

        return {
            txResponse: txResponse,
            txReceipt: txReceipt,
            show: false,
            txException: txException,
            txTitle: txTitle
        }
    }, 
    actions: {
        reset() {
            this.$state.show = false
            this.$state.txResponse = {} as TransactionResponse
            this.$state.txReceipt = {} as TransactionReceipt
            this.$state.txException = null
        },
        error() {
            window.setTimeout( () => this.$reset, 5000)
        },
        async execTx( txCall: () => Promise<TransactionResponse>, title: string = '', closeOnSuccess: boolean = true ) {
            const { signer } = useEthers()
            if (signer.value) {
                try {
                    this.reset()
                    this.txTitle = title
                    //const contract = new ethers.Contract(env.aavegotchiFarmContract, aavegotchiFarmAbi, signer.value)
                    //contract.connect(signer.value)
                    this.show = true
                    const response = await txCall()
                    this.txResponse = response
                    const receipt = await response.wait()
                    this.txReceipt = receipt                    

                } catch (e) {
                    console.log(e)
                    this.txException = e
                    // this.reset()
                }
                if (closeOnSuccess) {
                    await delay(3000)
                    this.show = false
                }
            }
        },
        async execTx2( contract: Contract, method: string, args: Array<any> = [], title: string = '', closeOnSuccess: boolean = true ) {
            const { signer } = useEthers()
            if (signer.value) {
                try {
                    this.reset()
                    this.txTitle = title
                    this.show = true
                    this.txResponse = await contract[method](...args)                    
                    if (this.txResponse) {
                        this.txReceipt = await this.txResponse.wait()   
                    }                 
                } catch (e) {
                    console.log(e)
                    this.txException = e
                    this.reset()
                }
                if (closeOnSuccess) {
                    await delay(3000)
                    this.show = false
                }
            }
        }
    }, 
    getters: {
        getTxScanUrl(state): string {
            if (state.txResponse?.hash) {
                return import.meta.env.VITE_NETWORK_SCAN+state.txResponse.hash
            }
            return '#'
        }
    }
})

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}