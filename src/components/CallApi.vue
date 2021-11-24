<template>
<div class="select">
  <div class="input-select">
    <select v-model="choice">
      <option selected value="GET">⇲ Recevoir (GET)</option>
      <option value="POST">➤ Envoyer (POST)</option>
      <option value="DELETE">🗑 Supprimer (DELETE)</option>
      <option value="UPDATE">⛭ Modifier (UPDATE)</option>
    </select>
    <button class="btn btn-second" id="valid" @click="toogleButton()">{{ valid }}</button>
  </div>
</div>
</template>

<script>
export default { 
    name: "SearchBar", 
    request: "",
     data () {
        return {
            valid: '➤',
            choice: null
        }
    },
    methods:{
        callApi(choice){
            console.log(choice)
            this.valid = "➤";
        },
        toogleButton()  {
           this.valid = this.valid == "➤" ? "■" : "➤";
           if(this.valid == "■"){
               this.callApi(this.choice);
            }
        }
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
