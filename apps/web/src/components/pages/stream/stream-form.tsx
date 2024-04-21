'use client'
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { Label } from "@/ui/label";
import { Controller, useForm } from "react-hook-form";

export const StreamForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  return (
    <div className="w-full space-y-4">
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <div>
            <Label className="uppercase">title</Label>
            <Input {...field} placeholder="Title"/>
          </div>
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <div>
            <Label className="uppercase">description</Label>
            <Textarea {...field} placeholder="Description" className="resize-none h-36"/>
          </div>
        )}
      />
    </div>
  );
};
