import React, {useState, useEffect} from 'react';
import '../App.css';
import {useHistory} from 'react-router-dom';
import {db, firebaseApp} from '../firebase';
import Spinner from '../components/Spinner';
import {useDispatch, useSelector} from 'react-redux';

const Login = () => {
  const userProfile = useSelector(state => state.user.userProfile);
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [initLoaded, setInitLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    logout();
  }, [])

  const login = async () => {
    if(email.length < 3) {
      alert('too short');
      return
    }
    setLoading(true);

    try{
      await firebaseApp.auth().signInWithEmailAndPassword(email, password)
      const uid = (firebaseApp.auth().currentUser || {}).uid
      if(uid){
        dispatch({type: 'USER_FETCH_REQUESTED', payload: {uid, history}})
        dispatch({type: 'API_ASYNC', payload: 1,})
      }  
    }catch(error){
      setLoading(false);
      var errorCode = error.code;
      var errorMessage = error.message;
      if(errorCode === "auth/user-not-found"){
        alert('가입하세요');
      }
    }
  }

  const logout = () => {
    firebaseApp.auth().signOut()
    setLoginStatus(false);
    dispatch({type:"USER_LOGOUT"});
  }

  useEffect(() => {
    if(userProfile){
      setLoginStatus(false);
      setInitLoaded(true);  
      history.push("/createChat");
    }else{
      setInitLoaded(true);
    }    
  }, [])

  const goToSignup = () => {
    history.push("/signup")
  }

  if(!initLoaded){
    return <></>
  }

  return (
    <div >      
      <Spinner show={loading}/>
      {
        loginStatus ? 
        <>
          <div className="btn btn-danger" onClick={evt => {logout()}}>logout</div>
        </>
        :
        <>
          <div className="flex aic jcc vh100">
            <div className="w400">
              <div className="fdr aic">
                <div className="w100">
                  <span>email</span>
                </div>
                <input onChange={evt => {setEmail(evt.target.value)}}
                  className="default_input f1"
                  placeholder="email"
                  value={email}
                />
              </div>
              <div className="fdr aic pt16">
                <div className="w100">
                  <span>password</span>
                </div>
                <input onChange={evt => {setPassword(evt.target.value)}}
                  className="default_input f1"
                  placeholder="password"
                  type="password"
                  value={password}
                />
              </div>
              <div className="pt16">
                <div className="btn btn-success btn-fit" onClick={evt => {login()}}>Login</div>
              </div>
              <div className="jcc flex pt16 pb16">
                <span>or</span>
              </div>
              <div onClick={goToSignup} className="btn btn-default btn-fit">
                Signup
              </div>
            </div>
          </div>
        </> 
      }      
    </div>
  );
}

export default Login;
