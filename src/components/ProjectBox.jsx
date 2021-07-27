import React, { Component } from 'react';
import Videos from './Videos.jsx';
import Images from './Images.jsx';
import Typewriter from './Typewriter.jsx';


function getPboxWidth() {
    let pboxWidth = window.innerWidth > 1460 ? 680 : 0.55 * window.innerWidth - 120
    if (window.innerWidth < 1000) {
        pboxWidth = window.innerWidth - 160 
    }
    if(window.innerWidth < 767){
        pboxWidth = window.innerWidth - 90 

    }
    return pboxWidth
}

function getFontSize() {
    let fontSize = 21
    if (window.innerWidth < 1000) {
        fontSize = 21
    }
     if(window.innerWidth < 767){
        fontSize = 15

    }
    return fontSize
}


var ProjectBox = React.forwardRef((props, ref) => {



    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth,
        pboxWidth: getPboxWidth(),
        fontSize: getFontSize()
    })

    React.useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth,
                pboxWidth: getPboxWidth(),
                fontSize: getFontSize()


            })

        }

        window.addEventListener('resize', handleResize)
        return _ => {
            window.removeEventListener('resize', handleResize)

        }
    })



    let menuClass = props.moveToLeft ? "menu move-left" : "menu"
    let pointerClass = props.pointerControl == "projects" ? "pointer" : "pointer-pointer-off"
    let staticClass = props.loading ? 'static active' : 'static'
    let projectBoxClass = props.projectSelected ? "project-box-inner project-selected" : "project-box-inner"
    let names = props.list.map((item) => item.name)
    let headClass = props.projectSelected ? "project-box project-box-open" : "project-box"
    let lines = names.map((name) => {
        if (name.length * dimensions.fontSize < dimensions.pboxWidth) {
            return [name]
        } else {
            var parts = []
            let section = ""
            let count = 0
            for (var i = 0; i < name.length; i++) {
                section += name[i]
                count += 1
                if (name[i] == " ") {
                    let nextChunk = name.substring(i)
                    let nextSpace = nextChunk.indexOf(" ")
                    let nextWordLength = nextSpace
                    if ((count + nextWordLength) * dimensions.fontSize > dimensions.pboxWidth) {
                        parts.push(section)
                        count = 0
                        section = ""
                    }
                }

            }
            if (section.length > 0) {
                parts.push(section)
            }
            return parts
        }
        // return parts
    })
    let pointerPlacements = lines.map((line, index) => {
        let place = 0
        for (var i = 0; i < index; i++) {
            place += lines[i].length * 30 + 25
        }
        return place
    })


    return (

        <div className={headClass}>

			<div className="border-line"></div>
			<div className="border-line"></div>
			<div className="border-line"></div>
			<div className="border-line"></div>
			
			<div className ={staticClass}>
						<img src = "/public/imgs/Random_static.gif"></img>
					</div> 


			<div className = "cat-info">{props.category}</div>
			{!props.loading?	
			<div className = {projectBoxClass} data-project = {props.project}>
			 
			<div className = {pointerClass}  style={{top: (pointerPlacements[props.hover % props.list.length] ) + "px"}}>
			</div>
				{props.list.map((item,index) => 
					(
						props.projectSelected && props.project == index ?
						<div className = "project-item selected" key = {item._id}
						style = {{position:"absolute", top: (pointerPlacements[index % props.list.length]) + "px"}}>						
						<h3
						
						onMouseEnter={() => props.hoverfunc(index)}>
						<a 
						onClick ={() => props.pickProject(index)}>
						<Typewriter parts = {lines[index]}/>
						<div class = "date">{item.date}</div>
						</a>
						</h3>

						  <div tabindex = "-1" className = "info" ref={ref} onFocus={() => console.log('focus')} onClick={() => console.log('clicked')}> 
						 	<div className = "description" dangerouslySetInnerHTML = {{__html: item.info}} />
							

						 </div>
						 </div>
						 : 

						index == props.hover %props.list.length ?

						<div 
						style = {{top:(pointerPlacements[index % props.list.length]) + "px"}}
						className = "project-item hover" key = {item._id}>						
						<h3
						
						onMouseEnter={() => props.hoverfunc(index)}>
						<a onClick ={() => props.pickProject(index)}>
						<Typewriter parts = {lines[index]}/>
						</a>
						</h3>
						 </div>
							:
							props.projectSelected ?
						<div className = "project-item" key = {item._id}
style = {{ position:"absolute",pointerEvents:"none", top: (pointerPlacements[index % props.list.length]) + "px"}}
						>						
						<h3 onMouseEnter={() => props.hoverfunc(index)}>
						<a 
						
						onClick ={() =>props.pickProject(index)}>
						
						<Typewriter parts = {lines[index]}/>


	
						</a>
						</h3>
						 </div>
						 :
						 <div className = "project-item" key = {item._id}
style = {{  top: (pointerPlacements[index % props.list.length]) + "px"}}
						>						
						<h3 onMouseEnter={() => props.hoverfunc(index)}>
						<a 
						
						onClick ={() =>props.pickProject(index)}>
						
						<Typewriter parts = {lines[index]}/>


	
						</a>
						</h3>
						 </div>
					)

				)}
			</div>
			:""}

			
		</div>
    );
})

export default ProjectBox;