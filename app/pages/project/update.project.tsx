import React from "react"
import { useNavigate, useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"

import type { Route } from "./+types/list.project"

import * as projectSlice from "../../store/project.slice"
import MyInput from "~/components/my.input"

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Editar um Projeto" }
    ]
}

export default function UpdateProject() {

    const navigate = useNavigate()
    const route = useParams<{ id: string }>()
    
    const dispatch = useDispatch()
    const project = useSelector((state: projectSlice.ProjectState) => state.selected)

    if (!project) return <div className="container">Projeto não encontrado!</div>

    const [name, setName] = React.useState(project.name)
    const [description, setDescription] = React.useState(project.description || "")
    const [deadline, setDeadline] = React.useState(project.deadline || "")
    const [done, setDone] = React.useState(project.done)

    function goBack() {
        navigate(-1)
    }

    function save() {
        if (!name || name == '') {
            alert("Por favor, informe o nome do projeto.")
            return
        }

        projectSlice.updateProject(dispatch, { ...project, name, description, deadline, done })
        goBack()
    }

    return (
        <div className="container">
            <header className="header">
                <h2>Editar Projeto</h2>
            </header>

            <main className="flex flex-col justify-center min-h-[300px]">
                <MyInput className="mb-5" title="Nome" value={name} change={setName} />

                <MyInput className="mb-5" type='date' title="Prazo" value={deadline} change={setDeadline} />

                <div className="div-input">
                    <span className="mr-5">Descrição:</span>
                    <textarea className="my-input" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className="flex mt-5">
                    <span className="mr-5">Concluído:</span>
                    <input className="w-[24px]" type="checkbox" checked={done} onChange={(e) => setDone(e.target.checked)} />
                </div>
            </main>
            
            <footer className="footer">
                <button className="my-button color-gray" onClick={goBack}>
                    Cancelar
                </button>
                
                <button className="my-button color-green" onClick={save}>
                    Salvar
                </button>
            </footer>
        </div>
    )
}
