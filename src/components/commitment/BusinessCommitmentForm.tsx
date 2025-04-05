
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BusinessCommitment, TaggedUser } from "@/types/commitments";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
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

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  terms: z.string().optional(),
  deadline: z.date().optional(),
  value: z.string().optional().transform(val => val ? parseFloat(val) : undefined)
});

interface BusinessCommitmentFormProps {
  onSubmit: (data: Partial<BusinessCommitment>) => void;
}

const BusinessCommitmentForm = ({ onSubmit }: BusinessCommitmentFormProps) => {
  const [parties, setParties] = useState<TaggedUser[]>([]);
  const [documents, setDocuments] = useState<BusinessCommitment["documents"]>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      terms: "",
    }
  });
  
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const commitmentData: Partial<BusinessCommitment> = {
      ...values,
      type: "business",
      parties,
      documents,
      deadline: values.deadline ? format(values.deadline, "yyyy-MM-dd") : undefined
    };
    
    onSubmit(commitmentData);
  };
  
  // Mock function for document upload
  const handleDocumentUpload = () => {
    const mockDocument = {
      name: `Document-${documents.length + 1}.pdf`,
      url: "#",
      type: "contract" as const,
      uploadedAt: new Date().toISOString()
    };
    
    setDocuments([...documents, mockDocument]);
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Business Commitment</h2>
        <p className="text-gray-500 mt-1">Create a business agreement with contract documents</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agreement Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title of your business agreement" {...field} />
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
                    placeholder="Describe the business agreement details..."
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
            name="terms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Terms & Conditions</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter terms and conditions of the agreement..."
                    className="min-h-[150px]" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Detail the specific terms of this business agreement
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agreement Value (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    placeholder="Enter monetary value" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  If applicable, specify the monetary value of this agreement
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
                <FormLabel>Deadline/Expiry Date</FormLabel>
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
                  Set a deadline or expiry date for this agreement
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Document Upload Section */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Related Documents</h3>
              <Button type="button" variant="outline" size="sm" onClick={handleDocumentUpload}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </div>
            
            {documents.length > 0 ? (
              <div className="space-y-2">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="ghost" className="text-red-500">Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No documents uploaded yet</p>
            )}
            
            <FormDescription>
              Upload contracts, invoices, receipts, and other relevant documents
            </FormDescription>
          </div>
          
          {/* Parties Section */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Involved Parties</h3>
              <Button type="button" variant="outline" size="sm">
                Add Party
              </Button>
            </div>
            
            {parties.length > 0 ? (
              <div className="space-y-2">
                {parties.map((party, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium">{party.name}</p>
                      <p className="text-sm text-gray-500">{party.email}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="text-red-500">Remove</Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No parties added yet</p>
            )}
          </div>
          
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit">Create Business Agreement</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BusinessCommitmentForm;
