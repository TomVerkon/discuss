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

interface PostCreateFormProps {
  topicSlug: string;
}

export default function PostCreateForm({ topicSlug }: PostCreateFormProps) {
  const [formState, action] = useFormState(
    actions.createPost.bind(null, topicSlug),
    {
      errors: {},
    }
  );

  return (
    <Popover placement='left-start'>
      <PopoverTrigger>
        <Button color='primary'>Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className='flex flex-col gap-4 p-4 w-80'>
            <h3 className='text-lg'>Create a Post</h3>
            <Input
              label='Title'
              labelPlacement='outside'
              placeholder='Title'
              name='title'
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(', ')}
            />
            <Textarea
              label='Content'
              labelPlacement='outside'
              placeholder='Content'
              name='content'
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(', ')}
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
