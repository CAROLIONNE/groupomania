<template>
  <div id="app">
    <editor
      api-key="b7vz3gtuzy2c28rt2axsmshdeh5dfh1vftz3x9tvoqg12057"
      :init="{
        height: 200,
        menubar: false,
        plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ],
      }"
       initial-value="Welcome to TinyMCE Vue"
       v-model="text"
    />
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'TinyMCE',
  components: {
    'editor': Editor
  },
  props: [text]
}
</script>

