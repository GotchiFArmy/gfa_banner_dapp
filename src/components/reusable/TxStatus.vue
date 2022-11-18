<script setup lang="ts">
    import { useTx } from '../../stores/tx'

    const tx = useTx()
</script>
<template>
    <div  v-if="tx.show" class="border-2 border-gfa-500 p-4 my-4">
        <p v-if="tx.txTitle != ''">
            {{ tx.txTitle }}
        </p>
        <div v-if="tx.txException != null">
            <p>{{ $t('tx.exception') }}</p>
            <p v-if="typeof tx.txException.message == 'string'" class="text-error">
                {{ tx.txException.message }}
            </p>
        </div>
        <p v-else-if="Object.keys(tx.txReceipt).length == 0 && Object.keys(tx.txResponse).length == 0">
            {{ $t('tx.validate')}}
        </p>
        <p v-else-if="Object.keys(tx.txReceipt).length == 0">
            {{ $t('tx.in_progress') }}        
        </p>
        <p v-else-if="Object.keys(tx.txReceipt).length > 0 && tx.txReceipt.status != 0">
            {{ $t('tx.success') }}
        </p>
        <p v-else>
            {{ $t('tx.failed') }}
        </p>
        <div v-if="tx.txResponse.hash != null">
            <p>{{ $t('tx.hash') }}: {{ tx.txResponse.hash }}</p>
            <a target="blank" :href="tx.getTxScanUrl">
                {{ $t('tx.scan') }}
            </a>
        </div>
    </div>
</template>