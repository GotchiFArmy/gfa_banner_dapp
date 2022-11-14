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
import TxStatus from './reusable/TxStatus.vue';

const approved = useApproves()
const badges = useBadges()
const tx = useTx()
const { address, signer } = useEthers()

const inputGhst: Ref<Number> = ref<Number>(10)

onBeforeMount( async() => {
    await approved.loadApproveStatus()
})

async function approveGhst(){
    if (address.value && signer.value) {
        const ghst = new ethers.Contract(import.meta.env.VITE_GHST, erc20Abi, signer.value)
        ghst.connect(signer.value)
        await tx.execTx2(
            ghst, 
            'approve', 
            [
                import.meta.env.VITE_DISTRIBUTOR, 
                BigNumber.from(inputGhst.value).mul(BigNumber.from(10).pow(18))
            ], 
            `Approuver la dépense de ${inputGhst.value} GHST`
        )
        await approved.loadApproveStatus()
    }
}

async function collectBanner(){
    if (address.value && signer.value) {
        const bannerContract = new ethers.Contract(import.meta.env.VITE_DISTRIBUTOR, distributorAbi, signer.value)
        bannerContract.connect(signer.value)
        await tx.execTx2(
            bannerContract, 
            'distribution', [
                1,
                BigNumber.from(inputGhst.value).mul(BigNumber.from(10).pow(18))
            ],
            `Insigne GFA en cours de distribution`
        )
        await badges.loadBadges()
    }
}

</script>

<template>
    Montant en GHST (10 minimum)<input type="number" v-model="inputGhst" @change=""/>
    <div v-if="approved.banner4.lt(BigNumber.from(inputGhst).mul(BigNumber.from(10).pow(18)))">
        Avant de pouvoir acheter l'insigne, vous devez signer une première transaction pour autoriser notre contrat à prélever des GHST sur votre wallet
        <br />
        <button @click="approveGhst">Approuver</button>
    </div>
    <div v-else>
        <button @click="collectBanner">Acheter l'insigne</button>
    </div>
    <TxStatus />
</template>