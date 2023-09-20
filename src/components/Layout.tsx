import React from 'react'

function Layout({ children }: any) {
    return (
        <div>
            <h1>header</h1>

            {children}
        </div>
    )
}

export default Layout