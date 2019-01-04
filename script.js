Vue.component('titulo', {
  template: `
  <div class="row">
    <h1>Campeonato Brasileiro - Série A - 2018</h1>
  </div>
  `
})

Vue.component('clube', {
  props: ['time'],
  template: `
  <div>
    <img :src="time.escudo" alt="" class="escudo">
    {{ time.nome | ucwords }}
  </div>
  `
})

new Vue({
  el: "#app",
  data: {
    gols: 3,
    busca: '',
    ordem: {
      colunas: ['pontos', 'gm', 'gs', 'saldo'],
      orientacao: ['desc', 'desc', 'asc', 'desc']
    },
    times: [
      new Time('palmeiras', '/assets/palmeiras_60x60.png'),
      new Time('internacional', '/assets/internacional_60x60.png'),
      new Time('Flamengo', '/assets/flamengo_60x60.png'),
      new Time('Atlético-MG', '/assets/atletico_mg_60x60.png'),
      new Time('Santos', '/assets/santos_60x60.png'),
      new Time('Botafogo', '/assets/botafogo_60x60.png'),
      new Time('Atlético-PR', '/assets/atletico-pr_60x60.png'),
      new Time('Corinthians', '/assets/corinthians_60x60.png'),
      new Time('Grêmio', '/assets/gremio_60x60.png'),
      new Time('Fluminense', '/assets/fluminense_60x60.png'),
      new Time('Bahia', '/assets/bahia_60x60.png'),
      new Time('Chapecoense', '/assets/chapecoense_60x60.png'),
      new Time('São Paulo', '/assets/sao_paulo_60x60.png'),
      new Time('Cruzeiro', '/assets/cruzeiro_60x60.png'),
      new Time('Sport', '/assets/sport_60x60.png'),
      new Time('Ceará', '/assets/ceara_60x60.png'),
      new Time('Vitória', '/assets/vitoria_60x60.png'),
      new Time('Vasco', '/assets/vasco_60x60.png'),
      new Time('América-MG', '/assets/america_mg_60x60.png'),
      new Time('Paraná', '/assets/parana_60x60.png'),
    ],
    novoJogo: {
      casa: {
        time: null,
        gols: 0
      },
      fora: {
        time: null,
        gols: 0
      }
    },
    visao: 'tabela'
  },
  computed: {
    timesLibertadores() {
      return _.orderBy(this.times, this.ordem.colunas, this.ordem.orientacao).slice(0, 6)
    },
    timesRebaixados() {
      return _.orderBy(this.times, this.ordem.colunas, this.ordem.orientacao).slice(16, 20)
    },
    timesOrdenados() {
      return _.orderBy(this.times, this.ordem.colunas, this.ordem.orientacao)
    },
    timesFiltrados() {
      let times = _.orderBy(this.times, this.ordem.colunas, this.ordem.orientacao)
      return _.filter(times, time => {
        let busca = this.busca.toLowerCase()
        return time.nome.toLowerCase().indexOf(busca) >= 0
      })
    }
  },
  methods: {
    showAlert() {
      alert('Fim de jogo')
    },
    pegarValor($event) {
      console.log($event)
    },
    criarNovoJogo() {
      let indiceCasa = Math.floor(Math.random() * 20),
        indiceFora = Math.floor(Math.random() * 20)

      this.novoJogo.casa.time = this.times[indiceCasa]
      this.novoJogo.casa.gols = 0
      this.novoJogo.fora.time = this.times[indiceFora]
      this.novoJogo.fora.gols = 0
      this.visao = 'placar'
    },
    fimJogo() {
      let golsMarcados = parseInt(this.novoJogo.casa.gols)
      let golsSofridos = parseInt(this.novoJogo.fora.gols)
      let timeAdversario = this.novoJogo.fora.time
      let timeCasa = this.novoJogo.casa.time
      timeCasa.fimJogo(timeAdversario, golsMarcados, golsSofridos)
      this.visao = 'tabela'
    },
    ordenar(indice) {
      // this.ordem.orientacao[indice] = this.ordem.orientacao[indice] == 'desc' ? 'asc' : 'desc'
      this.$set(this.ordem.orientacao, indice, this.ordem.orientacao[indice] == 'desc' ? 'asc' : 'desc')
    }
  },
  filters: {
    saldo(time) {
      return time.gm - time.gs
    },
    ucwords(value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})