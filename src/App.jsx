import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Header from './components/Header.jsx';
import Menu from './components/Menu.jsx';
import ProjectBox from './components/ProjectBox.jsx';
const axios = require('axios'); // Use axios to make http requests
import FlipMove from 'react-flip-move';


// Main Entry point function=
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOptions: ["Development", "Creative", "VR", "Academic", "Resume"],
            activeMenu: 0,
            moveToLeft: false,
            section: "",
            projectList: [],
            hoverProj: 0,
            pointerControl: "menu",
            waitingOnProjectList: false,
            projectSelected: false,
            project: 0

        };
        this.textToRead = React.createRef();
        this.site = React.createRef();


    }

    changeHoverMenu = (index) => {
        this.setState({ activeMenu: index })
    }
    changeHoverProject = (index) => {
        this.setState({ hoverProj: index })
    }
    loadProject = (index) => {
        if (this.state.projectList[index].name == "Full Resume PDF") {
            this.resume.click()
        } else {
            this.setState({
                pointerControl: "project",
                project: index,
                projectSelected: true
            }, () => {
                this.textToRead.current.focus()
            })
        }


    }


    // simulateClick = (e) =>{
    // e.focus()
    // }
    listProjects = (index) => {
        this.setState({ moveToLeft: true, projectSelected: false })
        this.setState({ section: index })
        this.setState({ pointerControl: "projects" })
        this.setState({ hoverProj: 0 })
        this.setState({ waitingOnProjectList: true })
        axios.get("/api/projects/" + this.state.menuOptions[index]).then(
            data => {
                // console.log(data)/
                this.setState({ waitingOnProjectList: false })
                this.setState({ projectList: data.data.message })
            })
    }
    onKeyPress = (event) => {
        if (event.keyCode === 40) {
            if (this.state.pointerControl == "menu") {
                this.setState({ activeMenu: this.state.activeMenu + 1 })
            } else if (this.state.pointerControl == "projects") {
                this.setState({ hoverProj: this.state.hoverProj + 1 })

            }
        }
        if (event.keyCode == 37) {
            if (this.state.pointerControl == "projects" || this.state.pointerControl == "project") {
                this.setState({ pointerControl: "menu" })
                this.site.current.focus()
            }

        }
        if (event.keyCode == 39) {
            if (this.state.pointerControl == "menu" && !this.state.projectSelected) {
                this.setState({ pointerControl: "projects" })
            } else if (this.state.pointerControl == "menu" && this.state.projectSelected) {
                this.setState({ pointerControl: "project" })
                this.textToRead.current.focus()
            }
        }
        if (event.keyCode === 38) {
            if (this.state.activeMenu == 0 && this.state.pointerControl == "menu") {


                this.setState({ activeMenu: 4 })
            } else if (this.state.pointerControl == "projects" && this.state.hoverProj == 0) {
                this.setState({ hoverProj: this.state.projectList.length - 1 })

            } else {
                if (this.state.pointerControl == "menu") {
                    this.setState({ activeMenu: this.state.activeMenu - 1 })
                } else if (this.state.pointerControl == "projects") {
                    this.setState({ hoverProj: this.state.hoverProj - 1 })

                }
            }
        }
        if (event.keyCode == 13) {
            if (this.state.pointerControl == "projects") {
                this.loadProject(this.state.hoverProj % this.state.projectList.length)

            }
            if (this.state.pointerControl == "menu") {
                this.listProjects(this.state.activeMenu % this.state.menuOptions.length)

            }

        }
    }
    componentDidMount() {
        document.addEventListener("keydown", this.onKeyPress, false);
        this.setState({ pointerControl: "menu" })
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyPress, false);
    }
    render() {
        return (
            <div tabindex = "-1" onFocus={() => console.log('focus')} onClick={() => console.log('clicked')} className = "site" ref = {this.site}>
        <Header/>
        <Menu 
            moveToLeft = {this.state.moveToLeft} 
            listProjects = {this.listProjects}
            changeHoverMenu = {this.changeHoverMenu} 
            active = {this.state.activeMenu} 
            menuOptions = {this.state.menuOptions}
            selected = {this.state.section}
            pointerControl = {this.state.pointerControl}

        />
        {this.state.moveToLeft ?
        <ProjectBox
        hover = {this.state.hoverProj}
        list = {this.state.projectList}
        hoverfunc = {this.changeHoverProject}
        category = {this.state.menuOptions[this.state.section]}
        pointerControl = {this.state.pointerControl}
        loading = {this.state.waitingOnProjectList}
        projectSelected = {this.state.projectSelected}
        project = {this.state.project}
        pickProject = {this.loadProject}
        ref = {this.textToRead}
        simulateClick = {this.simulateClick}
        />
        :""}
        <a id =  "resume" ref={input => this.resume = input} href = "/public/pdfs/resume.pdf" style = {{"display":"none"}} target = "_blank"></a>
        </div>
        )
    }
}

// Rendering the entire react application
ReactDOM.render(<App/>, document.getElementById('root'));