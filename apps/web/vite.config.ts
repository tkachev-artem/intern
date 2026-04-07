import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,        // позволяет использовать describe/it/expect без импорта
        environment: 'jsdom', // эмулирует браузерное окружение
        setupFiles: './src/setupTests.ts', // файл с начальной конфигурацией
    },
})