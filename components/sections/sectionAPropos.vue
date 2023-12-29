<template>
    <section class="aPropos">
        <h2><span class="bleu">Notre</span> association</h2>

        <ul class="aPropos_liste">
            <li v-for="membre in a_propos.data.membre">
                <cardMembre v-bind="membre"/>
            </li>
        </ul>

    </section>
</template>

<style lang="scss">
.aPropos{

    &_liste{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        gap: $m-medium $m-litle;
        margin: $m-medium 0;
        
        @include medium{
            gap: $m-big 200px;
            margin: $m-big 0;
        }
    }

}
</style>

<script setup>
// import de Prismic
const { client } = usePrismic();

// import du document A Propos
const { data: a_propos, error: a_propos_error } = await useAsyncData("a_propos", () =>
  client.getSingle("a_propos")
)
if (!a_propos.value || a_propos_error.value){
  throw createError({statusCode: 404, statusMessage: "Prismic n'a pas trouvé la section a_propos"})
}
</script>