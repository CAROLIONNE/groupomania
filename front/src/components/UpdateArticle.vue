<template>
<!-- TO DO afficher seulement si c'est l'utilisateur qui l'a créer -->
    <div id="mod">
          <button id="update-btn" v-on:click="show()">
            Modifier l'article
          </button>
          <button id="delete-btn" v-on:click="deleteArticle()">
            Supprimer l'article
          </button>
          <form @submit.prevent="updateAll($event, article.id)">
            <fieldset id="container_update" v-if="showUpdate">
              <legend><h2>Modification</h2></legend>
              <label>Titre : </label>
              <input type="text" v-model.trim="article.titre" />
              <label>Texte : </label>
              <input type="text" v-model.trim="article.text" />
              <input
                id="file"
                type="file"
                name="image"
                v-on:change="fileChange"
              />
              <!-- <input type="submit" name="image" v-on:click="updateImage()" /> -->
              <!-- <input type="submit" value="Sauvegarder" @click="update()" /> -->
              <input type="submit" value="Sauvegarder" />
              <p class="error" v-if="errors">{{ errors }}</p>
              <p class="valid" v-if="valid">{{ valid }}</p>
            </fieldset>
          </form>
        </div>
</template>