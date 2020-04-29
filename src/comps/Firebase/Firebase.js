import app from 'firebase/app';
import firebase from 'firebase'
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
            doGetRecordByID:this.doGetRecordByID,
            doGetAllRecords: this.doGetAllRecords,
            doGetTaskByCustomerID:this.doGetTaskByCustomerID,
            checkState: this.checkState,
            user: this.user,
          }
          this.state = {
            test:'this is comming from the firbase context provider',
            loading: null,
            data: null,
            tasks_of_current_customer: null,
            // user: null
          }
          // console.log('here')
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
        doGetQueryRecord = async(_collection, item_looking_for,filtering_item) =>{
          let querySnapshot = await this.db.collection(_collection).where(item_looking_for, '==',filtering_item).get()
          console.log(querySnapshot)
          // console.log(data.exists)
          for(const doc of querySnapshot.docs){
            console.log(doc.data())
          }
          
        }
        doGetRecordByID=async(_collection,id)=>{
          let data = await this.db.collection('customers').doc(id).get()
          console.log('one item',data.data())          
        }
        doGetTaskByCustomerID = async(_collection,id)=>{
          let task_history = [] 
          let tasks = await this.db.collection(`customers/${id}/tasks`).get()
          for(const task of tasks.docs){
            console.log('TASK----->',task.data())
            let obj = task.data()
            obj.id=task.id
            task_history.push(obj)
          }
          this.setState({...this.state, tasks_of_current_customer: task_history})
          return(task_history)
        }
          //Come back to this later---------------------------------------------------
        async doGetAllRecords(_collection){
          //get documents from 'customers' collection
          let querySnapshot = await this.db.collection(_collection).get()
          let arr = []
          //for each 'key:value pair' . . . 
          for(const doc of querySnapshot.docs){
            let data = doc.data();
            data['id'] = doc.id;
            data.task_history= []
            arr.push(data)
            // await this.db.collection(`customers/${doc.id}/tasks`).get().then(task=>{
             
            //   for(const doc1 of task.docs){
            //     let obj = doc1.data()
            //     obj['task_id'] = doc1.id;
            //     data.task_history.push(obj)
            //   }               
            //   arr.push(data)
             
            // })
           
          }
          this.setState({...this.state, data:arr})       
        }
        
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
          const names =  [['Qabil','Fabiana'],['Fabiano','Qacha'],['Qadan','Fabiola'],['Fabrice','Qadir'],['Qadr','Fabunni'],['Facebook','Qamar']]
          // let cust = this.db.collection("customers").doc()
          // console.log('YEEET',cust.id)
          for(let name of names){
            let cust = this.db.collection("customers").doc()
            let tasks = this.db.collection(`customers/${cust.id}/tasks`)
            tasks.add({
              start_date:firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815")),
              end_date:firebase.firestore.Timestamp.fromDate(new Date("December 12, 1815")),
              charge:"$20.00",
              task_desc:'cleaning',
            })
            tasks.add({
              start_date:firebase.firestore.Timestamp.fromDate(new Date("August 20, 1830")),
              end_date:firebase.firestore.Timestamp.fromDate(new Date("September 1, 1830")),
              charge:"$100.00",
              task_desc:'repair',
            })         


            cust.set({
              first_name: name[0],
              last_name: name[1],
              phone_number: "123 321 1232",
              email_address: 'san@fake.come',
              last_in: firebase.firestore.Timestamp.fromDate(new Date("September 1, 1830")),
              recent_task: 'repair'
            })
          }
        }

      async componentDidMount(){
        // this.loadFakeData()
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