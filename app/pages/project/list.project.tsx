import React from "react"
import { IoSunny } from 'react-icons/io5'
import { NavLink, useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"

import type { Route } from "./+types/list.project"
import type { Project } from "~/models"
import ProjectItem from "./item.project"
import { setThemeAction, type ThemeState } from "~/store/theme.slice"
import { deleteProjectAction, type ProjectState } from "~/store/project.slice"

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
    const projects = useSelector((state: { project: ProjectState }) => state.project.projects)

    function onEdit(project: Project) {
        navigate(`/projeto/update/${project.id}`)
    }

    function onDelete(project: Project) {
        deleteProjectAction(dispatch, project.id!)
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
