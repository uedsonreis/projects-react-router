import React from 'react'
import type { Route } from './+types/callback'

export async function loader({ request }: Route.LoaderArgs) {

    const queryParam = request.url.split('?')[1]
    const code = queryParam?.split('=')[1]

    const url = `https://github.com/login/oauth/access_token`

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            client_id: import.meta.env.VITE_CLIENT_ID,
            client_secret: import.meta.env.VITE_CLIENT_SECRET,
            code
        })
    })

    const data = await response.json()
    return data.access_token
}

export default function CallbackPage(props: Route.ComponentProps) {

    const [user, setUser] = React.useState<any>(null)

    fetch('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${props.loaderData}`
        }
    })
    .then(res => res.json())
    .then(data => setUser(data))

    return (
        <div>
            <h1>Callback Page</h1>
            <p>Name: {user ? user.name : 'Loading...'}</p>
            <p>Username: {user ? user.login : 'Loading...'}</p>
        </div>
    )
}