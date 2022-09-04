import { Suspense } from 'react'
import { Banana } from './components/Banana'
import { Overlay } from './components/Overlay'

export const App = () => {
    return (
        <>
            <Suspense fallback={null}>
                <Banana />
            </Suspense>
            <Overlay />
        </>
    )
}
