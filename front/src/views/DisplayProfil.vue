<template> 
<div>
    <div id="page">
        <div class="content">
            <UserProfil />
            <div> <ProfilUpdate /> </div>
        </div>
    </div>
</div>
</template>

<script>
import UserProfil from '../components/UserProfil.vue'
import ProfilUpdate from '../components/ProfilUpdate.vue'

export default {
    components: { UserProfil, ProfilUpdate},
    data() {
        
    }
}
</script>

<style>
#page {
    display : flex;
    flex-direction: column;
    align-items: center;
}
</style>