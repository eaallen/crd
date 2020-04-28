import app from 'firebase/app';
// import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import React from 'react' 
export const AppContext = React.createContext()

    const config = {
      apiKey: "AIzaSyBNqOn-qUE1KbHriylJy_KWLXy8GnyC0mM",
      authDomain: "custom-ring-design.firebaseapp.com",
      databaseURL: "https://custom-ring-design.firebaseio.com",
      projectId: "custom-ring-design",
      storageBucket: "custom-ring-design.appspot.com",
      messagingSenderId: "401445854653",
      appId: "1:401445854653:web:7aebdf9d897da9047946d4",
      measurementId: "G-0V6YPGB45G"
    };
   
    class Firebase extends React.Component {
        constructor(props) {
          super(props)
          this.actions={
            updateUserAuth: this.updateUserAuth,
            loader: this.loader,
            doCreateUserWithEmailAndPassword:this.doCreateUserWithEmailAndPassword,
            doSignInWithEmailAndPassword:this.doSignInWithEmailAndPassword,
            doSignInWithGoogle:this.doSignInWithGoogle,
            doSignInWithRedirect:this.doSignInWithRedirect,
            doGetRedirectResult:this.doGetRedirectResult,
            doSignOut:this.doSignOut,
            doPasswordReset:this.doPasswordReset,
            doPasswordUpdate:this.doPasswordUpdate,
            doAddRecord:this.doAddRecord,
            doGetQueryRecord:this.doGetQueryRecord,
            getOneRecord:this.getOneRecord,
            doGetAllRecords: this.doGetAllRecords,
            checkState: this.checkState,
            user: this.user,
          }
          this.state = {
            test:'this is comming from the firbase context provider',
            loading: null,
            data: null,
            // user: null
          }
          console.log('here')
          app.initializeApp(config);
          this.auth = app.auth();
          this.db = app.firestore()
          this.googleProvider =new app.auth.GoogleAuthProvider();
          this.auth.onAuthStateChanged(function(user) {
            if (user){
              console.log('we have a user!')
              return user
            }else{
              console.log('no user... :(')
              return null
            }    
          });
        }

        
        updateUserAuth = (userInfo) =>{
          // this.state.auth_user = userInfo
          // // this.state.auth_user = userInfo          
          // // this.setState({auth_user: userInfo})
        }
        doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

        doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
        
        doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);
        
        //////////////////GOOGLE OAUTH2 REDIRECT/////////////////////
        doSignInWithRedirect = () => this.auth.signInWithRedirect(this.googleProvider);
        doGetRedirectResult = () => this.auth.getRedirectResult();

        doSignOut = () => this.auth.signOut();
        doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
        doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
        doAddRecord = (_collection) => this.db.collection(_collection).doc();
        doGetQueryRecord = (_collection, item_looking_for,filtering_item) => this.db.collection(_collection).where(item_looking_for, '==',filtering_item).get();
        
        //Come back to this later---------------------------------------------------
        async doGetAllRecords(_collection){
          //get documents from 'customers' collection
          let querySnapshot = await this.db.collection(_collection).get()
          let arr = []
          //for each 'key:value pair' . . . 
          console.log(typeof querySnapshot)

          querySnapshot.forEach(async(doc) => {
            let data = doc.data();
            data['id'] = doc.id;
            console.log('neeto-taleeto')


            // await this.waitOnMe(doc,data,arr)
            await this.db.collection(`customers/${doc.id}/tasks`).get().then(querySnapshot=>{
              console.log('theta')                
              querySnapshot.forEach(function (doc1) {
                let obj = doc1.data()
                obj['task_id'] = doc1.id;
                data.task_history = obj;
              })            
              arr.push(data)
              console.log('yeeet----->', arr[0].task_history);           
              console.log('GOVE__________V')
              this.setState({...this.state, data:arr})
            })
        })
        }
        waitOnMe=async(doc,data,arr)=>{
         let querySnapshot = await this.db.collection(`customers/${doc.id}/tasks`).get()
          console.log('theta')                
          querySnapshot.forEach(function (doc1) {
            let obj = doc1.data()
            obj['task_id'] = doc1.id;
            data.task_history = obj;
          })            
          arr.push(data)
          console.log('yeeet----->', arr[0].task_history);           
          console.log('GOVE__________V')
          this.setState({...this.state, data:arr})      
        // await setTimeout(alert('yeet'), 30000)          
          console.log('awaited!')          
        }
        getOneRecord = (_collection, item_wanted) => this.db.collection(_collection).doc(item_wanted)
        checkState = async() =>{ await
          this.auth.onAuthStateChanged(function(user) {
            if (user){
              console.log('user accorfing to firebase')
            }else{
              console.log('according to firebase: no user info')
            }    
          });
        }
        user = () => this.auth.currentUser
    
        loader=()=>{          
          this.setState({...this.state, loading:true})
        }
        async loadFakeData(){
          
        }
      async componentDidMount(){
        
        console.log('beta')
        await this.doGetAllRecords('customers')   
        console.log('gamma')

      }
        render(){
          console.log('the state has changed me')
          if(!this.state.data){
            return(
              <div>
                Loading
              </div>
            )
          }
          return(
            <AppContext.Provider value={{...this.state, ...this.actions }}>
              {this.props.children}
            </AppContext.Provider>
          )
        }
        
    }
export default Firebase;