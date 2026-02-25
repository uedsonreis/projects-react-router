import React from "react"
import { useNavigate, useParams } from "react-router"

import type { Route } from "./+types/list.project"

import MyInput from "~/components/my.input"
import { useDispatch, useSelector } from "react-redux"
import type { ThemeState } from "~/store/theme.slice"
import { updateProjectAction, type ProjectState } from "~/store/project.slice"

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Editar um Projeto" }
    ]
}

export default function UpdateProject() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const route = useParams<{ id: string }>()

    const projects = useSelector((state: { project: ProjectState }) => state.project.projects)

    const project = projects.find(p => p.id === Number(route.id!))

    if (!project) return <div className="container">Projeto não encontrado!</div>

    const mode = useSelector((state: { theme: ThemeState }) => state.theme.mode)

    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [deadline, setDeadline] = React.useState('')
    const [done, setDone] = React.useState(false)

    React.useEffect(() => {
        setName(project.name)
        setDone(project.done)
        if (project.description) setDescription(project.description)
        if (project.deadline) setDeadline(project.deadline)
    }, [route.id])

    function goBack() {
        navigate(-1)
    }

    function save() {
        if (!name || name == '') {
            alert("Por favor, informe o nome do projeto.")
            return
        }

        updateProjectAction(dispatch, { ...project, name, description, deadline, done })
        goBack()
    }

    return (
        <div className={`page ${mode}`}>
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
