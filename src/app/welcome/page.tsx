'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useUser } from '@/hooks/use-user';
import { Logo } from '@/components/ui/logo';
import { PageWrapper } from '@/components/page-wrapper';
import type { UserProfile } from '@/lib/data';

const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters.')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces.'),
  localOrganisation: z.string().min(3, 'Organisation is required.'),
  role: z.string({ required_error: 'Please select a role.' }),
  whatsappNumber: z
    .string()
    .min(10, 'Please enter a valid WhatsApp number.')
    .regex(/^\+?\d+$/, 'Only numbers and an optional leading + are allowed.'),
  imageUrl: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
});

const roles = [
  'Delegate',
  'LOC/COC Member',
  'Council Member',
  'Registered Trainer',
  'Noble House Member',
  'Guest',
];

export default function WelcomePage() {
  const router = useRouter();
  const { saveUser } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      localOrganisation: '',
      whatsappNumber: '',
      imageUrl: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const userProfile: UserProfile = {
      ...values,
      points: 0,
    };
    saveUser(userProfile);
    router.push('/');
  }

  return (
    <PageWrapper>
      <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Logo />
            </div>
            <CardTitle className="text-2xl">Welcome to JCI GO!</CardTitle>
            <CardDescription>
              Let&apos;s set up your digital badge for the event.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Alex Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="localOrganisation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Local Organisation</FormLabel>
                      <FormControl>
                        <Input placeholder="JCI Ibadan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Your Role</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          {roles.map((role) => (
                            <FormItem key={role} className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value={role} />
                              </FormControl>
                              <FormLabel className="font-normal">{role}</FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="whatsappNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+2348012345678" {...field} />
                      </FormControl>
                      <FormDescription>
                        Include country code. This will be used for your QR code.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Picture URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/your-photo.jpg" {...field} />
                      </FormControl>
                      <FormDescription>Leave blank to use a default avatar.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Saving...' : 'Create My Badge'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground text-center w-full">
              You can update this information later on your profile page.
            </p>
          </CardFooter>
        </Card>
      </main>
    </PageWrapper>
  );
}
