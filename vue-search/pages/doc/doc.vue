<template>
  <div>
    <p>Test doc file!</p>

    <VueDocPreview :docValue="this.$route.query.url" :docType="type" :height="80" />
  </div>
</template>

<script>
import VueDocPreview from "../../components/components-new-version-2/DocPreviewComponent.vue";
import {mapState} from 'vuex'
export default {
  components: {
    VueDocPreview,
  },
  computed: {
        ...mapState({
            docUrl: state => state.searchNewVersion.currentDocUrl
        })
    },
    created() {
        console.log(this.$route.query.url)
    },
  data: function () {
    return {
      greeting: "HELLO",
      text: "https://searchapi.chinhta123.com/static/36496515-QÐ-BVHTTDL/3635322027933756.doc",
      type: "office",
    };
  },
};
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>