import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { X } from 'phosphor-react'
import { useContextSelector } from 'use-context-selector'
import * as z from 'zod'
import { ChurrasContext } from '../../contexts/ChurrasContext'

import { CloseButton, Content, Overlay } from './styles'

const newChurrasFormSchema = z.object({
  description: z.string(),
  date: z.string(),
})

type NewChurrasFormInputs = z.infer<typeof newChurrasFormSchema>

export function NewChurrasModal() {
  const createChurras = useContextSelector(ChurrasContext, (context) => {
    return context.createChurras
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewChurrasFormInputs>({
    resolver: zodResolver(newChurrasFormSchema),
  })

  async function handleCreateNewChurras(data: NewChurrasFormInputs) {
    const { description, date } = data

    await createChurras({
      description,
      date,
    })

    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Novo Churras</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewChurras)}>
          <input
            type="text"
            placeholder="Nome"
            required
            {...register('description')}
          />
          <input
            type="date"
            placeholder="Data"
            required
            {...register('date')}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
