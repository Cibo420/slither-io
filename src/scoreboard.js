
var Scoreboard = {
    scores: JSON.parse(localStorage.getItem('scores')) || [], // get previous scores or an empty array if there's nothing saved yet

    addScore: function(name, date, score) {
        this.scores.push({name: name, date: date, score: score});
        localStorage.setItem('scores', JSON.stringify(this.scores));
    },

    getScores: function() {
        return this.scores;
    }
};
