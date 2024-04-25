<script setup>
import QuestionIcon from "./icons/IconQuestion.vue"

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template lang="pug">
.card
  .photo
    QuestionIcon
  .name {{ props.data.name }}
    //- h3 {{ props.data.name }}
</template>

<style lang="stylus" scoped>
.card
  size(64px,90px)
  position absolute
  background-color #fff
  border 1px solid #000
  border-radius 8px
  overflow hidden
  flex(flex-start,,column)
  margin 1rem
  z-index 1
  cursor pointer
  transition all .5s ease
  &:hover
    transform translate(0,-20px)
  .photo
    size(,60%)
    background-color #eee
    flex()
    svg
      size(32px)
  .name
    size(,40%)
    flex()
</style>
