import React from 'react';
import { Button } from '@/components/ui/button'; // Importing button component
import { useContext, useState } from "react"; // Importing necessary hooks from React
import { useForm } from "react-hook-form"; // Form state and validation hook
import { Link, useNavigate } from "react-router-dom"; // Routing related hooks
import { zodResolver } from "@hookform/resolvers/zod"; // Resolver for using Zod with react-hook-form

// Importing custom form components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from '@/lib/validation'; // Validation schema for sign-up form

import { z } from 'zod'; // Importing Zod for schema validation
import { Loader } from 'lucide-react'; // Loader component
import { createUserAccount } from '@/lib/appwrite/api'; // Function to create user account
//import { createUserAccount } from '@/lib/mysql/api'; // Function to create user account (if needed)

import { useToast } from '@/components/ui/use-toast'; // Hook for displaying toast messages
import { useCreateUserAccount, useSignInAccount } from '@/lib/react-query/queriesAndMutations'; // Custom hooks for user account management
import { useUserContext } from '@/context/AuthContext'; // Context hook for managing user authentication
import axios from 'axios'; // HTTP client
import useSignup from '@/hooks/useSignup';

type Inputs = {
  name: string;
  username: string;
  email: string;
  password: string;
};

// Define the SignupForm component
const SignupForm = () => {
  const navigate = useNavigate(); // Navigation hook for redirecting users
  const { toast } = useToast(); // Toast message hook for displaying notifications
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext(); // Context hook for user authentication
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount(); // Custom hook for creating user account
  const { mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount(); // Custom hook for signing in user

  // const { loading, signup } = useSignup();

  const form = useForm<z.infer<typeof SignupValidation>>({ // useForm hook to manage form state and validation
    resolver: zodResolver(SignupValidation), // Using Zod resolver for form validation
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // Function to handle registration process
  const handleRegister = async (inputs: Inputs) => {
    try {
      // Placeholder for API call to register user (if needed)
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      toast({ title: "User created in Second database", });

      //await signup(inputs);



      const response = await axios.post("http://localhost:8800/api/auth/signup", inputs);
      console.log("response", response.data)

      localStorage.setItem("chat-user", JSON.stringify(response.data));



      const userId = response.data._id; // Assuming the response contains the user ID
      console.log("User ID:", userId);
      localStorage.setItem("userId", JSON.stringify(userId));
      toast({ title: "User created in third database", });


      // console.log("User created in SQL database");
    } catch (err) {
      // Display toast message if registration fails
      toast({ title: "Sign up failed. Please try again.", });
      throw err; // Re-throw the error to handle it in the onSubmit function
    }
  };

  // Function to handle form submission
  async function onSubmit(values: z.infer<typeof SignupValidation>) {

    // Create user account using the custom hook
    const newUser = await createUserAccount(values);
    toast({ title: "User created in First database", });
    console.log("User created in Appwrite");

    // Call the handleRegister function here
    await handleRegister(values);

    // Handle sign-in process
    if (!newUser) {
      // Display toast message if sign-up fails
      toast({ title: "Sign up failed. Please try again.", });
      return;
    }

    let isLogg = false; // Flag to track if user is successfully logged in
    let email = values.email;
    let password = values.password;

    try {
      // Placeholder for API call to log in user (if needed)
      const res = await axios.post("http://localhost:8800/api/auth/login", { email, password }, {
        withCredentials: true,
      });
      console.log("trying to log in");
      if (res.data) {
        console.log("AAgu avtundi", res.data);
        toast({ title: "User Logged from Second database", });
        isLogg = true;
      }

      const res2 = await axios.post("http://localhost:8800/api/auth/signin", { email, password }, {
        withCredentials: true,
      });


    } catch (error) {
      // Handle error, if necessary
      console.error(error);
    }

    // Attempt to sign in the user using the custom hook
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    // If sign-in fails, display a toast message and redirect to sign-in page
    if (!session) {
      toast({ title: "Something went wrong. Please login to your new account", });
      navigate("/sign-in");
      return;
    }

    // Check if the user is authenticated after attempting to log in
    const isLoggedIn = await checkAuthUser();
    isLogg = true; // Mark the user as successfully logged in

    // If user is logged in and successfully authenticated, reset form and navigate to home page
    if (isLoggedIn && isLogg) {
      form.reset(); // Reset the form
      toast({ title: "User Logged from First database", });
      console.log("Party time!"); // Log success message
      navigate("/"); // Navigate to home page
    } else {
      // If authentication fails, display a toast message
      toast({ title: "Login failed. Please try again.", });
      return;
    }
  };

  // Render the sign-up form UI
  return (
    <Form {...form}>

      <div className='sm:w-420 flex-center flex-col'>

        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Create a new account</h2>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type='text' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type='text' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className='shad-button_primary'>
            {isCreatingAccount ? (
              <div className='flex-center gap-2'>
                <Loader /> Loading...
              </div>
            ) : "Sign up"}

          </Button>

          <p className='text-small-regular text-light-2 text-center mt-2'>Already have an account? <Link to="/sign-in" className='text-primary-500 text-small-semibold ml-1'>Log in</Link></p>
        </form>

      </div>

    </Form>
  )
}

export default SignupForm