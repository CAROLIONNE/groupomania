<template>
<div>
    <h1> Cette page est introuvable </h1>
    <p>
    Redirection vers la page de connexion
    <router-link to="/" >
     ici
    </router-link>
    </p>
    <!-- si utilisateur connecté afficher-->
    <p>
    Redirection vers le fil d'actualité 
    <router-link :to="{ name: 'FilActu' }">
     ici
    </router-link>
    </p>
    <router-view />
</div>
</template>