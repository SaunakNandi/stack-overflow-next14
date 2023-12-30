"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QuestionsSchema } from "@/lib/validations";
import { Badge } from "../ui/badge";
import Image from "next/image";

const type:any='create'
const Question = () => {

  const [isSubmitting,setIsSubmitting]=useState(false)
  const editorRef = useRef(null);

  // Define your form
  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    
    setIsSubmitting(true)  // woundn't allow to submit twice
    try {
      // make an async call to your API to create a question
      // api should contan all form data
      // navigate to home page
    } catch (error) {
      
    }
    finally{

    }
    
    //console.log(values);
  }


// when form get updated field automatically gets updated
  const handelInputKeyDown=(e:React.KeyboardEvent<HTMLInputElement>,
    field:any)=> {
    // check if the key is the enter key and the field is of type 'tag'
    
    if(e.key==='Enter' && field.name==='tags')
    {
      e.preventDefault()  // submit reloads the browser
      const tagInput=e.target as HTMLInputElement  // fetching the input element
      const tagValue=tagInput.value.trim()  // trim empty spaces
      
      if(tagValue!==''){
        if(tagValue.length>15)
        {
          return form.setError('tags',{
            type:'required',
            message:'Tag must be less than 15 characters.'
          })
        }

        // tagValue as never means it never going to be a tag value
        if(!field.value.includes(tagValue as never))  // this tag doesn't exist or ready within the field
        { 
          //if tag doesn't exist than do this
          form.setValue('tags',[...field.value,tagValue])
          tagInput.value=''
          form.clearErrors('tags')
        }
        //console.log(field.value)
      }
      else{
        form.trigger()
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel
                className="paragraph-semibold
              text-dark400_light800"
              >
                Question Title
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular
                background-light900_dark300 light-border-2
                text-dark300_light700 min-h-[56px] border"
                  placeholder="shadcn"
                  {...field}
                />
              </FormControl>
              <FormDescription
                className="body-regular mt-2.5
              text-light-500"
              >
                Be specific and imagine you&apos;re askng a question to another
                person.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel
                className="paragraph-semibold
              text-dark400_light800"
              >
                Detailed explanation of your problem
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                {/* TODO: add an Editor */}
                <Editor
                apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(evt, editor) => (
                    // @ts-ignore
                    editorRef.current = editor
                    )}
                  initialValue=""
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                        "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor",
                        "searchreplace", "visualblocks", "codesample", "fullscreen",
                        "insertdatetime", "media", "table"
                      ],
                    
                    toolbar:
                      "undo redo | formatselect | " + " codesample "+
                      "codesample | bold italic backcolor | alignleft aligncenter |" +
                      "alignright alignjustify | bullist numlist outdent indent | " ,
                    content_style:
                      "body { font-family:Inter; font-size:16px }",
                  }}
                />
              </FormControl>
              <FormDescription
                className="body-regular mt-2.5
              text-light-500"
              >
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel
                className="paragraph-semibold
              text-dark400_light800"
              >
                Add Tags
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                <Input
                  className="no-focus paragraph-regular
                background-light900_dark300 light-border-2
                text-dark300_light700 min-h-[56px] border"
                  placeholder="Add Tags"
                  onKeyDown={(e)=>handelInputKeyDown(e,field)}
                />
                {/* {console.log(field.value)} */}
                {field.value.length>0 && 
                  <div className="flex-start mt-2.5 gap-2.5">
                    {
                      field.value.map((tag:any)=>(
                      <Badge key={tag}
                      className="subtle-medium background-light800_dark300
                      text-light400_light500 flex items-center justify-center
                      gap-2 rounded-md px-4 py-2 capitalize">
                        {tag}
                        <Image
                        src="/assets/icons/close.svg"
                        alt="Close icon"
                        width={12}
                        height={12}
                        className="cursor-pointer object-contain invert-0
                        dark:invert"/>
                      </Badge>
                    ))}
                  </div>
                }
                </>
              </FormControl>
              <FormDescription
                className="body-regular mt-2.5
              text-light-500"
              >
                Add up to 3 tags to describe what your question is about. Start
                typing to see suggestions.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button type="submit" 
        className="primary-gradient w-fit !text-light-900"
        disabled={isSubmitting}>
          {isSubmitting?(
            <>
              {type==='edit'? "Editing...":"Posting..."}
            </>
          ):(
            <>
            {type==='edit'?'Edit Question':'Ask a question'}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Question;
