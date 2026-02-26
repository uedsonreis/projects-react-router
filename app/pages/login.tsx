
const url = 'https://github.com/login/oauth/authorize?scope=user:email&client_id='

export default function LoginPage() {

    function signInWithGitHub() {
        window.open(url, "_self")
    }

    return (
        <div className="page">
            <header>
                <span>Página de Acesso</span>
            </header>

            <main>
                <button className='githubButton' onClick={signInWithGitHub}>
                    Entrar com GitHub
                </button>
            </main>

        </div>
    )
}
