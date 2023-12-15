<template>
    <div>
        <MyInitials :initials="initials"/>
        <PrismicImage :field="photo" />
        <PrismicRichText :field="prenom" />
        <PrismicRichText :field="nom" />
        <PrismicRichText :field="adjectif" />
        <PrismicRichText :field="role" />
    </div>
</template>

<style lang="scss">

</style>

<script setup>
const props = defineProps({
    initials: String,
    photo: String,
    prenom: String,
    nom: String,
    adjectif: String,
    role: String,
})
</script>