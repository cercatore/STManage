var cc=0;
  angular.module('myApp.chat' ,[] )
    .controller('chatController', function($scope, $interval, $timeout){
        self = (this)
        this.afs = firebase.firestore();
        self.presence = {};
        $scope.extra_data=[];
                this.addMessage = function(){
          if (self.presence){
            var conversRef = self.afs.collection('convers').doc($scope.currentId)
            msg_id = 'a' + Math.random() * 1000 +1;
            message_t = $scope.currentChat.messages;
            // message_t = []
            message_t.push({ _id: msg_id, zdate:msg_id, text: self.text, 'recpt' :self.partner, 'sender' : self.user })

            $scope.checka = false;
            conversRef.update({ messages:message_t}).
              then(function(event){
                  $scope.checka = true;})
          }//else logerror

        }
        $scope.alert = (txt) =>{
          alert(txt)
        }
        this.processMessages = function(event){
          console.log('YAY')
        }
        this.registerListener = function(roomId){
          roomRef = self.afs.collection('convers').doc(roomId)
          roomRef.onSnapshot(function(doc){
              console.log("room:" + roomId + " updating")
              tempChat = doc.data();

          })
          curr = [{user:self.user,presence:'online'}];
          //newusers = [ ...$scope.currentChat.users, curr ]
          roomRef.update({ users: curr})
          self.presence[self.user] = {};
          self.presence[self.user].offline = false;
          self.setPresenceCount();
        }
        this.setPresenceInit = function(){
          presRef = self.afs.collection('users').doc("master").set({name:self.user,time:getNext()})
          presRef = self.afs.collection('users').doc("paperino").set({name:self.partner,time:getNext()})
        }
        this.getAllUsers = function(){
          self.tutti_utenti = []
          userRef = self.afs.collection('users')
        }
        this.start = false;
        this.timeout = false;
        self.savedTime = getNext();
        this.setPresenceCount = function(){
          myref = self.afs.collection('users').doc(self.user);
          console.log("listener pinger per " + self.user)
          $interval( function(){
            myref.update({name:self.user,time:getProgressive()})
            console.log('chiamo')
            time = self.savedTime;
            diff = getNext() - time
            if ( diff > 2500) { self.presence[self.partner] = {};self.presence[self.partner].offline = true;return;}

          },1500)
          ciaoref= self.afs.collection('users').doc(self.partner);
          console.log("listener per " + self.partner)
          ciaoref.onSnapshot(function(doc){
              self.savedTime = getNext();

          })
        }
        this.sonoUser = function(){
          self.user = self.username;
          if (!self.user || self.user === '' )   {$scope.chat_error = "********* erore Zio Nickname";return;}
          console.log("username :  " + self.username);
          self.partner = "master";
          self.initializeChat();
        }
        this.sonoPaperino = function(){
          self.user="paperino";
          self.timeout=false;
          self.partner="master";
          self.initializeChat();
        }
        this.sonoMaster = function(){
          self.user="master";
          self.timeout=false;
          self.partner="paperino";
          self.initializeChat();
        }


        this.initializeChat = function(){
          self.afs.collection('convers').get()
            .then(function(snapshot){
                snapshot.forEach(function(doc){
                  $scope.currentId = doc.id;
                  $scope.currentChat = doc.data()
                  self.registerListener(doc.id) // TODO deve funzionare una sola volta
                })
            })
          }

        this.addGuardone = function (){
            if ($scope.currentId){
              var roomRef = self.afs.collection('convers').doc($scope.currentId)
              temp = {user : 'guardone', presence:'online' }
              newusers = [ ...$scope.currentChat.users, temp ]
              roomRef.update({users:newusers})
            }
            else console.log('not done')

        }
        $scope.previous = function(){

        }
      })
    .directive('myMessanger', function() {
        return {
            restrict: 'E',

            templateUrl:'chat/messager.html'
          }
        })

  function getProgressive(){
    cc = cc +1;
    return cc;
  }
