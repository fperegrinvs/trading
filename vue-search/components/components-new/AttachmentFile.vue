<template>
    <div class="attachment-file">
        <div class="file">
            <img src="@/assets/icons-figma/file.svg" alt="">
        </div>
        <div class="preview">
            <h3 class="name">
                <!-- Văn bản gốc đính kèm.docx -->
                {{data.downname}}
            </h3>
            <p class="description">
                <!-- DOCX — 345 KB -->
                {{data.downname.split('.')[data.downname.split('.').length - 1]}} - {{data.size}}
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'attachment-file-component',
    props: ['data']
}
</script>
<style scoped>
.file {
    display: inline-block;
    margin-top: 5px;
}
.preview {
    display: inline-block;
}
.attachment-file {
    width: 200px;
    background: #F8F0F0;
border-radius: 4px;
    margin-top: 12px;
    margin-right: 12px;
    display: inline-block
     /* flex: 1 0 30%;  */
     /* explanation below */
  /* margin: 5px;
  height: 100px;
  background-color: blue; */
}
.name {
    font-family: 'Noto Sans SC';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 17px;
display: flex;
align-items: center;
font-feature-settings: 'tnum' on, 'lnum' on;

color: #363434;
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