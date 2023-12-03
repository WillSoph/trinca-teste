import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import ChurrasCard from '../../components/ChurrasCard'
import AddChurrasCard from '../../components/AddChurrasCard'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { ChurrasContext } from '../../contexts/ChurrasContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'
import { Trash } from 'phosphor-react'
// import logoImg from '../../assets/trinca_churras_logo.png'
import styled from 'styled-components'

import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import { useState } from 'react'
import { useSummary } from '../../hooks/useSummary'

const ChurrasCardContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
  display: flex;
  flex-wrap: wrap;
  margin-top: -4rem;
`

export function Transactions() {
  const [showCards, setShowCards] = useState(true)
  const [showTable, setShowTable] = useState(false)
  const summary = useSummary()
  function handleShowTable() {
    console.log('pegou')
    setShowTable(!showTable)
    setShowCards(!showCards)
  }
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })
  const handleDeleteTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.handleDeleteTransaction
    },
  )
  const churrasData = useContextSelector(ChurrasContext, (context) => {
    return context.churrasList
  })

  return (
    <div>
      <Header />

      {showCards && (
        <ChurrasCardContainer>
          {churrasData.map((churras) => {
            const originalDate = new Date(churras.date)
            // eslint-disable-next-line prettier/prettier
            const newDate = new Date(originalDate.setDate(originalDate.getDate() + 1))            
            return (
              <ChurrasCard
                key={churras.id}
                date={newDate.toLocaleDateString('pt-BR')}
                description={churras.description}
                participants={transactions.length}
                price={summary.total}
                onClick={handleShowTable}
              />
            )
          })}
          <AddChurrasCard
            key="add-churras"
            date="Adicionar"
            description="Churras"
          />
        </ChurrasCardContainer>
      )}

      {showTable && (
        <>
          <Summary />

          <TransactionsContainer>
            <SearchForm />

            <TransactionsTable>
              <tbody>
                {transactions.map((transaction) => {
                  return (
                    <tr key={transaction.id}>
                      <td width="50%">{transaction.description}</td>
                      <td>
                        <PriceHighlight variant={transaction.type}>
                          {transaction.type === 'outcome' && '- '}
                          {priceFormatter.format(transaction.price)}
                        </PriceHighlight>
                      </td>
                      <td>{transaction.category}</td>
                      <td>
                        {dateFormatter.format(new Date(transaction.createdAt))}
                      </td>
                      <td>
                        <Trash
                          name="trash"
                          size={24}
                          color="#F75A68"
                          onClick={() =>
                            handleDeleteTransaction(transaction.id)
                          }
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </TransactionsTable>
          </TransactionsContainer>
        </>
      )}
    </div>
  )
}
