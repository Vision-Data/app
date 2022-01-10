<template>
  <div class="modal modal-open">
        <div class="modal-box">
            <div class="modal-list">
                <div class="modal-item" :class="{active:i == current}" v-for="diagram, i in diagrams" :key="diagram.ref" @click="current = i">
                    <img :src="require(`@/assets/${diagram.image}.png`)" alt="">
                    <p>{{ diagram.name }}</p>
                </div>
            </div>
            <div class="modal-action">
                <label for="my-modal-2" class="btn" @click="cancel">Annuler</label>
                <label for="my-modal-2" class="btn btn-primary" @click="selectChart">Sélectionnez</label> 
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DiagramChoice',
    data: () => ({
        current: null,
        diagrams: [
            {
                name: 'Donut',
                image: 'donut',
                ref: 'donut'
            },
            {
                name: 'Courbes',
                image: 'curves',
                ref: 'curves'
            },
            {
                name: 'Barres',
                image: 'bars',
                ref: 'bars'
            },
            {
                name: 'Carte',
                image: 'map',
                ref: 'map'
            },
        ]
    }),
    methods: {
        cancel() {
            this.$emit('cancel', false)
        },
        selectChart() {
            this.$emit('chart', {name:this.diagrams[this.current].ref})
        }
    }

}
</script>

<style>
.modal-list {
    display: grid;
    grid-template-columns: 50% 50%;
    justify-items: center;
}
.modal-item {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: .5rem;
    width: 100%;
}
.modal-item:hover {
    background-color: #f5f5f5;
}
.modal-item img {
    width: 6rem;
    height: 6rem;
    object-fit: contain;
}

/* TODO: remove css temporary */
.modal-item:nth-child(4),
.modal-item:nth-child(2n+1) {
    opacity: .4;
}
.modal-item.active {
    border: 2px solid black;
}
</style>