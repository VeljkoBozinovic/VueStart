const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      canUseSpecialAttack: true,
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
      else if (value <= 0) this.winner = "Monster is a winner!";
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) this.winner = "Draw";
      else if (value <= 0) this.winner = "Player is a winner!";
    },
  },

  methods: {
    newGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.canUseSpecialAttack = true;
      this.round = 0;
      this.winner = null;
    },
    playerAttack() {
      this.specialAttackCooldown();
      const damageDealt = getRandomValue(5, 12);
      this.monsterHealth -= damageDealt;
      this.monsterAttack();
    },
    monsterAttack() {
      const damageDealt = getRandomValue(8, 15);
      this.playerHealth -= damageDealt;
    },
    playerSpecialAttack() {
      this.canUseSpecialAttack = false;
      const damageDealt = getRandomValue(8, 20);
      this.monsterHealth -= damageDealt;
      this.monsterAttack();
    },
    playerHeal() {
      this.specialAttackCooldown();
      const healReceived = getRandomValue(15, 25);
      this.playerHealth + healReceived <= 100
        ? (this.playerHealth += healReceived)
        : (this.playerHealth = 100);
      this.monsterAttack();
    },
    ffVote() {
      this.winner = "Monster is a winner!";
    },
    specialAttackCooldown() {
      if (this.canUseSpecialAttack) return;
      this.round++;
      if (!(this.round === 2)) return;
      this.round = 0;
      this.canUseSpecialAttack = true;
    },
  },
});

app.mount("#myApp");
