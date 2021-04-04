import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {firebaseApp} from '../firebase';
import {BiLogOut} from "react-icons/bi";
import {useSelector, useDispatch} from 'react-redux';

const ChatRoomCreate = (props) => {
  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.user.userProfile);
  const message = useSelector(state => state.user.message);
  const history = useHistory();
  const [channel, setChannel] = useState("");

  const onTextareaChange = (evt) => {
    setChannel(evt.target.value);
  }

  const start = () => {
    history.push(`/chat/${channel}`)
  }

  const logout = () => {
    firebaseApp.auth().signOut()
    history.push('/login');
    dispatch({type:"USER_LOGOUT"});
  }

  return <div className="vw100 vh100 flex aic jcc">
    <div className="posFx top0 right0 p8">
      {userProfile && 
        <>
        <span>Name: {userProfile.nickName}</span>
        <span>{message}</span>
        </>
      }
      <div className="flex fdr aic cursor_pointer" onClick={evt => {logout()}}>
        <BiLogOut/> 
        <span>Logout</span>
      </div>
    </div>
    <div className="w400 flex fdr aic">
      <input className="default_input f1" placeholder="채널 이름을 입력하세요."
        value={channel} onChange={evt => {onTextareaChange(evt)}}/>
      <div className="btn btn-success ml16 w100" onClick={evt => start()}>Start</div>
    </div>
  </div>
}

export default ChatRoomCreate
