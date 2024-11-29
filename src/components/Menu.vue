<template>
  <nav class="menu">
    <ul class="menu__list">
      <li v-for="item in menuItems" :key="item.id">
        <a class="text-md" :href="item.href">{{ item.title }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Menu",

  data() {
    return {
      menuItems: [
        {
          id: 1,
          title: "Каталог",
          href: "#",
        },
        {
          id: 2,
          title: "Доставка",
          href: "#",
        },
        {
          id: 3,
          title: "Оплата",
          href: "#",
        },
        {
          id: 4,
          title: "Контакты",
          href: "#",
        },
        {
          id: 5,
          title: "О компании",
          href: "#",
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.menu {
  @media (min-width: 1200px) {
    padding-left: 96px;
  }

  &__list {
    display: flex;
    column-gap: 48px;
    row-gap: 12px;
    flex-wrap: wrap;
  }
}
</style>
