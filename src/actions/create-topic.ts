'use server';
import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/path';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { Topic } from 'prisma/prisma-client';

import { z } from 'zod';

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: 'Must be lowercase letters or dashes without spaces',
    }),
  description: z.string().min(10),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}
/*
{
  name: [
    'String must contain at least 3 character(s)',
    'Must be lowercase letters or dashes without spaces'
  ],
  description: [ 'String must contain at least 10 character(s)' ]
}
*/

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  console.log(session);
  if (!session || !session.user) {
    return { errors: { _form: ['You must be logged in'] } };
  }

  let topic: Topic;

  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { errors: { _form: [err.message] } };
    } else {
      return { errors: { _form: ['Something went wrong'] } };
    }
  }

  revalidatePath('/');
  redirect(paths.topicShow(topic.slug));
}
