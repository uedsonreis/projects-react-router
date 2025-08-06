import { createSlice, type Dispatch } from '@reduxjs/toolkit'

import { type Project } from '../models'

export type ProjectState = {
    projects: Project[]
    selected?: Project
}

export const projectSlice = createSlice({
    name: 'project_app',

    initialState: {
        projects: [],
        selected: undefined
    } as ProjectState,

    reducers: {
        selectProject: (state, action) => {
            state.selected = state.projects.find(p => p.id == action.payload)
        },
        addProject: (state, action) => {
            action.payload.id = state.projects.length + 1
            state.projects = [...state.projects, action.payload]
        },
        updateProject: (state, action) => {
            const project = state.projects.find(p => p.id == action.payload.id)
            if (project) {
                project.done = action.payload.done
                project.name = action.payload.name
                project.deadline = action.payload.deadline
                project.description = action.payload.description
            }
        },
        deleteProject: (state, action) => {
            state.projects = state.projects.filter(p => p.id != action.payload)
        }
    }
})

export function selectedProject(dispatch: Dispatch<any>, id: number) {
    dispatch(projectSlice.actions.selectProject(id))
}

export function addProject(dispatch: Dispatch<any>, project: Project) {
    dispatch(projectSlice.actions.addProject(project))
}

export function updateProject(dispatch: Dispatch<any>, project: Project) {
    dispatch(projectSlice.actions.updateProject(project))
}

export function deleteProject(dispatch: Dispatch<any>, id: number) {
    dispatch(projectSlice.actions.deleteProject(id))
}