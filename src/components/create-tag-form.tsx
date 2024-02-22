import { Check, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from './ui/button'
import * as Dialog from '@radix-ui/react-dialog'

const createTagSchema = z.object({
  title: z.string().min(3, { message: 'Minimum 3 characters.' }),
  slug: z.string()
})

type CreateTagSchema = z.infer<typeof createTagSchema>

function getSlugFromString(input: string): string {
  return input
    .normalize('NFD') // remove acentos
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // troca o q não é palavra por vazio
    .replace(/\s+/g, '-')   // troca espaços por -
}

export function CreateTagForm() {
  const { register, handleSubmit, watch } = useForm<CreateTagSchema>({
    resolver: zodResolver(createTagSchema)
  })
  
  function createTag(data: CreateTagSchema) {
    console.log(data)
  }

  const slug = watch('title') ? getSlugFromString(watch('title')) : ''

  return (
    <form onSubmit={handleSubmit(createTag)} className='w-full space-y-6'>
      <div className='space-y-2'>
        <label className='text-sm font-medium block' htmlFor='title'>
          Tag name
        </label>
        <input
          {...register('title')}
          id='title'
          type='text'
          className='w-full border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-800/50 text-sm'
        />
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium block' htmlFor='slug'>
          Slug
        </label>
        <input
          {...register('slug')}
          id='slug'
          type='text'
          readOnly
          value={slug}
          className='w-full border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-800/50 text-sm'
        />
      </div>

      <div className='flex items-center justify-end gap-2'>
        <Dialog.Close asChild>
          <Button>
            <X className='size-3' />
            Cancel
          </Button>
        </Dialog.Close>

        <Button className='bg-teal-400 text-teal-950' type='submit'>
          <Check className='size-3' />
          Save
        </Button>
      </div>
    </form>
  )
}