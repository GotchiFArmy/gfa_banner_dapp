<script setup lang="ts">
import { BigNumber } from '@ethersproject/bignumber';
import { ethers } from 'ethers';
import { onBeforeMount, Ref, ref } from 'vue';
import { useApproves } from '../stores/approve';
import { useTx } from '../stores/tx';
import { erc20Abi } from '../consts/abis/erc20Abi';
import { useEthers } from 'vue-dapp';
import { useBadges } from '../stores/badges';
import { distributorAbi } from '../consts/abis/distributor-abi';
import { useI18n } from 'vue-i18n'
import TxStatus from './reusable/TxStatus.vue';

const approved = useApproves()
const badges = useBadges()
const tx = useTx()
const { address, signer } = useEthers()
const { t } = useI18n()

const inputGhst: Ref<Number|null> = ref<Number|null>(null)
const inputGhstField = ref(null)

onBeforeMount( async() => {
    await approved.loadApproveStatus()
})

const purchasing: Ref<boolean> = ref<boolean>(false)
const minPriceBn = BigNumber.from(import.meta.env.VITE_MIN_PRICE).mul(BigNumber.from(10).pow(18))

async function approveGhst(){

    if (!inputGhst.value || inputGhst.value < parseInt(import.meta.env.VITE_MIN_PRICE)) {
        alert(t('badges.approve.no_amount', { amount: import.meta.env.VITE_MIN_PRICE }))
        inputGhstField.value.focus()
       
    } else if (address.value && signer.value) {
        const ghst = new ethers.Contract(import.meta.env.VITE_GHST, erc20Abi, signer.value)
        ghst.connect(signer.value)
        await tx.execTx2(
            ghst, 
            'approve', 
            [
                import.meta.env.VITE_DISTRIBUTOR, 
                BigNumber.from(inputGhst.value).mul(BigNumber.from(10).pow(18))
            ], 
            t('badges.approve.tx_title', { amount: inputGhst.value})
        )
        await approved.loadApproveStatus()
    }
}

async function collectBanner(){
    if (!inputGhst.value || inputGhst.value < parseInt(import.meta.env.VITE_MIN_PRICE)) {
        alert(t('badges.purchase.no_amount', { amount: import.meta.env.VITE_MIN_PRICE }))
        inputGhstField.value.focus()
       
    } else if (address.value && signer.value) {
        purchasing.value = true
        const bannerContract = new ethers.Contract(import.meta.env.VITE_DISTRIBUTOR, distributorAbi, signer.value)
        bannerContract.connect(signer.value)
        await tx.execTx2(
            bannerContract, 
            'distribution', [
                1,
                BigNumber.from(inputGhst.value).mul(BigNumber.from(10).pow(18))
            ],
            t('badges.purchased.tx_title')
        )
        if (Object.keys(tx.txReceipt).length > 0 && tx.txReceipt.status != 0) {
            badges.purchased = true
        }
        purchasing.value = false
        await badges.loadBadges()
    }
}


/**
 * Check conditions to decide if we display approve or purchase buttons
 */
function validatePurchaseConditions() {
    
    // Input is empty but 10GHST to spend is already approved
    const minPriceBn = BigNumber.from(import.meta.env.VITE_MIN_PRICE).mul(BigNumber.from(10).pow(18))
    if (!inputGhst.value && minPriceBn.lte(approved.banner4)) {
        return true
    }

    // Input contains an int > 10 and that same amount has been approved
    if (Number.isInteger(inputGhst.value) && BigNumber.from(inputGhst.value).mul(BigNumber.from(10).pow(18)).lte(approved.banner4)) {
        return true
    }

    // Input contains a float > 10 and Input has less than 6 decimals and that same amount has been approved
    if (inputGhst.value && !Number.isInteger(inputGhst.value) && !Number.isNaN(inputGhst.value)) {
        const countDecimals = inputGhst.value.toString().split('.')[1].length
        const inputGhstAsBn = BigNumber.from(inputGhst.value * Math.pow(10, countDecimals)).mul(BigNumber.from(10).pow(18-countDecimals))
        if (inputGhstAsBn.lte(approved.banner4)) {
            return true
        }
    }
    return false
}

</script>

<template>
    <div class="flex flex-row items-center mt-4">
        <p class="mr-4">{{ $t('badges.purchase.input') }}</p>
        <input 
            placeholder="50"
            type="number" 
            v-model="inputGhst" 
            ref="inputGhstField"
            class="input-gfa"
        />
    </div>
    <template v-if="approved.loaded">
        <!-- <div v-if="(!inputGhst && approved.banner4.lt(minPriceBn))
            || (inputGhst && approved.banner4.lt(BigNumber.from(inputGhst).mul(BigNumber.from(10).pow(18))))"
        > -->
        <div v-if="validatePurchaseConditions()">
            <div v-if="!purchasing" class="flex flex-row place-content-center my-6">
                <button class="button" @click="collectBanner">{{ $t('badges.purchase.button') }}</button>
            </div>
        </div>
        <div v-else>
            <p class="text-base mt-4">{{ $t('badges.approve.intro') }}</p>
            <div class="flex flex-row place-content-center my-6">
                <button class="button" @click="approveGhst">{{ $t('badges.approve.button') }}</button>
            </div>
        </div>
    </template>
    <TxStatus />
</template>