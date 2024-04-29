import React from 'react'
import './home.css'
import { useNavigate } from 'react-router-dom';
import config from '../config'

export default function Home() 
{
  const navigate = useNavigate();
  const redirect = () => {
  navigate("/about")
  }

  return (
    <div>
      <div>
      
      <div class="img"></div>
      <div class="center">
        <div class="title">Welcome to HUNGRY HUB! </div>
        <br/> <br/> <br/>
        <div class="sub_title">At Hungry Hub, we understand that hunger can strike at any moment, and when it does, there's no need to fret! Whether you're craving a comforting bowl of pasta, a sizzling slice of pizza, or a healthy salad bursting with freshness, we've got you covered. Explore our diverse menu featuring a plethora of cuisines from around the globe.</div>
        <div class="btns">
        <button onClick={redirect}>Learn More</button>
        </div>
      </div>
    
        </div>
    </div>
  )
}