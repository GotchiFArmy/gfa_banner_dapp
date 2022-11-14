<script setup lang="ts">
    import { useTx } from '../../stores/tx'

    const tx = useTx()
</script>
<template>
    <template  v-if="tx.show">
        <p v-if="tx.txTitle != ''">
            {{ tx.txTitle }}
        </p>
        <div v-if="tx.txException != null">
            <p>Error during transaction</p>
            <p v-if="typeof tx.txException.message == 'string'" class="text-error">
                {{ tx.txException.message }}
            </p>
        </div>
        <p v-else-if="Object.keys(tx.txReceipt).length == 0 && Object.keys(tx.txResponse).length == 0">
            Please validate the transaction in your wallet
        </p>
        <p v-else-if="Object.keys(tx.txReceipt).length == 0">
            Transaction in progress        
        </p>
        <p v-else-if="Object.keys(tx.txReceipt).length > 0 && tx.txReceipt.status != 0">
            Transaction has succeeded
        </p>
        <p v-else>
            Transaction has failed
        </p>
        <div v-if="tx.txResponse != null">
            <p>Transaction hash: {{ tx.txResponse.hash }}</p>
            <a target="blank" :href="tx.getTxScanUrl">
                See the tx in polygonscan
            </a>
        </div>
    </template>
</template>