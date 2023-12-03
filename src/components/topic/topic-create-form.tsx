'use client';
import * as actions from '@/actions';
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@nextui-org/react';
import { useFormState } from 'react-dom';
import FormButton from '../common/form-button';

export default function TopicCreateForm() {
  const [formState, action] = useFormState(actions.createTopic, { errors: {} });
  return (
    <Popover placement='left-start'>
      <PopoverTrigger>
        <Button color='primary'>Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className='flex flex-col gap-4 p-4 w-80'>
            <h3 className='text-lg'>Create a Topic</h3>
            <Input
              label='Name'
              labelPlacement='outside'
              placeholder='Name'
              name='name'
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(', ')}
            />
            <Textarea
              label='Description'
              labelPlacement='outside'
              placeholder='Describe your topic'
              name='description'
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(', ')}
            />

            {formState.errors._form ? (
              <div className='text-tiny text-danger'>
                {formState.errors._form?.join(', ')}
              </div>
            ) : null}

            <FormButton>Save</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
