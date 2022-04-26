<template>
<button @click="addComment"> {{ name }} {{}}</button>

</template>

<script>
export default {
  name: 'BtnWhite',
  props: ['name', 'show', 'addComment'],
}
</script>

<style>
button {
  background-color: #ffffff;
  border: 1px solid #222222;
  border-radius: 8px;
  box-sizing: border-box;
  color: #222222;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  margin: 0;
  outline: none;
  padding: 13px 23px;
  position: relative;
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  transition: box-shadow 0.2s, -ms-transform 0.1s, -webkit-transform 0.1s,
  transform 0.1s;
  user-select: none;
  -webkit-user-select: none;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5em;
  margin: 0.5em;
}

button {
  border: 2px solid black
}

button:hover {
  background-color: #f7f7f7;
  border-color: #000000;
  transform: scale(0.96);
}

</style>