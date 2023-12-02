import { ThemeProvider } from 'styled-components'
import { TransactionsProvider } from './contexts/TransactionsContext'
import { ChurrasProvider } from './contexts/ChurrasContext'
import { Transactions } from './pages/Transactions'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <ChurrasProvider>
        <TransactionsProvider>
          <Transactions />
        </TransactionsProvider>
      </ChurrasProvider>
    </ThemeProvider>
  )
}
