import React from "react"
import { IoSunny } from 'react-icons/io5'
import { NavLink, useNavigate } from "react-router"

import type { Route } from "./+types/list.project"

import type { Project } from "~/models"
import * as projectRepo from '../../services/project.repo'

import ProjectItem from "./item.project"
import { useDispatch, useSelector } from "react-redux"
import { setThemeAction, type ThemeState } from "~/store/theme.slice"

export function meta({}: Route.MetaArgs) {
    return [
        { title: "App de Projetos" },
        { name: "description", content: "Gerencie seus projetos" },
    ]
}

export default function ProjectList() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const mode = useSelector((state: { theme: ThemeState }) => state.theme.mode)

    const [projects, setProjects] = React.useState(projectRepo.getProjects())

    function onEdit(project: Project) {
        navigate(`/projeto/update/${project.id}`)
    }

    function onDelete(project: Project) {
        projectRepo.deleteProject(project.id!)
        setProjects(projectRepo.getProjects())
    }

    function toggleMode() {
        setThemeAction(dispatch)
    }

    return (
        <div className={"page "+ mode}>
            <header className="header">
                <h2>Lista de Projetos</h2>
                <IoSunny className="themeIcon" onClick={toggleMode} />
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
