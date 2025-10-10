// Generate the table depending on the type.

function generateTable() {
    var type = document.getElementById("Card_Type").innerHTML;
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");
    for (var i = 0; i < 5; i++) {
        if (type == 0 && i == 0) {
            tbody.innerHTML = tbody.innerHTML + '<tr><th>yes</th><th>no</th><th></th></tr>';
        }

        if (document.getElementById('Q_' + (i + 1)).innerHTML != '') {
            var html = [];

            html.push('<tr>');
            for (var j = 0; j < ((type == 0) ? 2 : 1); j++) {
                html.push(
                    '<td onInput="onCheck()" style="text-align: center"><input name="ans_' + ((type != 2) ? (i + 1) : 'A') + '" type="' +
                    ((type == 1) ? 'checkbox' : 'radio') + '" value="' + ((j == 0) ? 1 : 0) + '" id="Qi_' + i + '"></td>');
            }
            html.push('<td>'+ document.getElementById('Q_' + (i + 1)).innerHTML + '</td>')
            html.push('</tr>');
            tbody.innerHTML = tbody.innerHTML + html.join("");
        }

    }

    table.appendChild(tbody);
    document.getElementById('qtable').innerHTML = table.innerHTML;
    onShuffle();
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function onShuffle() {
    var solutions = document.getElementById("Q_solutions").innerHTML;
    solutions = solutions.split(" ");
    for (i = 0; i < solutions.length; i++) {
        solutions[i] = Number(solutions[i]);
    }

    var output = document.getElementById("output");

    var qrows = document.getElementById("qtable").getElementsByTagName("tr");

    var qanda = new Array();

    var type = document.getElementById("Card_Type").innerHTML;

    for (i = 0; i < ((type == 0) ? qrows.length - 1 : qrows.length); i++) {
        qanda[i] = new Object();
        qanda[i].question = qrows[(type == 0) ? i + 1 : i].getElementsByTagName("td")[(type == 0) ? 2 : 1].innerHTML;
        qanda[i].answer = solutions[i];
    }

    qanda = shuffle(qanda);

    var mc_solutions = new String();

    for (i = 0; i < ((type == 0) ? qrows.length - 1 : qrows.length); i++) {
        qrows[(type == 0) ? i + 1 : i].getElementsByTagName("td")[(type == 0) ? 2 : 1].innerHTML = '<label for="Qi_'+i+'">'+qanda[i].question+'</label>';
        solutions[i] = qanda[i].answer;
        mc_solutions += qanda[i].answer + " ";
    }
    mc_solutions = mc_solutions.substring(0, mc_solutions.lastIndexOf(" "));
    document.getElementById("Q_solutions").innerHTML = mc_solutions;

    document.getElementById("qtable").HTML = qrows;
    onCheck();
}

function onCheck() {
    // Generate user_answers
    var type = document.getElementById("Card_Type").innerHTML;
    var qrows = document.getElementById("qtable").getElementsByTagName('tbody')[0].getElementsByTagName("tr");
    document.getElementById("user_answers").innerHTML = "";
    for (i = 0; i < ((type == 0) ? qrows.length - 1 : qrows.length); i++) {
        var j;
        if (type == 0) {
            j = i + 1;
        } else j = i;
        if (qrows[j].getElementsByTagName("td")[0].getElementsByTagName("input")[0].checked) {

            document.getElementById("user_answers").innerHTML += "1 ";
        } else if (type != 0 && !qrows[j].getElementsByTagName("td")[(type == 0) ? 1 : 0].getElementsByTagName("input")[0].checked) {
            document.getElementById("user_answers").innerHTML += "0 ";
        } else if (type == 0 && qrows[j].getElementsByTagName("td")[(type == 0) ? 1 : 0].getElementsByTagName("input")[0].checked) {
            document.getElementById("user_answers").innerHTML += "0 ";
        } else {
            document.getElementById("user_answers").innerHTML += "- ";
        }
    }

    document.getElementById("user_answers").innerHTML = document.getElementById("user_answers").innerHTML.trim();

    // Send Stuff to Persistence
    if (Persistence.isAvailable()) {
        Persistence.clear();
        Persistence.setItem('user_answers', document.getElementById("user_answers").innerHTML);
        Persistence.setItem('Q_solutions', document.getElementById("Q_solutions").innerHTML);
        Persistence.setItem('qtable', document.getElementById("qtable").innerHTML);
    }
}

/*
    The following block is from Glutanimate's Cloze Overlapper card template.
    The Cloze Overlapper card template is licensed under the CC BY-SA 4.0
    license (https://creativecommons.org/licenses/by-sa/4.0/).
*/
if (document.readyState === "complete") {
    setTimeout(generateTable(), 1);

} else {
    document.addEventListener("DOMContentLoaded", function () {
        setTimeout(generateTable(), 1);
    }, false);
}