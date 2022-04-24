<template>
<div class="wrap-attachment-file">
    <div class="attachment-file">
        <div class="file">
            <img width="36" height="36" src="@/assets/icons-figma/file.svg" alt="">
        </div>
        <div class="preview">
            <h3 class="name" @click="handleClickName">
                <!-- Văn bản gốc đính kèm.docx -->
                {{data.file_name}}
            </h3>
            <p class="description">
                <!-- DOCX — 345 KB -->
                {{data.file_name.split('.')[data.file_name.split('.').length - 1]}} - {{data.id}}
            </p>
        </div>
    </div>
</div>
    
</template>
<script>
import {mapActions, mapState} from 'vuex'
export default {
    name: 'attachment-file-component',
    props: ['data'],
    computed: {
        ...mapState({
            currentPdfUrl: state => state.searchNewVersion.currentPdfUrl
        })
    },
    methods: {
        ...mapActions("searchNewVersion", ["setCurrentPdfUrl", "setCurrentDocUrl"]),
        handleClickName() {

            let extensionFile = this.data.file_name.split('.')[this.data.file_name.split('.').length - 1];
            // console.log(extensionFile);
            if (extensionFile == "doc" || extensionFile == "docx") {
                this.setCurrentDocUrl(this.data.url);
                // this.$router.push({name: "doc"});
                let routeData = this.$router.resolve({name: 'doc', query: {url: this.data.url} });
                window.open(routeData.href, '_blank');
            }
            else if (extensionFile == "pdf") {
                this.setCurrentPdfUrl(this.data.url)
                console.log(this.data.url)
                console.log(this.currentPdfUrl)
                // this.$router.push({name: "pdf"});


                // let routeData = this.$router.resolve({name: 'pdf',  query: {url: this.data.url}  });
                // window.open(routeData.href, '_blank');
            }
            
        },
    },
}
</script>
<style scoped>
.wrap-attachment-file {
    display: inline-block;
        margin-right: 10px;
    margin-top: 10px;
}
.file {
    display: inline-block;
    /* margin-top: 5px; */
}
.preview {
    display: inline-block;
    width: 137px;
}
.attachment-file {
    padding: 3px;
    width: 200px;
    background: #F8F0F0;
border-radius: 4px;
    /* margin-top: 12px;
    margin-right: 12px; */
    /* display: inline-block */
    display: flex;
     /* flex: 1 0 30%;  */
     /* explanation below */
  /* margin: 5px;
  height: 100px;
  background-color: blue; */
}
.name {
    cursor: pointer;
    font-family: 'Noto Sans SC';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 17px;
display: flex;
align-items: center;
font-feature-settings: 'tnum' on, 'lnum' on;

color: #363434;
word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
}
.description {
    text-transform: uppercase;
    font-family: 'Noto Sans SC';
font-style: normal;
font-weight: 400;
font-size: 11px;
line-height: 16px;
/* identical to box height */

display: flex;
align-items: center;
font-feature-settings: 'tnum' on, 'lnum' on;

color: #363434;
}
</style>