import React from "react"

import type { Project } from "~/models"

type Props = {
    project: Project
    onEdit: (project: Project) => void
    onDelete: (project: Project) => void
}

export default function ProjectItem({ project, onEdit, onDelete }: Props) {

    function format(deadline: string | undefined): string {
        if (!deadline) return "Sem prazo definido"
        const date = new Date(`${deadline} GMT-03:00`)
        return `Prazo: ${date.toLocaleDateString('pt-BR')}`
    }

    function getColorStatus(project: Project) {
        if (project.done) return 'color-green'

        let deadline = undefined
        if (project.deadline) deadline = new Date(`${project.deadline} GMT-03:00`)

        if (deadline && deadline.getTime() < new Date().getTime()) {
            return 'color-orange'
        }

        return ''
    }

    return (
        <div className={`project-item ${getColorStatus(project)}`}>
            <div>{project.id} - {project.name}</div>
            <div className="flex">
                <div style={{ textAlign: 'center', width: '200px', marginLeft: '20px', marginRight: '20px' }}>
                    {format(project.deadline)}
                </div>

                <button className="my-button color-blue" onClick={() => onEdit(project)}>Alterar</button>
                <button className="my-button color-red" onClick={() => onDelete(project)}>Remover</button>
            </div>
        </div>
    )
}