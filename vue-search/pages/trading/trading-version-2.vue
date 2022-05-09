<template>
  <div class="hello">
    <VueTradingView :options="{
      symbol: 'NASDAQ:AAPL',
      theme: 'dark',
      hide_side_toolbar: false,
      width: 1536,
      height: 753,
    }" />
  </div>
</template>

<script>
import VueTradingView from 'vue-trading-view';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    VueTradingView,
  },
  data() {
      return {
          tempWidth: "100%"
      }
  }
}
</script>