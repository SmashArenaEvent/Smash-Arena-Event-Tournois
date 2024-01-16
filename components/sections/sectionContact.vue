<template>
  <section class="my_section">
    <h2><span class="bleu">nous</span> contacter</h2>

    <form
      class="formulaire"
      action="https://api.web3forms.com/submit"
      method="POST"
    >
      <input
        type="hidden"
        name="access_key"
        value="2e16caef-865b-4105-80bf-cafccea701be"
      />

      <div class="formulaire_section1">
        <div class="formulaire_section1_div1">
          <input
            type="text"
            placeholder="Nom "
            class="input1"
            name="nom"
            required
          />
        </div>

        <div class="formulaire_section1_div2">
          <input
            type="email"
            class="input2"
            placeholder="Email "
            name="email"
            required
          />
        </div>
      </div>

      <div class="formulaire_section2">
        <textarea
          placeholder="Message"
          rows="8"
          class="formulaire_section2_textarea"
          name="message"
          required
        ></textarea>
      </div>

      <div class="formulaire_boutons">
        <button
          name="redirect"
          value="https://web3forms.com/success"
          type="submit"
          class="banger"
        >
          <h6 class="banger-text">Envoyer</h6>
        </button>

        <myButton class="hero_btn" url="/foire-aux-questions" size="big">F.A.Q </myButton>
      </div>
    </form>
  </section>
</template>

<style lang="scss">
.formulaire {
  width: 83vw;
  margin: auto;

  &_section1 {
    display: flex;
    flex-wrap: wrap;

    @include medium {
      flex-wrap: nowrap;
      gap: 50px;
    }

    &_div1 {
      width: 100vw;
      margin-bottom: 35px;

      @include medium {
        width: 50%;
      }
    }

    &_div2 {
      width: 100vw;
      margin-bottom: 35px;

      @include medium {
        width: 50%;
      }
    }
  }

  &_section2 {
    display: flex;
    flex-wrap: wrap;

    &_textarea {
      width: 100%;
      display: block;
      margin-top: 15px;
      margin-bottom: 20px;
      padding: 10px 15px;
      background: none;
      border: none;
      border-bottom: 2px solid $color-white;
      color: $color-white;

      @include medium {
        border-left: 2px solid $color-white;
      }
    }
  }

  &_boutons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    align-items: center;

    .banger {
      padding: $m-litle $m-small + 15;
      min-width: 150px;
      flex: none;
      display: inline-flex;

      height: fit-content;
      transform: skewX(-25deg);
      text-align: center;
      background: $color-main;
      color: $color_white;
      transition: all 0.1s linear;
      cursor: pointer;

      &-text {
        width: 100%;
        transform: skewX(25deg);
      }

      &:hover {
        background: $color-main_darken;
      }

    }

    @include medium {
      justify-content: flex-start;

      .banger{
        padding: $m-litle $m-litle + 15;
      }
    }
  }

  .input2,
  .input1 {
    width: 100%;
    display: block;
    margin-top: 15px;
    margin-bottom: 20px;
    padding: 10px 15px;
    background: none;
    border: none;
    border-bottom: 2px solid $color-white;
    color: $color-white;
  }
}

input,
textarea{
  &:focus{
    outline: 2px solid $color-main;
  }
}
</style>
