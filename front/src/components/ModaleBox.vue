<template>
    <div id="bloc-modale" v-if="show">
        <div class="overlay" @click="toggleModale"></div>
        <div class="modale">
            <div class="btn-modale" @click="toggleModale">X</div>
            <h2>{{ message }}</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModaleBox',
    props: ['show', 'toggleModale', "message"]
}
</script>
<style scoped>
#bloc-modale {
    z-index: 10;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.overlay {
    background: rgba(0, 0, 0, 0.4);
    position:fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}
.modale {
    background: #f1f1f1;
    color: #333;
    padding: 50px;
    position: fixed;
    top: 30%;
    border-radius: 0.5em;

}
.btn-modale {
    font-weight: bold;
    padding: 1%;
    color: #f1f1f1;
    background-color:red;
    position: absolute;
    top: 5px;
    right: 5px;
    border-radius: 0.2em;
    cursor: pointer;
}
</style>
