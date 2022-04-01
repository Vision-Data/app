<template>
  <div class="histograms">
    <!-- définition du svg de base -->
    <svg  class="histogram" :height="height" :width="width" ref="histogram">
    </svg>
  </div>
</template>

<script>
// Lien vers la doc de histogram: https://datacadamia.com/viz/d3/histogram
// Lien vers le tutoriel: https://techblog.deepki.com/vuejs-plus-d3js/#:~:text=Outre%20l'absence%20totale%20de,son%20mod%C3%A8le%20de%20donn%C3%A9es%20r%C3%A9actif.
import * as d3 from "d3"; //importation de d3 pour utiliser la librairie

export default {
  name: "HistoChart",
  data: () => ({
    width: 800, //largeur du canvas du graphique
    height: 400, //hauteur du canvas du graphique
    data: [ -0.07759597784808844, -2.406103487542676, 0.4784802333798646, -2.092737677440183, 0.31851849460744175, 2.382143098766826, -0.8277014345788559, -0.5386318049907027, 1.3768544867001713, 0.37042535813724964, -0.26976146625562103, 0.4815306193837919, 2.213112825215291, 0.6113556168595915, 0.2905841728242567, 1.510302018653636, -0.09759606747562329, -0.251912215919947, 1.2564059226487352, -0.6209982734764462, 0.5756245899380281, -0.32627320901603113, 0.9611116523933414, -0.3366268425815887, 1.2269545250650151, 0.17196266733101673, -0.7111365688914512, 0.7810151882389272, 1.3239194551095201, -0.22345771664613387, -0.2063849903837739, -1.4658052514388735, -2.602230318650328, 1.3102191075446303, -1.9635738325677567, 1.0063885896053864, 0.17264923633207335, 1.464587932688191, -0.0839491890641603, 0.318995762808622, -0.5475963010242892, -1.26782999401239, -0.26764463491851076, 1.3176570899982778, -0.44021563700596694, -0.5927323582850544, -1.770109814979415, -1.2249953643813605, -1.5245374292073675, 2.05092832878838, -1.5243310963544923, -0.29998383399010403, 1.3441106524143438, 0.21429929342437204, -0.018596355698522877, 0.9319860600669667, -0.37106054051592563, 0.31946686982249106, -0.2683296390981125, -0.5650958718306199, -0.4915139814234555, 2.277222537138449, -1.4690679850119803, -0.10197554375440218, 0.0027989394804291807, 1.0333284033728392, 0.7122522640563571, 0.7524041864864436, 1.1770916887177503, -0.38703133173302057, 0.16417967606042366, -0.45015239462196915, 1.0615086575748178, 0.7452649325721399, 0.8048375002780415, 0.6596457676182473, 1.5646827277260644, -0.7931777244118028, 0.9645652942466308, -1.7934389973945735, -0.28850218104077124, 0.3088139676304423, -0.09647071385151364, -0.46224530624394855, -0.09370312812471576, 1.4714714629038808, 0.7553363833773907, -0.45661089364048446, 0.767664120423114, 0.04308374897161093, -0.8326519245820148, -2.199749285964006, -0.17300566165522538, -0.08806697481303236, 1.874590417366434, -0.9067590654987363, 0.1334035161710188, 0.1279140403468445, 0.6215157955576011, -0.6625542629305371, 0.8381420546725686, -0.8764017832591903, -0.6785680674058804, -0.894785577213265, 0.23057098650037064, -0.13620241293935112, 0.5675291052321644, -1.6683287100241033, 0.869841742241018, -0.838094943163836, -0.21141657556792484, -0.4709819682002094, -0.4281997577431553, -0.42749910245219425, -1.5103607015364844, -0.4546158003839902, -0.8832268830056738, -0.4924629551644759, -0.5354432063882276, -0.3278440228253036, 0.3408327781760698, -0.6112786332440766, 0.20825527840383104, 0.20516231110200625, -0.004459204301252155, -0.6140278490130379, 1.3807573794223005, -0.08121339929293787, 2.322016228437957, 0.11784748134866131, 0.6203934900852112, -1.246835183431998, -1.2428930012846395, 1.023212756119022, -0.1850968826131953, 0.10625665019469398, -0.3043008811530319, 1.1733328608605968, 0.03885036241115191, -0.48037710197679806, -1.2301978074146407, -0.5372203047554178, 0.13746587092579193, 1.4516576866528292, 1.2743210023072469, 0.5337580579381656, -0.8562946306466573, -0.13278848119283157, 0.6196708478865789, -1.1783417909313423, -0.25373359519792843, 0.5334607041212723, 1.7941044080986155, -0.5619279383911953, -0.051554452335713964, -0.3839089613567747, 0.9658295198906364, 0.48366524934238464, -0.009231030028569695 ],
    numBins: 20, //nombre de bars
    svg: null //intialisation de la variable svg
  }),
  watch: {
    data: "renderSvg",
    numBins: "renderSvg"
  },
  mounted() {
    this.initSvg();//lancer la création du svg
  },
  computed: {
    histogram() {
      const countHistogram = d3
        .histogram() //utiliser un type histogram de d3
        .domain(d3.extent(this.data)) //prendre le min et le max parmis les données pour définir les limites du domaine
        .thresholds(this.numBins); //définir le nombre max de barres
      // renvoie un tableat de chaque éléments (barres) avec ses coordonnées
      return countHistogram(this.data).map(bins => ({
        x: bins.x0,
        y: bins.length
      }));
    }
  },
  methods: {
    initSvg() {
        //récupération de l'élément svg et ajout d'un groupe
        this.svg = d3.select(this.$refs.histogram).append("g");
        this.renderSvg();//lancer la création du graphique
    },
    renderSvg() {

      //initialisation de l'axe des abscisses
      const x = d3
        .scaleBand()
        .padding(0.2)
        .domain(this.histogram.map(d => d.x))
        .rangeRound([0, this.width]);

      //initialisation de l'axe des ordonnées
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(this.histogram, d => d.y)])
        .range([this.height, 0]);

      //sélection des rectangles avec les données de la computed "histogram"
      const selection = this.svg.selectAll("rect").data(this.histogram);

      // affectation des propriétés à la sélection des rectangles
      selection
        .enter() // quand il y a plus de données que d'élements rect
        .append("rect") // on rajoute un élément rect
        .attr("class", "bar") // on attribue la class "bar" au rectangle
        .merge(selection) // on ajoute le rectangle à la sélection
        .attr(
          "transform",
          d => `translate(${x(d.x)} ${this.height}) scale(1 -1)`
        ) // on positionne la barre horizontalement (décalage sur axe x)
        .attr("width", x.bandwidth()) // largeur de la barre est définie par la scale x
        .attr("height", d => y(d.y)); // on donne une hauteur à la barre selon la valeur de la donnée

      selection.exit().remove();// on sort et on enlève les excédants
    }
  }
};
</script>

<style>
.histogram >>> rect.bar {
  fill: #009688;
}
</style>