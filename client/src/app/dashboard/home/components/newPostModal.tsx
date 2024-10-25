"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  imageUrl: z.string().url("Invalid URL").nonempty("Image URL is required."),
  location: z.string().nonempty("Location is required."),
  description: z.string().nonempty("Description is required."),
  category: z.string().nonempty("Category is required."),
});

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewPostModal: React.FC<PostModalProps> = ({ isOpen, onClose }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: "",
      location: "",
      description: "",
      category: "",
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const imageUrl = form.getValues("imageUrl");
    if (imageUrl) {
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }
  }, [form.watch("imageUrl")]);

  const onSubmit = (data: any) => {
    console.log(data);
    onClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-[#FF678B] rounded-lg shadow-lg w-[70%] h-[80%] flex">
        <div className="w-1/2 h-full">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Image Preview"
              className="object-cover w-full h-full rounded-l-lg"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-l-lg">
              <p className="text-gray-500 font-bold">
                Enter the image link to preview it
              </p>
            </div>
          )}
        </div>
        <div className="w-1/2 h-full p-4 flex flex-col justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 flex-grow"
            >
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-white">
                      Image URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                        className="text-white"
                      />
                    </FormControl>
                    <FormMessage className="font-bold " />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-white">
                      Location
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter country"
                        {...field}
                        className="text-white"
                      />
                    </FormControl>
                    <FormMessage className="font-bold" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-white">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Describe your post..."
                        {...field}
                        className="text-white"
                      />
                    </FormControl>
                    <FormMessage className="font-bold" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-white">
                      Category
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select a category"
                            className="text-white"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nature">Nature</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="art">Art</SelectItem>
                          <SelectItem value="travel">Travel</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="font-bold " />
                  </FormItem>
                )}
              />
              <div className="flex space-x-4">
                <Button type="submit" className="font-bold text-white">
                  Share
                </Button>
                <Button
                  type="button"
                  onClick={handleClose}
                  className="font-bold text-white"
                >
                  Close
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewPostModal;
