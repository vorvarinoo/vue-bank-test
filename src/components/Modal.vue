<template>
  <div class="modal" v-if="isVisible">
    <div class="modal__overlay" @click="closeModal"></div>
    <div class="modal__content">
      <button class="modal__close" @click="closeModal">
        <img :src="iconClose" width="40" height="40" aria-hidden="true" />
      </button>
      <div class="modal__body">
        <div class="modal__details">
          <h2 class="title-lg">{{ artwork.title }}</h2>
          <p class="text-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum officia
            tempora eos modi nam blanditiis neque amet hic esse
          </p>
          <div class="text-lg modal__price">
            <div v-if="artwork.oldPrice">
              Старая цена: <del>{{ artwork.oldPrice }}</del>
            </div>
            Новая цена: <span>{{ artwork.price }}</span>
          </div>

          <div v-if="artwork.isSold" class="title-md">Продана на аукционе</div>
        </div>
        <Swiper
          :slidesPerView="1"
          :spaceBetween="10"
          :loop="true"
          class="swiper-container"
        >
          <SwiperSlide
            v-for="(image, index) in artwork.imagesSlide"
            :key="index"
          >
            <img :src="image" :alt="artwork.title" class="swiper-image" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import iconClose from "../assets/images/icon-close.svg";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    artwork: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      iconClose,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  &__content {
    background-color: white;
    padding: 20px;
    max-width: 600px;
    border-radius: 8px;
    position: relative;
  }

  &__close {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .swiper-container {
    width: 100%;
    height: 300px;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 100%;
      width: 100%;
      max-height: 100%;
    }
  }

  &__title {
    margin-bottom: 10px;
  }

  &__details {
    margin-bottom: 24px;
  }

  &__price {
    margin-bottom: 16px;
  }
}
</style>
