import React from "react"
import { IoSunny } from 'react-icons/io5'
import { NavLink, useNavigate } from "react-router"
import { useDispatch, useSelector } from 'react-redux'

import type { Project } from "~/models"
import type { Route } from "./+types/list.project"

import * as projectSlice from '../../store/project.slice'
import { setThemeAction, type ThemeState } from "~/store/theme.slice"

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

    const { mode } = useSelector((state: { theme: ThemeState }) => state.theme)
    const projects = useSelector((state: { project: projectSlice.ProjectState }) => state.project.projects)

    function onEdit(project: Project) {
        projectSlice.selectedProject(dispatch, project.id!)
        navigate(`/projeto/update/${project.id}`)
    }

    function onDelete(project: Project) {
        projectSlice.deleteProject(dispatch, project.id!)
    }

    return (
        <div className={`page ${mode}`}>
            <header className="header">
                <h2>Lista de Projetos</h2>
                <IoSunny className="themeIcon" onClick={() => setThemeAction(dispatch)} />
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
