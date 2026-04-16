import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    test: {
        globals: true,        // позволяет использовать describe/it/expect без импорта
        environment: 'jsdom', // эмулирует браузерное окружение
        setupFiles: './src/setupTests.ts', // файл с начальной конфигурацией
    },
})