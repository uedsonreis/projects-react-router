import { createSlice, type Dispatch } from '@reduxjs/toolkit'

import { type Project } from '../models'

export type ProjectState = {
    projects: Project[]
    selected?: Project
}

function sortProjects(a: Project, b: Project)  {
    if (a.done != b.done) {
        if (a.done) return 1
        if (b.done) return -1
    }
    
    if (!a.deadline) return 1
    if (!b.deadline) return -1

    if (a.deadline && b.deadline) {
        const dateA = new Date(`${a.deadline} GMT-03:00`)
        const dateB = new Date(`${b.deadline} GMT-03:00`)

        return dateA.getTime() - dateB.getTime()
    }
    return 0
}

export const projectSlice = createSlice({
    name: 'project_app',

    initialState: {
        projects: [],
        selected: undefined
    } as ProjectState,

    reducers: {
        selectProject: (state, action) => {
            state.selected = state.projects.find(p => p.id == action.payload.id)
        },
        addProject: (state, action) => {
            state.projects = [
                ...state.projects,
                { ...action.payload, id: state.projects.length + 1 }
            ].sort(sortProjects)
        },
        updateProject: (state, action) => {
            const project = state.projects.find(p => p.id == action.payload.id)
            if (project) {
                project.done = action.payload.done
                project.name = action.payload.name
                project.deadline = action.payload.deadline
                project.description = action.payload.description
            }
            state.projects = state.projects.sort(sortProjects)
        },
        deleteProject: (state, action) => {
            state.projects = state.projects.filter(p => p.id != action.payload.id)
        }
    }
})

export function selectedProject(dispatch: Dispatch<any>, id: number) {
    dispatch(projectSlice.actions.selectProject({ id }))
}

export function addProject(dispatch: Dispatch<any>, project: Project) {
    dispatch(projectSlice.actions.addProject(project))
}

export function updateProject(dispatch: Dispatch<any>, project: Project) {
    dispatch(projectSlice.actions.updateProject(project))
}

export function deleteProject(dispatch: Dispatch<any>, id: number) {
    dispatch(projectSlice.actions.deleteProject({ id }))
}