'use client'

import { Provider } from 'react-redux'
import store from './store'

import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';

export default function Providers({ children }: {children: React.ReactNode}) {
    return (
        <Provider store={store}>
            <ThemeProvider theme={original}>
                {children}
            </ThemeProvider>
        </Provider>
    )
}