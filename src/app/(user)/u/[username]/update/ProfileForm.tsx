"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First Name must be at least 2 characters." })
    .max(50, { message: "First Name must contain at most 50 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last Name must be at least 2 characters." })
    .max(50, { message: "Last Name must contain at most 50 characters" }),
  bio: z
    .string()
    .min(2, { message: "Bio must be at least 10 characters." })
    .max(100, { message: "Bio must contain at most 100 characters" }),
});

const ProfileForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      bio: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(">>>>> values >>>>>>>", values); // eslint-disable-line
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-md border p-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="First Name"
                    {...field}
                    className="border-muted-foreground/40 focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Last Name"
                    {...field}
                    className="border-muted-foreground/40 focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={"abhi@gmail.com"}
              disabled
              className="mt-2 border-muted-foreground/40 focus:border-primary"
            />
          </div>

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Type your message here."
                    className="border-muted-foreground/40 focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-end gap-5">
            <Button
              variant={"outline"}
              className="rounded-full"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-full"
            >
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
