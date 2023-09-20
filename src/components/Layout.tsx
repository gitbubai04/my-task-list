import Header from './Header'
import { Main } from './style'

function Layout({ children, userName, handelLogout }: any) {
    return (
        <div>
            <Header userName={userName} handelLogout={handelLogout} />
            <Main>
                {children}
            </Main>
        </div>
    )
}

export default Layout