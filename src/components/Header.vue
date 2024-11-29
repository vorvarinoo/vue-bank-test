<template>
  <header class="header">
    <div class="container">
      <div class="header__wrap">
        <Menu />
        <div class="search">
          <input
            class="search__input"
            v-model="searchQuery"
            @input="onSearch"
            type="search"
            placeholder="Поиск по названию картины"
          /><button class="btn search__btn" type="button">Найти</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Menu from "./Menu.vue";

export default {
  name: "Header",
  components: {
    Menu,
  },
  data() {
    return {
      searchQuery: "", 
    };
  },
  methods: {
    onSearch() {
      this.$emit("search-input", this.searchQuery);
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  padding: 24px 0;
  border-bottom: 1px solid #e1e1e1;

  &__wrap {
    display: grid;
    justify-items: center;
    row-gap: 24px;

    @media (min-width: 1200px) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 47px;
    }
  }
}

.search {
  display: grid;
  width: 100%;

  @media (min-width: 576px) {
    display: flex;
    width: auto;
  }

  &__input {
    border: 1px solid #e1e1e1;

    padding: 14px 16px;
    font-weight: 400;
    font-size: 14px;
    color: var(--outer-space-color);
    background-color: transparent;
    width: 100%;
    transition: border-color var(--tr-speed-medium) ease-in-out;
    outline: none;

    @media (min-width: 576px) {
      min-width: 300px;
      border-right: none;
    }

    &:focus-visible {
      border-color: #b5b5b5;
    }

    &::placeholder {
      color: #9f9f9f;
    }
  }
}
</style>
