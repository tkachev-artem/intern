import type { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="layout">
            <header className="layout__header">
                {/* Навбар будет тут */}
                <nav className="navbar">
                    <span className="navbar__logo">Zuzex</span>
                    {/* Ссылки: Лента, Профиль, Выход */}
                </nav>
            </header>
            <main className="layout__main">
                {children}
            </main>
            <footer className="layout__footer">
                <p>&copy; 2026 Zuzex — Социальная сеть ИТ-специалистов</p>
            </footer>
        </div>
    )
}

export default Layout
