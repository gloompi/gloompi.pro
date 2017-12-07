import React from 'react'

export default function AboutStar(props){
  const {color, borderColor, width, height} = props
  return(
    <div className="star">
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 186.861 110.966">
        <circle fill={color} cx="70.704" cy="105.783" r="5.182"/>
        <circle fill={color} cx="5.183" cy="78.269" r="5.183"/>
        <circle fill={color} cx="121.8" cy="63.519" r="2.848"/>
        <circle fill={color} cx="48.859" cy="49.678" r="2.848"/>
        <circle fill={color} cx="33.16" cy="17.826" r="2.848"/>
        <circle fill={color} cx="87.597" cy="7.948" r="2.848"/>
        <path fill="none" stroke={borderColor} strokeWidth=".75" strokeMiterlimit="10" d="M5.183 78.27l65.52 27.512 51.098-42.263z"/>
        <path fill="none" stroke={borderColor} strokeWidth=".75" strokeMiterlimit="10" d="M33.16 17.825L5.183 78.27l65.52 27.512L88.01 7.825zM48.86 49.677L121.8 63.52"/>
        <circle fill={color} cx="181.678" cy="93.211" r="5.182"/>
        <circle fill={color} cx="136.611" cy="5.184" r="5.183"/>
        <circle fill={color} cx="176.274" cy="27.121" r="2.848"/>
        <circle fill={color} cx="123.17" cy="79.005" r="2.848"/>
        <circle fill={color} cx="88.066" cy="73.644" r="2.848"/>
        <circle fill={color} cx="111.13" cy="23.354" r="2.848"/>
        <path fill="none" stroke={borderColor} strokeWidth=".75" strokeMiterlimit="10" d="M123.17 79.005l58.508 14.205-5.404-66.09z"/>
        <path fill="none" stroke={borderColor} strokeWidth=".75" strokeMiterlimit="10" d="M88.065 73.644l48.546-68.46L181.68 93.21l-70.413-70.265zM123.17 79.004l53.104-51.884"/>
      </svg>
    </div>
  )
}