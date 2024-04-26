<script setup>
import { gsap } from "gsap"
import QuestionIcon from "~/components/icons/IconQuestion.vue"
// const counter = useCounterStore()

const content = ref()
let cardWrap = ref([])
const card = ref([])
const randomIndex = ref()
const randomEmployeeArray = ref([])

let randomIndexArray = ref([])
let zIndex = ref(1)
let orignalPack = ref([])
const resultArray = ref([])
const resetBtn = ref()

// Fisher-Yates Shuffle
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)) //要加分號才不會報錯
    ;[array[i], array[j]] = [array[j], array[i]]
    // randomIndex.value = j
  }
}

const randomColor = () => {
  // 生成三個隨機的RGB值
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)

  // 將RGB值拼接成CSS顏色字串
  return `rgb(${r},${g},${b})`
}

const randomFontSize = () => {
  const fz = Math.floor(Math.random() * 32) + 32
  return `${fz}px`
}

const cardWrapRotation = () => {
  cardWrap.value.forEach((item, idx) => {
    gsap.to(item, {
      rotation:
        (idx * 360) / randomEmployeeArray.value.length +
        360 / randomEmployeeArray.value.length / 2,
      transform: "scale(1)",
    })
  })
}

const initPacks = () => {
  cardWrap.value.forEach((item, idx) => {
    gsap.set(item, {
      rotation:
        (idx * 360) / randomEmployeeArray.value.length +
        360 / randomEmployeeArray.value.length / 2,
      transform: "scale(1)",
      zIndex: zIndex.value,
    })
  })

  gsap.set(`.card`, {
    transform: "scale(1)",
    y: -200,
  })
}

const packsAnimation = () => {
  gsap.to(".packs", {
    rotate: 360,
    duration: 10,
    repeat: -1,
    repeatDelay: 0,
    ease: "linear",
  })
}

const handleRandom = () => {
  if (randomIndexArray.value.length > 0) {
    shuffle(randomIndexArray.value)
    let classNum = randomIndexArray.value.pop() + 1
    zIndex.value += 1

    gsap.set(`.card-${classNum} .photo`, {
      innerText: zIndex.value,
      fontSize: "32px",
    })
    gsap.set(`.card-wrap-${classNum}`, {
      zIndex: zIndex.value,
      // rotation: 0,
    })
    gsap.to(`.card-wrap-${classNum}`, {
      transform: "scale(1.5)",
      rotation: 0,
    })
    gsap.to(`.card-${classNum}`, {
      y: 0,
    })

    resultArray.value.push({
      順位: zIndex.value,
      data: randomEmployeeArray.value[classNum - 1],
    })
  }
}

const buttonMouseDown = (color, e) => {
  gsap.to(e.target, {
    backgroundColor: color,
    duration: 0.1,
    transform: "translate(0px,0px)",
    // x: 0,
    // y: 0,
  })
}

const buttonMouseUp = (e) => {
  gsap.to(e.target, {
    backgroundColor: "#fff",
    duration: 0.1,
    // transform: "translate(-2px,-2px)",
    x: -2,
    y: -2,
  })
}

const reset = () => {
  zIndex.value = 1
  shuffle(randomEmployeeArray.value)
  randomIndexArray.value = Array.from(
    { length: randomEmployeeArray.value.length },
    (_, i) => i
  )
  resetAnimation()
  initPacks()

  gsap.set(`.photo`, {
    innerHTML: orignalPack.value,
  })

  shuffle(randomIndexArray)
  resultArray.value = []
}

const resetAnimation = () => {
  gsap.set(".card-content", { rotate: 0 })
  gsap.to(".card-content", {
    rotate: 360,
    duration: 0.5,
    // repeat: -1,
    // repeatDelay: 0,
    ease: "linear",
  })
}

const getData = async () => {
  const employeeData = await $fetch("/api/employeeData")
  randomEmployeeArray.value = employeeData
}

onMounted(async () => {
  await getData()
  randomIndexArray.value = Array.from(
    { length: randomEmployeeArray.value.length },
    (_, i) => i
  )
  // content.value.style.backgroundColor = "#222"
  orignalPack.value = cardWrap.value[0].querySelector(".photo").innerHTML

  shuffle(randomEmployeeArray.value)
  initPacks()

  resetAnimation()
})
</script>

<template lang="pug">
.content(ref='content')
  .result-list
    TransitionGroup(name='list')
      .result(v-for="(data,idx) in resultArray" :class="`result-${idx+1}`" :key="data")
        .order 第 {{ data["順位"] }} 順位
        .name {{ data["data"]["name"] }}
  .card-content
    .card-wrap(ref="cardWrap" v-for="(data,idx) in randomEmployeeArray" :class='`card-wrap-${idx+1}`')
      Card( :data='data' :class='`card-${idx+1}`' ref='card') 
  .btns
    button(@click='handleRandom' @mousedown="buttonMouseDown('#ff004c',$event)" @mouseup="buttonMouseUp") 抽牌
    button(@click='reset' @mousedown="buttonMouseDown('#00fa9a',$event)" @mouseup="buttonMouseUp" ref="resetBtn" ) 洗牌

  .created
    p created by zz
</template>

<style lang="stylus">
.content
  size(,100vh)
  flex()
  overflow hidden
  .result-list
    size(auto,80%)
    position absolute
    top 0
    left 0
    // left 50%
    // transform translateX(-50%)
    flex(flex-start,,column)
    flex-wrap wrap
    padding 1rem
    .result
      size(80px,auto)
      margin-right 1rem
      margin-bottom 1rem
      flex(,,column)
      .order
        font-weight bold
    .result-1 .order
      color red
  .card-content
    flex()
    size()
    .card-wrap
      // size()
      size(auto)
      flex()
      // transform-origin 50% 50%
      padding 1rem
      // position relative
      position absolute
      z-index 1



  .btns
    z-index 100
    position absolute
    bottom 0
    right 0
    flex()
    padding 1rem
    button
      size(100px,40px)
      background none
      border 1px solid #000
      margin-left 1rem
      cursor pointer
      &:hover
        box-shadow 2px 2px 4px rgba(0,0,0,0.5)
        transform translate(-2px,-2px)

.list-enter-active,.list-leave-active
  transition all .5s ease

.list-enter-from,.list-leave-to
  opacity 0
  transform scale(0)

.created
  position absolute
  left 0
  bottom 0
  padding 1rem
</style>
