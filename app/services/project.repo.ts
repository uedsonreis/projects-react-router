import type { Project } from "~/models"

const storeKey = '@PROJECTS:REPO'

function persist(list: Project[]) {
    localStorage.setItem(storeKey, JSON.stringify(list))
}

function getList(): Project[] {
    const json = localStorage.getItem(storeKey)
    return json ? JSON.parse(json) : []
}

export function getProjects(): Project[] {
    let projects = getList()

    projects = projects.sort((a, b) => {
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
    })

    return projects
}

export function getProject(id: number) {
    let projects = getList()
    return projects.find(p => p.id == id)
}

export function addProject(project: Project) {
    const projects = getList()

    project.id = projects.length + 1

    projects.push(project)
    persist(projects)

    return project.id
}

export function updateProject(project: Project) {
    const projects = getList()

    const projectDB = projects.find(p => p.id == project.id)
    if (!projectDB) return false

    projectDB.name = project.name
    projectDB.done = project.done
    projectDB.deadline = project.deadline
    projectDB.description = project.description

    persist(projects)
    return true
}

export function deleteProject(id: number) {
    let projects = getList()

    projects = projects.filter(p => p.id != id)

    persist(projects)
}
