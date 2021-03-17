"use strict"
let click = null,
icons = ["🎰", "🎰", "🖤", "🖤", "🤵", "🤵", "💁", "💁", "🥞", "🥞", "🍱", "🍱", "👏", "👏", "🕵", "🕵", "🌍", "🌍","🐙","🦋","🕸","🐙","🦋","🕸"],
$icons = ["😉","😍","🤓","😎","🎪","🍖","🕋","💯","🌐","🛃","💌","🍓","🦑","👮","🤳","🃏","👓","👔","🎶","🎲","🀄","♥","🔐","💽"];
class MemoryGame {
    static cards() {
        console.log(icons)
        return icons
    }
    shuffle(_) {
        let i, j, k;
        for (i = 0; i < _.length; i++) {
            j = Math.floor(Math.random() * i);
            k = _[i];
            _[i] = _[j];
            _[j] = k
        }
        return _
    }
    get match_list() {
        for (let i = 0; i < _m_.length; i++) {
            eval(`document.getElementById(${_m_[i]}).innerText = ""`);
            eval(`document.getElementById(${_m_[i]}).style.backgroundColor = "white"`);
            eval(`document.getElementById(${_m_[i]}).removeAttribute("data-card")`);
        }
    }
    not_a_match(_, $) {
        setTimeout(() => {
            eval(`document.getElementById(${_}).innerText = ""`);
            eval(`document.getElementById(${$}).innerText = ""`);
        }, 350)
    }
    get clicks() {
        ++click;
        document.getElementById("no_clicks").innerHTML = `number of clicks : ${click}`
    }
    
    UI_setup(_) {
        let cgi_class = document.getElementsByClassName("card"),
            i;
        for (i = 0; i < _.length; i++) {
            cgi_class[i].setAttribute("data-card", _[i]);
            cgi_class[i].setAttribute("id", i);
            
        }
    }
    get UI_dialogue() {
        let ans, res;
        alert(`your time is ${min} minutes and ${sec} seconds`);
        ans = prompt("how was the game?");
        res = ans ? alert('thanks for the feedback :-)') : alert("well no feedback is virtual torture :-(");
        document.getElementById("Gameplay").style.display = "none";
        document.getElementById("menu").style.display = "block";
    }
    UI_menu(_) {
        document.getElementById("start").addEventListener('click', () => {
            _()
        })
        document.getElementById("about").addEventListener('click', () => {
            alert("built this in an hour or so. design patterns implementations need thinking and thinking takes time")
        })
    }
    get stage(){
        let $ = $icons;
        let _ = () =>{icons.push($[$.length-1]);icons.push($[$.length-1]);$.pop();$.pop()},
        container = document.getElementsByClassName("container"); 
        if ($.length){
            for(let i = 0 ; i<4;i++){
            _();
            container[i].appendChild(document.createElement("div"));
            container[i].appendChild(document.createElement("div"));
            container[i].lastElementChild.setAttribute("class","card");
            container[i].lastElementChild.previousElementSibling.setAttribute("class","card");
            container[i].lastElementChild.setAttribute("onclick","select(this)");
            container[i].lastElementChild.previousElementSibling.setAttribute("onclick","select(this)")
            }
        }
        }
    get complete() {
        if (_m_.length == cards.length) {
            _m_ = [];
            _s_ = [];
            _s = [];
            this.UI_dialogue;
            this.reset;
        }
    }
    get reset() {
        let $ = document.getElementsByClassName("card");
        for (let i = 0; i < cards.length; i++) {
            eval(`document.getElementById('${[i]}').style.backgroundColor = "orangered"`);
            $[i].innerText = "";
            $[i].removeAttribute("id");
        }
        click = -1;
        this.clicks;
        _t_ = null;
        min = 0;
        sec = 0;
        this.stage;        
        cards = this.shuffle(MemoryGame.cards());
        this.UI_setup(cards);
    }
}

const game = new MemoryGame();

let cards = game.shuffle(MemoryGame.cards());
game.UI_setup(cards);
game.UI_menu(() => {
    document.getElementById("menu").style.display = "none";
    document.getElementById("Gameplay").style.display = "block";
});

let min = 0,sec = 0,_t_ = null; 
let _s_ = [],_s = [],_m_ = [];

function select(_) {
    let data_card = _.getAttribute("data-card"),
        id = _.getAttribute("id");
    _.innerText = data_card;
    _s_.push(data_card);
    _s.push(id);

    if (_s_.length == 2 && _s_[0] == _s_[1] && _s[0] != _s[1] && !_m_.includes(_s[0])) {

        _m_.push(_s[0]);
        _m_.push(_s[1]);
        setTimeout(() => {
            game.match_list
        }, 350);
        _s_ = [];
        _s = [];

    } else if (_s_.length == 2) {
        game.not_a_match(_s[0], _s[1]);
        _s_ = [];
        _s = [];
    }
    _t_ = 1;
    game.clicks;
    game.complete;
    return
}

let _time_ = document.getElementById("time");
setInterval(()=>{
  sec += _t_ ; 
  if(sec<10)_time_.innerText =`${min}:0${sec}`;
  if(sec>9)_time_.innerText = `${min}:${sec}`;
  if(sec>59){++min;sec=0;}
},1000)