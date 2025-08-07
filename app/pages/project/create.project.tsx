import React from "react"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"

import type { Route } from "./+types/list.project"

import type { ThemeState } from "~/store/theme.slice"
import { addProject } from '../../store/project.slice'

import MyInput from "~/components/my.input"

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Criar um Projeto" }
    ]
}

export default function CreateProject() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [name, setName] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [deadline, setDeadline] = React.useState("")

    const { mode } = useSelector((state: { theme: ThemeState }) => state.theme)

    function goBack() {
        navigate(-1)
    }

    function save() {
        if (!name || name == '') {
            alert("Por favor, informe o nome do projeto.")
            return
        }

        addProject(dispatch, { name, description, deadline, done: false })

        goBack()
    }

    return (
        <div className={`page ${mode}`}>
            <header className="header">
                <h2>Criar novo Projeto</h2>
            </header>

            <main className="flex flex-col justify-center min-h-[300px]">
                <MyInput className="mb-5" title="Nome" change={setName} />

                <MyInput className="mb-5" type='date' title="Prazo" change={setDeadline} />

                <div className="div-input">
                    <span className="mr-5">Descrição:</span>
                    <textarea className="my-input" onChange={(e) => setDescription(e.target.value)} />
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
