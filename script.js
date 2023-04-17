var wrap = document.querySelector('.wrap');
var nameHeader = document.querySelector('.name--header');
var channelBody = document.querySelector('.debugchannels');
var userBody = document.querySelector('.debug');
const userCountElement = document.getElementById("user-count");
let userCount = 0;
var joinbutton = document.querySelector('.joinbutton');
var nameHeader = document.querySelector('.servername');
var footer = document.querySelector('.footer');
var userBodyDebug = document.querySelector('.users--body');
var theme = 'dark';

document.documentElement.style.setProperty('--scrollbar-thumb-color', ' hsla(0, 0%, 100%, .1)');

if(theme === 'light'){
  joinbutton.classList.add('joinbuttonwhite');
  footer.classList.add('footerwhite');
  userBodyDebug.classList.add('users--bodywhite');
  //change the color of the scroll bar to white
  document.documentElement.style.setProperty('--scrollbar-thumb-color', ' rgba(0, 0, 0, .1)');
}

function discordAPI() {
  var init = {
    method: 'GET',
    mode: 'cors',
    cache: 'reload'
  }
  
  fetch('testchannel.json', init).then(function (response) {
  //fetch('https://discordapp.com/api/guilds/807892248935006208/widget.json', init).then(function (response) {
    if (response.status != 200) {
      console.log("it didn't work" + response.status);
      return
    }
    response.json().then(function (data) {

      var users = data.members;
      var serverLink = data.instant_invite;
      var serverName = data.name;

      let liWrap = document.createElement('ul');
      liWrap.classList.add('channels--list--wrap');
      joinbutton.children[0].setAttribute('href', serverLink);
      try {
        nameHeader.innerHTML = serverName;
      } catch (error) {
        console.log(error);
      }

      function channelsFill() {
        data.channels.sort(function (a, b) {
          return a.position - b.position;
        });
        for (let i = 0; i < data.channels.length; i++) {
          let li = document.createElement('li');
          li.classList.add('channel--name');
          if(theme === 'light'){
            li.classList.add('channel--namewhite');
          }
          li.innerHTML = "<p class='channeltitle'>" + data.channels[i].name + "</p>";
          liWrap.appendChild(li);
          channelBody.appendChild(liWrap);
        }
        channelListWrap = document.querySelector('.channels--list--wrap');
      }
      function usersFillInChannels() {
        for (let z = 0; z < data.members.length; z++) {
          for (let w = 0; w < data.channels.length; w++) {
            if (data.members[z].channel_id === data.channels[w].id) {
              let userWrap = document.createElement('div');
              let userName = document.createElement('span');
              let userImage = document.createElement('img');
              let userMutestatus = document.createElement('span');
              let userDeafstatus = document.createElement('span');

              let imageWrap = document.createElement('div');
              let botTag = document.createElement('div');
              userWrap.classList.add('user');

              userName.classList.add('username');

              imageWrap.classList.add('image--wrap');



              botTag.classList.add('bot--tag');


              botTag.innerText = 'BOT';

              if (data.members[z].mute === true || data.members[z].self_mute === true) {
                userMutestatus.style.backgroundImage = 'url(muted.svg)';
                userMutestatus.classList.add('user--mute');
              }

              if (data.members[z].deaf === true || data.members[z].self_deaf === true) {
                userDeafstatus.style.backgroundImage = 'url(deaf.svg)';
                userDeafstatus.classList.add('user--deaf');
              }

              if (users[z].nick === undefined) {
                userName.innerText = users[z].username;
              } else {
                userName.innerText = users[z].nick;
              }


              if (users[z].bot === true) {

                userWrap.appendChild(botTag);
              }


              userImage.classList.add('user--image');
              userImage.setAttribute('src', data.members[z].avatar_url);

              imageWrap.appendChild(userImage)
              userWrap.appendChild(imageWrap);
              userWrap.appendChild(userName);
              userWrap.appendChild(userMutestatus);
              userWrap.appendChild(userDeafstatus);

              channelListWrap.children[w].appendChild(userWrap);
            }
          }
        }
      }
      function usersFill() {
        for (let n = 0; n < data.members.length; n++) {

          userCount++;
          userCountElement.innerText = userCount;

          let userWrap = document.createElement('div');
          let userName = document.createElement('span');
          let userImage = document.createElement('img');
          let userGame = document.createElement('span');
          let userStatus = document.createElement('div');
          let imageWrap = document.createElement('div');
          let botTag = document.createElement('div');
          userWrap.classList.add('user');

          userName.classList.add('username');

          userStatus.classList.add('user--status');

          imageWrap.classList.add('image--wrap');

          userGame.classList.add('user--game');
          if(theme === 'light'){
            userGame.classList.add('user--gamewhite');
          }

          botTag.classList.add('bot--tag');


          botTag.innerText = 'BOT';


          if (users[n].nick === undefined) {
            userName.innerText = users[n].username;
          } else {
            userName.innerText = users[n].nick;
          }

          if (users[n].status === 'online') {
            userStatus.classList.add('status--online')
            if(theme === 'light'){
              userStatus.classList.add('status--onlinewhite')
            }
          }
          if (users[n].status === 'idle') {
            userStatus.classList.add('status--idle');
            if(theme === 'light'){
              userStatus.classList.add('status--idlewhite');
            }
          }
          if (users[n].status === 'dnd') {
            userStatus.classList.add('status--dnd');
            if(theme === 'light'){
              userStatus.classList.add('status--dndwhite');
            }
          }

          if (users[n].bot === true) {

            userWrap.appendChild(botTag);
          }

          if (users[n].game !== undefined) {

            userGame.innerText = users[n].game.name;
          }
          userImage.classList.add('user--image');
          userImage.setAttribute('src', data.members[n].avatar_url);
          imageWrap.appendChild(userStatus);
          imageWrap.appendChild(userImage)
          userWrap.appendChild(imageWrap);
          userWrap.appendChild(userName);
          if (users[n].game !== undefined) {
            userWrap.appendChild(userGame);
          }
          userBody.appendChild(userWrap);

        }
      }
      channelsFill();
      usersFill();
      usersFillInChannels();
    })
  })
    .catch(function (err) {
      console.log('fetch error: ' + err)
    })


}
discordAPI()

