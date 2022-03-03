<template>
  <div>
    <h1>Creation de post</h1>
    <div id="new_article">
      <textarea id="article_text" name="text" rows="5" cols="33">
        Ecrivez votre texte ici
      </textarea>
      <input type="file" />
      <button type="submit" id="btn_submit">Publier</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewArticle",
  data() {
    return {
      msg: "",
    };
  },
  methods: {},
};
</script>

<style>
h1 {
  text-align: center;
  padding: 1em;
}
#new_article {
  width: 40%;
  background: #a3eeff;
  height: 17em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  border-radius: 3em;
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
}
#article_text {
  width: 80%;
  padding: 1em;
  margin: 1em;
}
input {
  margin: 1em;
}

#btn_submit {
  width: 30%;
  appearance: none;
  background-color: transparent;
  border: 2px solid #1A1A1A;
  border-radius: 15px;
  box-sizing: border-box;
  color: #3B3B3B;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  min-height: 60px;
  min-width: 0;
  outline: none;
  padding: 16px 24px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  /* width: 100%; */
  will-change: transform;
}

#btn_submit:disabled {
  pointer-events: none;
}

#btn_submit:hover {
  color: #fff;
  background-color: #1A1A1A;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

#btn_submit:active {
  box-shadow: none;
  transform: translateY(0);
}
</style>
