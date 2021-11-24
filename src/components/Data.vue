<template>
  <section>
    <div class="alert alert-info">
      <div class="flex-1">
        <label>
          <button class="badge bg-info border-transparent">Expérience de Base</button> {{ pokemon.base_experience }}
        </label>
      </div>
    </div>
    <div class="alert alert-object alert-info">
      <div class="flex-1">
        <label class="tag-title">
          <button class="badge bg-info border-transparent">Abilities</button>
        </label>
        <div
          class="alert alert-info"
          v-for="ability in pokemon.abilities"
          :key="ability.data"
        >
          <div class="flex-1">
            <label>
              <button class="badge bg-info border-transparent">Name</button>
              {{
                ability.ability.name === "" ? "(vide)" : ability.ability.name
              }}
            </label>
            <label>
              <button class="badge bg-info border-transparent">URL</button>
              {{ ability.ability.url }}
            </label>
            <!-- <div class="alert alert-object alert-info" v-if="'address' in user">
              <div class="flex-1">
                <label>
                  <button class="tag-title badge bg-info border-transparent">
                    Address
                  </button>
                </label>
                <label>
                  <button class="badge bg-info border-transparent">
                    Numéro
                  </button>
                  {{ user.address.numero }}
                </label>
                <label>
                  <button class="badge bg-info border-transparent">Rue</button>
                  {{ user.address.rue }}
                </label>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <div class="alert alert-object alert-warning">
      <div class="flex-1">
        <label>
          <button class="tag-title badge bg-warning border-transparent">
            Form
          </button>
        </label>
        <label>
          <button class="badge bg-warning border-transparent">Name</button>
          {{ pokemon.forms.name }}
        </label>
        <label>
          <button class="badge bg-warning border-transparent">URL</button>
          {{ pokemon.forms.url }}
        </label>
      </div>
    </div>
  </section>
</template>


<script>
import bidoof from "../assets/bidoof.json";

export default {
  name: "Data",
  mounted: () => {
    console.log(bidoof);
  },
  components: {},
  data() {
    return {
      pokemon: bidoof,
      users: [
        {
          prenom: "Martin",
          nom: "Dupont",
          //   address: {
          //     rue: "Rue du Boulevard",
          //     numero: "220",
          //   },
        },
        {
          prenom: "Martin",
          nom: "Dupont",
        },
        {
          prenom: "Martin",
          nom: "Dupont",
        },
        {
          prenom: "Martin",
          nom: "Dupont",
        },
        {
          prenom: "Martin",
          nom: "Dupont",
        },
        {
          prenom: "Martin",
          nom: "Dupont",
        },
        {
          prenom: "Martin",
          nom: "",
        },
      ],
      id: 1,
      person: {
        hair: "Marron",
        taille: "178cm",
      },
    };
  },
};
</script>

 <style >
.alert {
  margin: 10px;
}

.alert label {
  margin-right: 10px;
  max-width: 10rem;
  overflow-wrap: break-word;
}

.alert .tag-title {
  position: absolute;
  top: 0;
  left: 0;
}

.alert .flex-1 {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  align-items: flex-start;
}

.alert-object > .flex-1 {
  padding: 10px;
  padding-left: 70px;
}

.badge {
  margin-right: 5px;
}
</style>