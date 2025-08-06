import storage from 'redux-persist/lib/storage'
import { configureStore } from '@reduxjs/toolkit'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistReducer, persistStore } from 'redux-persist'

import { projectSlice } from "./project.slice"

const myStorage = {
    getItem: async (key: string) => {
        if (storage.getItem) return await storage.getItem(key)
        return null
    },
    setItem: async (key: string, item: string) => {
        if (storage.setItem) await storage.setItem(key, item)
    },
    removeItem: async (key: string) => {
        if (storage.removeItem) await storage.removeItem(key)
    },
}

export const store = configureStore({
    reducer: persistReducer(
        {
            key: projectSlice.name,
            storage: myStorage
        },
        projectSlice.reducer
    ),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})

export const persistor = persistStore(store)