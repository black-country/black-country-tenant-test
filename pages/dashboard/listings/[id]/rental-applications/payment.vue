<template>
    <main>
        <TopNavBar />
        <PaymentTransfer v-if="route.query.method === 'transfer'" />
        <PaymentCard v-if="route.query.method === 'card'" />
        <PaymentBank v-if="route.query.method === 'bank'" />
    </main>
</template>

<script setup lang="ts">
const route = useRoute()
</script>