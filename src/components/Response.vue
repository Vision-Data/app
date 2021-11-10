<template>
  <div class="response">
    <div class="state">
        <p id="state"> Etat 200</p>
        <p id="result"> OK !</p>
    </div>
    <div class="data">
        <div v-for="object in objects" :key="object.data">
            <Data />
        </div>
    </div>
  </div>
</template>

<script>
    import Data from "./Data.vue";
    export default {
        name: "Response",
        components: {
            Data
        }
    };
</script>

<style scoped>

.response {
    margin: 2vw 25vw;
    color: black;
    font-weight: bold;
}

.state {
    background-color:rgba(165, 165, 165, 0.281);
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 10px;
}


.data {
    background-color:rgba(165, 165, 165, 0.281);
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    border-radius: 10px;
}

</style>
