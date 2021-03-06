import React from 'react'

export default function ArrowDown(props){
  const {color, width, height} = props
  return(
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 25.18 16.164">
        <path fill={color} d="M13.293 15.87c-.39.392-1.016.392-1.406 0L.293 4.294c-.39-.39-.39-1.03 0-1.422L2.887.294c.39-.39 1.016-.39 1.406 0L12.59 8.59 20.887.293c.39-.39 1.016-.39 1.406 0l2.594 2.578c.39.392.39 1.032 0 1.423L13.293 15.87z"/>
      </svg>
    </div>
  )
}