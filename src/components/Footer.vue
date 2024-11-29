<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__wrap">
        <Menu />

        <div class="footer__contacts">
          <a class="text-md" href="tel:+78125555555">
            <img :src="iconPhone" width="16" height="16" aria-hidden="true" />
            +7 (812) 555-55-55
          </a>
          <div class="text-md">
            <img :src="iconAdress" width="16" height="16" aria-hidden="true" />
            г. Санкт-Петербург, ул. Ефимова, 3
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import Menu from "./Menu.vue";
import iconPhone from "@/assets/images/icon-phone.svg";
import iconAdress from "@/assets/images/icon-adress.svg";

export default {
  name: "Footer",
  components: {
    Menu,
  },
  data() {
    return {
      iconPhone,
      iconAdress,
    };
  },
};
</script>

<style scoped lang="scss">
.footer {
  padding: 37px 0;

  &__wrap {
    display: grid;
    align-items: center;
    justify-items: center;
    row-gap: 24px;

    @media (min-width: 1200px) {
      display: flex;
      justify-content: space-between;
    }
  }

  &__contacts {
    display: flex;
    flex-wrap: wrap;
    column-gap: 48px;
    row-gap: 12px;

    & > * {
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;

      & img {
        margin-right: 8px;
      }
    }
  }
}
</style>
