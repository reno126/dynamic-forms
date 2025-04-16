# Dynamic Forms Application

This is a Next.js application for creating and managing dynamic forms and their corresponding records.

## Live demo at https://dynamic-forms-eta.vercel.app/

## Core Technologies

Next.js, TypeScript, Tailwind CSS, shadcn/ui, React Hook Form, Dexie.js, Jest, RTL and Playwright

## Motivation

### Demo of `shadcn/ui`

A key aspect of this project is its use of `shadcn/ui`. Unlike traditional component libraries (like Material-UI), `shadcn/ui` is not a package installed from npm. Instead, it provides a CLI tool that copies the source code of beautifully designed components directly into your project.

This approach gives us full ownership and control over the component code. The base components provided by `shadcn/ui` are located in the `src/lib/ui/` directory. We can  modify them to fit the specific needs of our application. This avoids dependency-related issues and makes customization straightforward.

### Demo Dexie 

Dexie.js significantly simplifies interactions with the browser's IndexedDB. Instead of IndexedDB's complex, event-based native API, Dexie provides a clean, modern, and Promise-based syntax. This makes defining the database schema, handling versioning, and performing CRUD operations much more intuitive and readable.

### Demo of RHF (react hook form)

RHF makes it very easy to work with dynamic forms. In turn, controlled components - operating in isolation - do not cause performance problems, even with a very large number of fields.

## ToDo 
- handle error - form now only the global error handler is implemented
- extends e2e test

## Getting Started

To run the application locally, first install the dependencies:

npm install
npm run dev
