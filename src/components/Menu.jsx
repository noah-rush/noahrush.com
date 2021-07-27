import React, { Component } from 'react';

var Menu = (props) => {

    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth,
        clicked: false
    })

    React.useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth,
            })

        }

        window.addEventListener('resize', handleResize)
        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    })

    let menuClass = props.moveToLeft ? "menu move-left" : "menu"
    let pointerClass = props.pointerControl == "menu" ? "pointer" : "pointer-pointer-off"
    let toggleClass = dimensions.clicked ? "mobile-menu open" : "mobile-menu"
    let togglerOn = props.moveToLeft ? "menu-toggle" : "menu-toggle off"
    if (dimensions.width < 767) {
        return (

            <div className = {toggleClass}>
    		<a className = {togglerOn} onClick= {() =>setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
        clicked: !dimensions.clicked
    })}>

			</a>
			 <div className={menuClass}>
		<div className = {pointerClass} style={{top: (props.active%5*20) + "%"}} ></div>
			{props.menuOptions.map((item, index) =>(
				
				<a 
				onMouseEnter={() => props.changeHoverMenu(index)}
				onClick= {() =>{props.listProjects(index); setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
        clicked: false
    })}}
				key = {index}
				className = "menu-item active">{item}</a>
			
			))}
		
			</div>
		</div>

        )
    } else {
        return (

            <div className={menuClass}>
		<div className = {pointerClass} style={{top: (props.active%5*20) + "%"}} ></div>
			{props.menuOptions.map((item, index) =>(
				index == props.active %5 ? 
				<a 
				onMouseEnter={() => props.changeHoverMenu(index)}
				onClick= {() =>props.listProjects(index)}
				key = {index}
				className = "menu-item active">{item}</a>
				:
				<a 
				onMouseEnter={() => props.changeHoverMenu(index)}
				key = {index}
				className = "menu-item ">
				{item}
			</a>
			))}
		
			
		</div>
        );
    }
}

export default Menu;