import { createSlice, type Dispatch } from '@reduxjs/toolkit'

import type { Project } from '~/models'

export type ProjectState = {
    projects: Project[],
}

function sortProjects(a: Project, b: Project) {
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
    name: 'project',
    initialState: { projects: [] } as ProjectState,
    reducers: {
        addProject: (state, action) => {
            state.projects = [
                ...state.projects,
                { ...action.payload, id: state.projects.length + 1 }
            ].sort(sortProjects)
        },
        updateProject: (state, action) => {
            const selected = state.projects.find(p => p.id == action.payload.id)
            if (selected) {
                selected.name = action.payload.name
                selected.done = action.payload.done
                selected.deadline = action.payload.deadline
                selected.description = action.payload.description
            }
            state.projects = state.projects.sort(sortProjects)
        },
        deleteProject: (state, action) => {
            state.projects = state.projects.filter(p => p.id != action.payload)
        }
    }
})

export function addProjectAction(dispatch: Dispatch<any>, project: Project) {
    dispatch(projectSlice.actions.addProject(project))
}

export function updateProjectAction(dispatch: Dispatch<any>, project: Project) {
    dispatch(projectSlice.actions.updateProject(project))
}

export function deleteProjectAction(dispatch: Dispatch<any>, id: number) {
    dispatch(projectSlice.actions.deleteProject(id))
}