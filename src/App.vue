<template>
  <div class="site">
    <Header @search-input="updateSearchQuery" />
    <main>
      <div class="hero">
        <div class="container">
          <h1 class="title-lg hero__title">Картины эпохи Возрождения</h1>

          <ul class="hero__list">
            <li v-for="artwork in filteredItems" :key="artwork.id">
              <article
                class="hero-item"
                :class="{ 'hero-item--sold': artwork.isSold }"
              >
                <img
                  class="hero-item__img"
                  :src="require(`@/assets/${artwork.img}`)"
                  :alt="artwork.title"
                  @click="openModal(artwork)"
                />
                <div class="hero-item__bottom">
                  <h2
                    class="title-md hero-item__title"
                    @click="openModal(artwork)"
                  >
                    {{ artwork.title }}
                  </h2>
                  <div class="hero-item__info" v-if="!artwork.isSold">
                    <div class="hero-item__price">
                      <del class="text-sm" v-if="artwork.oldPrice">{{
                        artwork.oldPrice
                      }}</del>
                      <span class="title-sm">{{ artwork.price }}</span>
                    </div>

                    <button
                      :class="buttonState(artwork.id)"
                      @click="handleClick(artwork.id)"
                      :disabled="buttonState(artwork.id) === 'processing'"
                      class="btn hero-item__btn"
                    >
                      <span v-if="buttonState(artwork.id) === 'default'">
                        Купить
                      </span>
                      <span v-if="buttonState(artwork.id) === 'processing'">
                        <img
                          :src="iconPreloader"
                          aria-hidden="true"
                          width="40"
                        />
                      </span>
                      <span v-if="buttonState(artwork.id) === 'btn--in-cart'">
                        <img
                          :src="iconCheck"
                          width="20"
                          height="20"
                          aria-hidden="true"
                        />
                        В корзине
                      </span>
                    </button>
                  </div>

                  <div class="title-sm hero-item__info" v-else>
                    Продана на аукционе
                  </div>
                </div>
              </article>
            </li>
          </ul>
        </div>
      </div>
    </main>
    <Footer />

    <Modal
      v-if="isModalVisible"
      :isVisible="isModalVisible"
      :artwork="selectedArtwork"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Modal from "./components/Modal.vue";
import iconCheck from "./assets/images/icon-check.svg";
import iconPreloader from "./assets/images/icon-preloader.svg";

export default {
  components: {
    Header,
    Footer,
    Modal,
  },
  data() {
    return {
      iconCheck,
      iconPreloader,
      searchQuery: "",
      artworks: [
        {
          id: 1,
          img: "images/1.png",
          imagesSlide: [
            "images/1.png",
            "images/2.png",
            "images/3.png",
            "images/4.png",
          ],
          title: "«Рождение Венеры» Сандро Боттичелли",
          price: "1 000 000 $",
          oldPrice: "2 000 000 $",
        },
        {
          id: 2,
          img: "images/2.png",
          imagesSlide: [
            "images/2.png",
            "images/3.png",
            "images/4.png",
            "images/1.png",
          ],
          title: "«Тайная вечеря»  Леонардо да Винчи",
          price: "3 000 000 $",
        },
        {
          id: 3,
          img: "images/3.png",
          imagesSlide: [
            "images/3.png",
            "images/4.png",
            "images/1.png",
            "images/2.png",
          ],
          title: "«Сотворение Адама» Микеланджело",
          price: "5 000 000 $",
          oldPrice: "6 000 000 $",
        },
        {
          id: 4,
          img: "images/4.png",
          imagesSlide: [
            "images/4.png",
            "images/1.png",
            "images/2.png",
            "images/3.png",
          ],
          title: "«Урок анатомии»  Рембрандт",
          price: "2 500 000 $",
          oldPrice: "3 000 000 $",
          isSold: true,
        },
      ],
      isModalVisible: false,
      selectedArtwork: null,
    };
  },
  computed: {
    ...mapGetters(["buttonState", "isInCart"]),
    filteredItems() {
      return this.artworks.filter((item) =>
        item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    ...mapActions(["processButton", "addToCart"]),
    updateSearchQuery(query) {
      this.searchQuery = query;
    },
    handleClick(id) {
      if (!this.isInCart(id)) {
        this.processButton({ id });
        setTimeout(() => {
          this.addToCart(id);
        }, 2000);
      }
    },
    openModal(artwork) {
      this.selectedArtwork = artwork;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import "assets/normalize.css";
@import "assets/index.css";

.site {
  background-color: #f6f3f3;
}

.hero {
  padding: 45px 0 328px;

  &__title {
    margin-bottom: 40px;
  }

  &__list {
    display: grid;
    gap: 32px;
    justify-items: center;

    & > li {
      display: grid;
    }

    @media (min-width: 576px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 992px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
      justify-items: flex-start;
    }
  }
}

.hero-item {
  max-width: 280px;
  border: 1px solid #e1e1e1;

  &--sold {
    opacity: 0.5;
  }

  &__img {
    margin-bottom: 20px;
    cursor: pointer;
  }

  &__bottom {
    padding: 0 24px 24px;
  }

  &__title {
    margin-bottom: 22px;
    cursor: pointer;
  }

  &__info {
    display: flex;
    align-items: flex-start;
    column-gap: 21px;

    &.title-sm {
      margin-top: 33px;
    }
  }

  &__price {
    display: grid;
    align-self: center;
    flex-shrink: 0;

    & > del {
      color: #a0a0a0;
    }
  }

  &__btn {
    & span {
      display: inline-flex;

      & img {
        margin-right: 4px;
      }
    }
  }
}
</style>
