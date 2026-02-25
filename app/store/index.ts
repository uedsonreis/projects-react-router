import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { themeSlice } from './theme.slice'
import { projectSlice } from './project.slice'

const myStorage = {
    getItem: async (key: string) => {
        if (storage.getItem) return await storage.getItem(key)
        return null
    },
    setItem: async (key: string, value: string) => {
        if (storage.setItem) await storage.setItem(key, value)
    },
    removeItem: async (key: string) => {
        if (storage.removeItem) await storage.removeItem(key)
    }
}

export const store = configureStore({
    reducer: persistReducer(
        {
            key: 'root_app',
            storage: myStorage,
        },
        combineReducers({
            theme: themeSlice.reducer,
            project: projectSlice.reducer,
        }),
    ),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ],
        }
    })
})

export const persistor = persistStore(store)