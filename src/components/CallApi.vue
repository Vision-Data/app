<template>
<div class="select">
    <select v-model="choice" :required="true" class="select select-bordered w-full max-w-xs">
        <option value="GET">⇲ Recevoir (GET)</option>
        <option value="POST">➤ Envoyer (POST)</option>
        <option value="DELETE">🗑 Supprimer (DELETE)</option>
        <option value="UPDATE">⛭ Modifier (UPDATE)</option>
    </select>
    <button class="btn btn-primary" id="valid" @click="toogleButton()">{{ valid }}</button>
    <input type="text" name="sec" value="0" size=3>
</div>
</template>

<script>
export default { 
    name: "SearchBar", 
    request: "",
     data () {
        return {
            valid: 'Lancer',
            choice: 'GET'
        }
    },
    methods:{
        toogleButton()  {
           console.log(this.valid)
           this.valid = this.valid == "Lancer" ? "■" : "Lancer";
           if(this.valid == "■"){
               this.callApi(this.choice);
            }
        },
        callApi(choice){
            console.log("La requete est : " + choice)
            console.log(this.valid)
            this.valid = "Lancer";
        },
    }
};


</script>

<style scoped>
.searchbar {
  width: 100%;
}
#input_url {
  width: 40vw;
  height: 4em;
}
</style>
