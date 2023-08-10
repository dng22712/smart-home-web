import React from 'react'
import _ from 'lodash'
import axios from 'axios'
import './App.css'
import './normal.css'
// import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {

  const [input, setInput] = useState("")
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "how can i help you today"
  }])

  const update = async () => {
    try {
      const { data } = await axios.post('https://api.nftwork.social/update');
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    update();
  }, []);


  async function handleSubmit(e) {
    e.preventDefault();
    setChatLog([...chatLog, { user: "me", message: `${input}` }])
    setInput("")


    // const pushMessage = async (message='hi') =>{
    //   try {
    //     const { data } = await axios.post('localhost:3000/chat', {
    //       message
    //     });
    //   } catch(err){
    //     // console.error(err)
    //   }
    // }
    try {
      const response = await axios.post("https://api.nftwork.social/chat", {
        message: input
      });
      setChatLog([...chatLog, { user: "gpt", message: `${input} - Success updated` }])
    } catch (err) {
      setChatLog([...chatLog, { user: "gpt", message: `${input} - Failure updated` }])
    }

  }
  return (
    <div className="App">
      <aside className='sidemenu'>
        <div className="side-menu-button">
          <span>
            +
          </span>
          New chat
        </div></aside>
      <section className='chatbox'>
        <div className="chat-log">
          {_.map(chatLog, (message, index) =>
            <ChatMessage key={index} message={message} />)}
          <div className="chat-message chatgpt">
            <div className="chat-message-center">
              <div className="avatar">

              </div>
              <div className="message">
                I am AI
              </div>

            </div>
          </div>

          <div className="chat-input-holder">
            <form onSubmit={handleSubmit} >
              <input rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="chat-input-text">

              </input>
            </form>
            { /* <button onClick={pushMessage}>submit</button> */}
          </div>
        </div>
      </section>
    </div>
  )
}

const ChatMessage = (props) => {
  return (
    <div className={`chat-message ${props.message.user === "gpt" && "chatgpt"}`}>
      <div className={``}>
        <div className={`avatar ${props.message.user === "gpt" && "chatgpt"}`}>

        </div>
        <div className="message">
          {props.message.message}
        </div>

      </div>
    </div>
  )
}


export default App