<template>
  <div class="succes">
    <div class="succes_div1">
      <h1 class="succes_title"><span class="bleu">M</span>essage <span class="bleu">E</span>nvoyé</h1>
      <p class="succes_description">
        Votre mail a bien été transmis. Nous vous répondrons dans les prochains
        jours.
      </p>

      <myButton url="/" size="big" color="blue" class="button1">Retourner à l'accueil</myButton>
    </div>

    <div class="succes_div2">
      <img
        class="succes_div2_image"
        src="/img/letter.webp"
        alt="image representant une lettre avec le logo de super smash bros"
      />
    </div>

    <myButton url="/" size="big" color="blue" class="button2">Retourner à l'accueil</myButton>
  </div>
</template>

<style lang="scss">
.succes {
  @include medium {
    display: flex;
  }

  &_title {
    text-align: center;
    margin-bottom: $m-litle;
    
    @include medium{
      margin: 0;
    }
  }

  &_description {
    @include p;
    text-align: center;
  }

  &_div1 {
    @include medium {
      width: 45%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      gap: $m-small;
    }
  }

  &_div2 {
    @include medium {
      margin: auto;
    }

    &_image {
      margin: $m-medium 0;

      @include medium {
        width: 43vw;
      }
    }
  }
}

.button1 {
  display: none;

  @include medium {
    display: block;
  }
}

.button2 {
  width: fit-content;
  margin: $m-small auto;

  @include medium {
    display: none;
  }
}
</style>

<script></script>
