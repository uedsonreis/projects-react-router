import React from "react"
import { NavLink, useNavigate } from "react-router"
import { useDispatch, useSelector } from 'react-redux'

import type { Project } from "~/models"
import type { Route } from "./+types/list.project"

import * as projectSlice from '../../store/project.slice'

import ProjectItem from "./item.project"

export function meta({}: Route.MetaArgs) {
    return [
        { title: "App de Projetos" },
        { name: "description", content: "Gerencie seus projetos" },
    ]
}

export default function ProjectList() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const projectList = useSelector((state: projectSlice.ProjectState) => state.projects)

    const [projects, setProjects] = React.useState(projectList.sort((a, b) => {
        if (a.deadline && b.deadline) {
            
            const dateA = new Date(`${a.deadline} GMT-03:00`)
            const dateB = new Date(`${b.deadline} GMT-03:00`)

            return dateA.getTime() - dateB.getTime()
        }
        return 0
    }))

    function onEdit(project: Project) {
        projectSlice.selectedProject(dispatch, project.id!)
        navigate(`/projeto/update/${project.id}`)
    }

    function onDelete(project: Project) {
        projectSlice.deleteProject(dispatch, project.id!)
    }

    return (
        <div className="container">
            <header className="header">
                <h2>Lista de Projetos</h2>
            </header>

            <main className="w-full">
                <NavLink to="/projeto/create">Adicionar Projeto</NavLink>
                <div className="flex flex-col m-5">
                    { projects.map((project, index) => (
                        <ProjectItem key={index} project={project} onEdit={onEdit} onDelete={onDelete} />
                    )) }
                </div>
            </main>
            
            <footer className="footer">
                
            </footer>
        </div>
    )
}
