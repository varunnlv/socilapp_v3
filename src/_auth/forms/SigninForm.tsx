// Importing necessary modules and components from external libraries
import * as z from "zod"; // For defining and validating schemas
import { useForm } from "react-hook-form"; // For managing form state and validation
import { zodResolver } from "@hookform/resolvers/zod"; // Resolver for using Zod with react-hook-form
import { Link, useNavigate } from "react-router-dom"; // For navigation within the application
import axios from "axios"; // For making HTTP requests
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Custom form components
import { Input } from "@/components/ui/input"; // Custom input component
import { Button } from "@/components/ui/button"; // Custom button component
import Loader from "@/components/shared/Loader"; // Loader component for showing loading state
import { useToast } from "@/components/ui/use-toast"; // Hook for displaying toast messages

import { SigninValidation } from "@/lib/validation"; // Validation schema for sign-in form
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations"; // Custom hook for signing in
import { useUserContext } from "@/context/AuthContext"; // Context hook for managing user authentication
import useLogin from "@/hooks/useLogin";

// Define the SigninForm component
const SigninForm = () => {
  // Destructure hooks for managing form state, displaying toast messages, and navigation
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // const { loading, login2 } = useLogin();

  const { login } = useUserContext(); // Destructuring login function from user context

  // Destructure signInAccount function and isPending state from useSignInAccount hook
  const { mutateAsync: signInAccount, isPending } = useSignInAccount();

  // Initialize form state using useForm hook
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation), // Set up form validation using Zod resolver
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Function to handle form submission
  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    // Attempt to sign in the user
    const session = await signInAccount(user);

    // If sign-in fails, display a toast message and return
    if (!session) {
      toast({ title: "Login failed. Please try again." });
      return;
    }

    let isLogg = false; // Flag to track if the user is successfully logged in

    const { email, password } = user;

    try {
      // Call login function with user credentials
      await login(email, password);

      // Example of making a request to authenticate on the server
      const res = await axios.post("http://localhost:8800/api/auth/login", { email, password }, {
        withCredentials: true,
      });



      const name = res.data.name;

      console.log("res", name);

      const res2 = await axios.post("http://localhost:8800/api/auth/signin", { name, password }, {
        withCredentials: true,
      });

      localStorage.setItem("chat-user", JSON.stringify(res2.data));


      localStorage.setItem("userId", JSON.stringify(res2.data._id));



      // await login2(email, password);


      console.log("trying to log in");

      // Assuming you have a property like 'success' in your response
      if (res.data) {
        console.log("AAgu bey avtundi", res2.data);
        toast({ title: "User Logged from Second database", });
        isLogg = true;
      }
    } catch (error) {
      // Handle error, if necessary
      console.error(error);
    }

    // Check if the user is authenticated after attempting to log in
    const isLoggedIn = await checkAuthUser();

    isLogg = true; // Mark the user as successfully logged in

    // If user is logged in and successfully authenticated, reset form and navigate to home page
    if (isLoggedIn && isLogg) {
      form.reset();
      toast({ title: "User Logged from First database", });
      navigate("/");
    } else {
      // If authentication fails, display a toast message
      toast({ title: "Login failed. Please try again.", });
      return;
    }
  };

  // Render the sign-in form UI
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please enter your details.
        </p>
        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className="flex flex-col gap-5 w-full mt-4">
          {/* Form fields for email and password */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
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
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Button for submitting the form */}
          <Button type="submit" className="shad-button_primary">
            {/* Show loading indicator while form submission is pending */}
            {isPending || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Log in"
            )}
          </Button>

          {/* Link to sign-up page */}
          <p className="text-small-regular text-light-2 text-center mt-2">
            Don&apos;t have an account?
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

// Export the SigninForm component as the default export
export default SigninForm;
