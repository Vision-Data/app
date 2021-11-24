<template>
  <section>
    <div class="alert alert-object alert-info">
      <div class="flex-1">
        <label class="tag-title">
          <button class="badge bg-info border-transparent">Users</button>
        </label>
        <div class="alert alert-info" v-for="user in users" :key="user.data">
          <div class="flex-1">
            <label>
              <button class="badge bg-info border-transparent">Nom</button>
              {{user.nom === '' ? "(vide)" : user.nom }} 
            </label>
            <label>
              <button class="badge bg-info border-transparent">Prénom</button>
              {{ user.prenom }}
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="alert alert-object alert-warning">
      <div class="flex-1">
        <label>
          <button class="tag-title badge bg-warning border-transparent">Person</button>
        </label>
            <label>
              <button class="badge bg-warning border-transparent">Hair</button>
              {{ person.hair }}
            </label>
            <label>
              <button class="badge bg-warning border-transparent">
                Taille
              </button>
              {{ person.taille }}
            </label>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  name: "Data",
  components: {},
  data() {
    return {
      users: [
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
    padding: 10px ;
    padding-left: 70px;
}

.badge {
    margin-right: 5px;
}

</style>