import React from 'react'
import { Outlet, Navigate } from "react-router-dom";

// Define the AuthLayout component responsible for rendering the layout of authentication-related pages.
export default function AuthLayout() {
  // Define a variable to represent the authentication status. Currently set to false for demonstration purposes.
  const isAuthenticated = false;

  // Render the component
  return (
    <>
      {/* Conditional rendering based on authentication status */}
      {isAuthenticated ? (
        // If the user is authenticated, redirect to the home page using the Navigate component
        <Navigate to="/" />
      ) : (
        // If the user is not authenticated, render authentication-related content
        <>
          {/* Section for rendering child routes */}
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            {/* Render child routes using the Outlet component */}
            <Outlet />
          </section>

          {/* Background image for visual appeal in larger screens */}
          <img
            src="public/assets/images/img3.jpg"
            alt="logo"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  );
}
