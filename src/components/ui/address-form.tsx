import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import { Button } from "./button";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  line1: z.string().min(4, { message: "Address line 1 is required" }),
  line2: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  postalCode: z.string().min(1, { message: "Postal code is required" }),
});
export type AddressFormValues = z.infer<typeof formSchema>;

export default function AddressForm({ onFormSubmit }: { onFormSubmit: (data: AddressFormValues) => void }) {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
    },
  });

  function onSubmit(data: AddressFormValues) {
    onFormSubmit(data);
  }

  return (
    <Card className="shadow-lg rounded-lg p-4 md:p-6 bg-white md:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-semibold text-gray-800">Address Information</CardTitle>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="line1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Address Line 1</FormLabel>
                    <FormControl>
                      <Input {...field} className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="line2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Address Line 2</FormLabel>
                    <FormControl>
                      <Input {...field} className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </FormControl>
                    <FormDescription className="text-gray-500">Optional</FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">City</FormLabel>
                      <FormControl>
                        <Input {...field} className="border border-gray-300 rounded-md p-2 focus:outline-none focus :ring-2 focus:ring-blue-500" />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">State</FormLabel>
                      <FormControl>
                        <Input {...field} className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </section>
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Postal Code</FormLabel>
                    <FormControl>
                      <Input {...field} className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </CardHeader>
    </Card>
  );
}