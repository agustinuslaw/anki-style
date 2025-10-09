function onLoad () {
  var colorizeqtable = false;
  var colorizeatable = true;
  var colorizefalsefalse = true;
  // Check if Persistence is Available
  if (Persistence.isAvailable) {
    // Parsing solutions
    solutions = Persistence.getItem ('Q_solutions').split (' ');
    for (i = 0; i < solutions.length; i++) {
      solutions[i] = Number (solutions[i]);
    }
    var answers = Persistence.getItem ('user_answers').split (' ');
    var type = document.getElementById ('CardType').innerHTML;
    var qtable = document.getElementById ('qtable');
    qtable.innerHTML = Persistence.getItem ('qtable');
    var output = document.getElementById ('output');
    var atable = qtable.cloneNode (true);
    atable.setAttribute ('id', 'atable');
    output.innerHTML = "<hr id='answer' />" + atable.outerHTML;
    document.getElementById ('qtable').innerHTML = qtable.innerHTML;
    var qrows = qtable
      .getElementsByTagName ('tbody')[0]
      .getElementsByTagName ('tr');

    for (i = 0; i < answers.length; i++) {
      //Set the radio buttons in the qtable.
      if (type == 0) {
        if (answers[i] === '1') {
          qrows[i + 1]
            .getElementsByTagName ('td')[0]
            .getElementsByTagName ('input')[0].checked = true;
        } else if (answers[i] === '0') {
          qrows[i + 1]
            .getElementsByTagName ('td')[1]
            .getElementsByTagName ('input')[0].checked = true;
        }
      } else {
        qrows[i]
          .getElementsByTagName ('td')[0]
          .getElementsByTagName ('input')[0].checked = answers[i] == 1
          ? true
          : false;
      }
      //Colorize the qtable.
      if (colorizeqtable) {
        if (solutions[i] && answers[i] === '1') {
          qrows[type != 0 ? i : i + 1].setAttribute ('class', 'correct');
        } else if (!solutions[i] && answers[i] === '0') {
          if (colorizefalsefalse) {
            qrows[type != 0 ? i : i + 1].setAttribute ('class', 'correct');
          }
        } else {
          qrows[type != 0 ? i : i + 1].setAttribute ('class', 'wrong');
        }
      }
    }

    var arows = document
      .getElementById ('atable')
      .getElementsByTagName ('tbody')[0]
      .getElementsByTagName ('tr');
    var canswers = 0;
    for (i = 0; i < solutions.length; i++) {
      //Rename the radio buttons of the atable to avoid interference with those in the qtable.
      if (type == 0)
        arows[i + 1]
          .getElementsByTagName ('td')[1]
          .getElementsByTagName ('input')[0]
          .setAttribute (
            'name',
            'ans_' + (type != 2 ? String (i + 1) : 'A') + '_solution'
          );
      arows[type != 0 ? i : i + 1]
        .getElementsByTagName ('td')[0]
        .getElementsByTagName ('input')[0]
        .setAttribute (
          'name',
          'ans_' + (type != 2 ? String (i + 1) : 'A') + '_solution'
        );
      //Set the radio buttons in the atable.
      if (type == 0)
        arows[i + 1]
          .getElementsByTagName ('td')[solutions[i] ? 0 : 1]
          .getElementsByTagName ('input')[0].checked = true;
      else
        arows[i]
          .getElementsByTagName ('td')[0]
          .getElementsByTagName ('input')[0].checked = solutions[i]
          ? true
          : false;
      //Colorize the atable and count correct answers.
      if (colorizeatable) {
        if (solutions[i] && answers[i] === '1') {
          arows[type != 0 ? i : i + 1].setAttribute ('class', 'correct');
          canswers = canswers + 1;
        } else if (!solutions[i] && answers[i] === '0') {
          if (colorizefalsefalse) {
            arows[type != 0 ? i : i + 1].setAttribute ('class', 'correct');
          }
          canswers = canswers + 1;
        } else {
          arows[type != 0 ? i : i + 1].setAttribute ('class', 'wrong');
        }
      }
    }
    var canswerresult = document.getElementById ('canswerresult');
    canswerresult.innerHTML =
      '<b>Correct answers: ' +
      Math.round (canswers / solutions.length * 100) +
      ' %</b>';
    Persistence.clear ();
  }
}
if (document.readyState === 'complete') {
  setTimeout (onLoad, 1);
} else {
  document.addEventListener (
    'DOMContentLoaded',
    function () {
      setTimeout (onLoad, 1);
    },
    false
  );
}
