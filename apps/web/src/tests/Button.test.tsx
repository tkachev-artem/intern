import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

describe('Button', () => {
    it('рендерит текст', () => {
        render(<button>Нажми меня</button>)
        expect(screen.getByText('Нажми меня')).toBeInTheDocument()
    })
})