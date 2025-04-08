
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PersonalCommitment, TaggedUser } from "@/types/commitments";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UserTagsInput from "./UserTagsInput";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  goal: z.string().min(5, "Goal must be at least 5 characters"),
  milestone: z.string().optional(),
  deadline: z.date().optional(),
  isPublic: z.boolean().default(false)
});

interface PersonalCommitmentFormProps {
  onSubmit: (data: Partial<PersonalCommitment>) => void;
}

const PersonalCommitmentForm = ({ onSubmit }: PersonalCommitmentFormProps) => {
  const [taggedUsers, setTaggedUsers] = useState<TaggedUser[]>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      goal: "",
      milestone: "",
      isPublic: false
    }
  });
  
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const commitmentData: Partial<PersonalCommitment> = {
      ...values,
      type: "personal",
      parties: taggedUsers,
      status: "active",
      deadline: values.deadline ? format(values.deadline, "yyyy-MM-dd") : undefined
    };
    
    onSubmit(commitmentData);
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Personal Commitment</h2>
        <p className="text-gray-500 mt-1">Create a commitment for your personal goals and ambitions</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title of your commitment" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your commitment in detail..."
                    className="min-h-[120px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Goal</FormLabel>
                <FormControl>
                  <Input placeholder="What's your specific goal?" {...field} />
                </FormControl>
                <FormDescription>
                  Clearly define what you want to achieve with this commitment
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="milestone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Milestone (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Key milestone to track progress" {...field} />
                </FormControl>
                <FormDescription>
                  Add an optional milestone to track your progress
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Deadline</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Set a deadline for your commitment
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Public Commitment</FormLabel>
                  <FormDescription>
                    Make this commitment visible to everyone
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          {/* Tagged Users Section */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div>
              <h3 className="font-medium mb-2">Tag Users</h3>
              <UserTagsInput 
                onTagsChange={(tags) => setTaggedUsers(tags)} 
                className="glow-effect"
              />
              <p className="text-xs text-gray-500 mt-1">
                Add users who are associated with your commitment or need to be informed
              </p>
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => window.history.back()}>Cancel</Button>
            <Button type="submit">Create Commitment</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PersonalCommitmentForm;
