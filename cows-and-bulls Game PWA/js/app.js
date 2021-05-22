
var isInputActive = false;
var userGuessArr = [];
var gamesc = generateCode(4).split('');
var htmlSec;
var gmoves = 0, stime;
var defaultKeypad = bottomArea.innerHTML;

function handelKeyInput(thiskey, inputkey) {
  if (userGuessArr.length == 4)
    return;

  if (!isInputActive) {
    usrguess.style.display = "none";
    inputuser.style.display = "block";
    isInputActive = true;
    inputuser.innerText = '';
  }

  thiskey.classList.add('disablekey');
  userGuessArr.push(inputkey);
  inputuser.innerText += inputkey;

  if (userGuessArr.length == 4) {
    submitNum.classList.add('ready');
  }
}

function handelClearKey() {
  if (!isInputActive)
    return;

  if (userGuessArr.length == 4)
    submitNum.classList.remove('ready');

  inputuser.innerText = inputuser.innerText.slice(0, -1);
  var bk = userGuessArr.pop();
  var element = document.body.querySelector('.numsbtn[data-key="' + bk + '"]');
  element.classList.remove('disablekey');


  if (userGuessArr.length == 0) {
    usrguess.style.display = "block";
    inputuser.style.display = "none";
    isInputActive = false;
  }
}

function handelEnterKey() {
  if (!isInputActive || userGuessArr.length < 4)
    return;

  submitNum.classList.remove('ready');
  usrguess.innerText = userGuessArr.join('');
  usrguess.style.display = "block";
  inputuser.style.display = "none";
  var b = 0, c = 0;

  for (var i = 0; i < userGuessArr.length; i++) {
    var bk = userGuessArr[i].toString();
    var indx = gamesc.indexOf(bk);

    if (indx >= 0) {
      if (gamesc[indx] == userGuessArr[indx])
        b += 1;
      else
        c += 1;
    }

    var element = document.body.querySelector('.numsbtn[data-key="' + bk + '"]');
    element.classList.remove('disablekey');
  }

  gmoves++;
  addtohistory(userGuessArr.join(''), c, b);

  cwcon.innerText = c;
  blcon.innerText = b;
  isInputActive = false;
  userGuessArr = [];
  if (b == 4)
    winner('success');
}


function generateCode(N) {
  var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  var code = '';
  while (N--) {
    var d = Math.floor(Math.random() * (nums.length - 1));
    code += nums[d];
    nums.splice(d, 1);
  }

  stime = new Date().getTime();
  return code;
}

function showHistory(typ) {
  if (typ == 'Show') {
    htmlSec = bottomArea.innerHTML || defaultKeypad;
    bottomArea.innerHTML = gameHistory.innerHTML;
    hideHist.style.display = 'block';
    playAgain.style.display = 'none';
    viewHist.style.display = 'none';
  } else {
    bottomArea.innerHTML = htmlSec;
    htmlSec = '';
    hideHist.style.display = 'none';
    viewHist.style.display = 'block';
    playAgain.style.display = 'none';
  }

}



function addtohistory(num, c, b) {
  var row = '<div class="row-history"><div class="cols col1">' + gmoves + '.</div><div class="cols col2">' + num + '</div><div class="cols col3"><div class="cow"> ' + c + ' Cows</div><div class="bull"> ' + b + ' Bulls</div></div></div>';
  var list = document.querySelector('#gameHistory .history-list');
  list.innerHTML += row;
}

function winner(typ) {
  var dur = new Date().getTime() - stime;
  var htmlPg = `
            <div style="text-align: center; background: #fa5c43; border-radius: 34px 34px 0 0; width: 100%; height: 100%;">
                <img
                    src="img/winner.jpg"
                    style="max-height: calc(100% - 94px); max-width: 260px; margin-top: 18px;"
                />
        
                <div style="color: #fff; font-size: 16px; max-width: 500px; margin: auto;">
                    <div style="font-size: 22px; padding: 8px; font-weight: 600; color: #fff;">Correct!</div>
                    <div style="width: calc(50% - 2px); min-width: 130px; margin: auto; display: inline-block; text-align: center;">Time: `+ convertTimeMS(dur) + `</div>
                    <div style="width: calc(50% - 8px); min-width: 130px; margin: auto; display: inline-block; text-align: center;">Guess: `+ gmoves + `</div>
                </div>
            </div>
            `;


  var htmlPg2 = `
            <div style="text-align: center;background: #ffc107;border-radius: 34px 34px 0 0;width: 100%;height: 100%;">
                <img src="img/game_over.png" style="max-height: calc(100% - 94px); max-width: 260px; margin-top: 18px;">
        
                <div style="color: #fff; font-size: 16px; max-width: 500px; margin: auto;">
                    <div style="font-size: 22px; padding: 8px; font-weight: 600; color: #fff;">Correct Number is</div>
                    
                    <div style="width: calc(50% - 8px);min-width: 130px;margin: auto;display: inline-block;text-align: center;font-size: 54px;letter-spacing: 8px;color: #ff5722;">` + gamesc.join('') + `</div>
                </div>
            </div>
            `;


  if (typ == 'success')
    bottomArea.innerHTML = htmlPg;
  else
    bottomArea.innerHTML = htmlPg2;

  hideHist.style.display = 'none';
  viewHist.style.display = 'none';
  playAgain.style.display = 'block';

}

function convertTimeMS(msec) {
  var sec = msec / 1000;
  var time;
  if (sec < 60) {
    time = sec.toFixed(0) + ' sec.'
  } else {
    time = (sec / 60).toFixed(2) + ' min.'
  }
  return time;
}

function playAgainGame() {
  bottomArea.innerHTML = defaultKeypad;
  hideHist.style.display = 'none';
  viewHist.style.display = 'block';
  playAgain.style.display = 'none';

  usrguess.innerText = '____';
  inputuser.innerText = '____';
  document.querySelector('#gameHistory .history-list').innerHTML = '';
  cwcon.innerHTML = '0';
  blcon.innerHTML = '0';

  isInputActive = false;
  userGuessArr = [];
  gamesc = generateCode(4).split('');
  htmlSec = '';
  gmoves = 0;


}

var navlist = {
  def: function () {
    howToPlayPg.style.display = 'none';
    SideNavR.classList.remove('expandSideMenu');
  },
  howtoplay: function () {
    this.def();
    howToPlayPg.style.display = 'block';
  },
  newgame: function () {
    this.def();
    playAgainGame();
  },
  giveup: function () {
    this.def();
    winner('giveup');
  }
}




/* to make PWA */

// Registering Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}



// Code to handle PWA install prompt on desktop

let deferredPrompt;
const addBtn = document.querySelector('.install-pwa-button');
addBtn.style.visibility = 'hidden';


window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen  
  addBtn.style.visibility = 'visible';

  addBtn.addEventListener('click', () => {
    // hide our user interface that shows our A2HS button
    addBtn.style.visibility = 'hidden';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});


