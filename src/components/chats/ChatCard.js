import React, {useState} from 'react';
import moment from 'moment';

const ChatCard = React.memo(({chat, users, index, uid, onEmojiClick}) => {
  const [showEmojiBox, setShowEmojiBox] = useState(false);
  const who = () => {
    const user = users[chat.uid]
    if (user){
      return user.nickName
    }else{
      return "noname"
    }
  } 

  const when = () => {    
    return moment(chat.created * 1000).format("DD MMM YYYY hh:mm a") //parse integer
  }

  const onMouseEnter = () => {
    setShowEmojiBox(true);
  }

  const onMouseLeave = () => {
    setShowEmojiBox(false);
  }

  const renderEmojiSection = () => {
    const emojiObj = chat.emoji

    if(!showEmojiBox){
      return <></>
    }

    return <div className="fdr pt16 posAb" style={{right:0, top:0,}}>
      <EmojiButton emojiKey={'1'} emojiValue={"😎"} emojiObj={emojiObj}/>
      <EmojiButton emojiKey={'2'} emojiValue={"🤣"} emojiObj={emojiObj}/>
      <EmojiButton emojiKey={'3'} 
      emojiType={'url'}
      emojiValue={"https://i.pinimg.com/originals/42/75/c0/4275c0c8a75c2f8fdb738fc7236af4c3.gif"} emojiObj={emojiObj}/>
      <EmojiButton emojiKey={'4'} 
      emojiType={'url'}
      emojiValue={"https://i.pinimg.com/originals/d5/44/ff/d544ffca4ecb461fc19da7e384cbc6d5.gif"} emojiObj={emojiObj}/>      
    </div>  
  }

  const EmojiButton = ({emojiKey, emojiValue, emojiType, emojiObj}) => {
    let extraClassName = ""
    if(emojiObj && emojiObj[emojiKey]){
      if(emojiObj[emojiKey].includes(uid)){
        extraClassName = "active"
      }
    }

    return <div>
      <div onClick={e=> onEmojiClick(emojiKey, chat.id)} className={`emojiRec flex fdr aic ${extraClassName}`}>
        {
          emojiType === "url" ?
          <img src={emojiValue} style={{height:'100%',}}/>
          :
          <span>{emojiValue}</span>
        }
        <span>
          {emojiObj && emojiObj[emojiKey] &&
            <div>{emojiObj[emojiKey].length}</div>
          }
        </span>
      </div>
    </div>
  }

  return <div className="flex fdr pb16 chat_card pr" key={index} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div className="w40 h40 flex aic jcc">
      <img src="http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon"
        className="w30 h30"/>
    </div>
    <div className="pl16 f1">
      <div>
        <span className="bold">{who()}</span>
        <span className="fs color_gray pl8">{when()}</span>
      </div>
      <div className="pt8">
        {chat.content}
      </div>
      {renderEmojiSection()}
    </div>    
  </div>
}, (prevProps, nextProps) => {
  // console.log((prevProps.chat === nextProps.chat) && (prevProps.users === nextProps.users))
  return (prevProps.chat === nextProps.chat) && (prevProps.users === nextProps.users)
});

export default ChatCard