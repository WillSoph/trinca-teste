import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/trinca_churras_logo.png'
import { NewTransactionModal } from '../NewTransactionModal'

export function Header() {
  function handleRefresh() {
    window.location.reload()
  }
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" width="200px" onClick={handleRefresh} />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Novo participante</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
