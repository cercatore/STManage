

  (function(){}

      afs = firebase.firestore();

      /  room
        /  ngMessages
        /  users

      class MEssagesListener (){
        afs.collection('messages').doc
            }

      class UserListener(user){
          let userRef = afs.collection('users').doc(user)
          userRef
      }




      class StrenghConnecter('free'){
          let roomSnaps = afs.collection('rooms').where("free" , "==" , "true")

          roomSnaps.get()
            .then( (rows) => {
                let picked = false;
                rows.forEach(function(roomDoc){
                    if (!picked)
                      self.roomId = roomDoc.id
                      self.room = roomDoc.data();
                      picked=true
                    }
                })
            })// should put a error achiappa

      }
