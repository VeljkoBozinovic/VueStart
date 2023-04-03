const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      round: 0,
      winner: null,
    };
  },

  computed: {
    playerHealthbarChange() {
      if (this.playerHealth <= 0) return { width: 0 };
      else return { width: this.playerHealth + "%" };
    },
    monsterHealthbarChange() {
      if (this.monsterHealth <= 0) return { width: 0 };
      else return { width: this.monsterHealth + "%" };
    },
  },

  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) this.winner = "Draw";
      else if (value <= 0) this.winner = "Monster";
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) this.winner = "Draw";
      else if (value <= 0) this.winner = "Player";
    },
  },

  methods: {
    playerAttack() {
      this.round++;
      const damageDealt = getRandomValue(5, 12);
      this.monsterHealth -= damageDealt;
      this.monsterAttack();
    },
    monsterAttack() {
      const damageDealt = getRandomValue(8, 15);
      this.playerHealth -= damageDealt;
    },
    playerSpecialAttack() {
      this.round++;
      const damageDealt = getRandomValue(8, 20);
      this.monsterHealth -= damageDealt;
      this.monsterAttack();
    },
    playerHeal() {
      this.round++;
      const healReceived = getRandomValue(15, 25);
      if (this.playerHealth + healReceived <= 100) this.playerHealth += healReceived;
      else this.playerHealth = 100;
      this.monsterAttack();
    },
    newGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.round = 0;
      this.winner = null;
    },
  },
});

app.mount("#myApp");
