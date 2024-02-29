// selecting all elements
const container = document.querySelector(".container");
const selectBtnX = container.querySelector(".playerX");
const selectBtnO = container.querySelector(".playerO");
const playBoard = document.querySelector(".play_board");
const allBox = document.querySelectorAll("section span");
const players = document.querySelector(".players");
const resultBox = document.querySelector(".result_box");
const wonText = resultBox.querySelector(".win_text");
const replayBtn = resultBox.querySelector("button");

window.onload = () => {
    for (let i = 0; i < allBox.length; i++) {
        //add onclick attribute in all section's spans
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
};
selectBtnX.onclick = () => {
    container.classList.add("hide"); //hide the container
    playBoard.classList.add("show"); //show the playboard
};
selectBtnO.onclick = () => {
    container.classList.add("hide"); //hide the container
    playBoard.classList.add("show"); //show the playboard
    players.setAttribute("class", "players active player"); //adding 3 clasnames to players
};
let playerXIcon = "fa-solid fa-x"; //fontawesom icon X
let playerOIcon = "fa-solid fa-o"; //fontawesom icon O
let playerSign = "X";
let runBot = true;

//user click function
function clickedBox(element) {
    if (players.classList.contains("player")) {
        element.innerHTML = `<i class='${playerOIcon} neon_Y'></i>`; //add O icon
        players.classList.add("active");
        playerSign = "O";
        element.setAttribute("id", playerSign);
    } else {
        element.innerHTML = `<i class='${playerXIcon} neon_X'></i>`; //add X icon
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner();
    playBoard.style.pointerEvents = "none";
    element.style.pointerEvents = "none"; //if the user select any box then that box can't be selected again
    let randomDelayTime = (Math.random() * 2000 + 200).toFixed(); //generate random delay
    setTimeout(() => {
        bot(runBot);
    }, randomDelayTime);
}
//bot click function
function bot() {
    let array = []; //store unclicked boxes index
    if (runBot) {
        playerSign = "O"; //chnage the player sign so if the user has X in id the bot will have O
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) {
                //if span has no child element
                array.push(i); //insert anselected boxes in arr and it meas the span has no child
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)]; //get random index from arr so bot will selectrandom box
        if (array.length > 0) {
            if (players.classList.contains("player")) {
                allBox[
                    randomBox
                ].innerHTML = `<i class='${playerXIcon} neon_X'></i>`;
                players.classList.remove("active");
                playerSign = "X";
                allBox[randomBox].setAttribute("id", playerSign);
            } else {
                allBox[
                    randomBox
                ].innerHTML = `<i class='${playerOIcon} neon_Y'></i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none"; // if bot select any box user can't select that box
        playBoard.style.pointerEvents = "auto";
        playerSign = "X";
    }
}

//select the winner
function getIdVal(clasname) {
    return document.querySelector(".box" + clasname).id; //return id name
}

function checkIdSign(val1, val2, val3, sign) {
    if (
        getIdVal(val1) == sign &&
        getIdVal(val2) == sign &&
        getIdVal(val3) == sign
    ) {
        return true;
    }
}
function selectWinner() {
    //if one of this combinations win select the winner
    if (
        checkIdSign(1, 2, 3, playerSign) ||
        checkIdSign(4, 5, 6, playerSign) ||
        checkIdSign(7, 8, 9, playerSign) ||
        checkIdSign(1, 4, 7, playerSign) ||
        checkIdSign(2, 5, 8, playerSign) ||
        checkIdSign(3, 6, 9, playerSign) ||
        checkIdSign(1, 5, 9, playerSign) ||
        checkIdSign(3, 5, 7, playerSign)
    ) {
        runBot = false; //passing the false boolen value to runBot so bot won't run again
        bot(runBot); //calling bot function
        setTimeout(() => {
            //after match won by someone then hide the playboard and show the result box after 700ms
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 700);
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    } else {
        //if all boxes/element have id value and still no one win then draw the match
        if (
            getIdVal(1) != "" &&
            getIdVal(2) != "" &&
            getIdVal(3) != "" &&
            getIdVal(4) != "" &&
            getIdVal(5) != "" &&
            getIdVal(6) != "" &&
            getIdVal(7) != "" &&
            getIdVal(8) != "" &&
            getIdVal(9) != ""
        ) {
            runBot = false; //passing the false boolen value to runBot so bot won't run again
            bot(runBot); //calling bot function
            setTimeout(() => {
                //after match drawn then hide the playboard and show the result box after 700ms
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700);
            wonText.textContent = "Match has been drawn!"; //displaying draw match text
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload(); //reload the current page on replay button click
};
