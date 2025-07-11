// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { People } from "./pages/People";
import { Ships } from "./pages/Ships";
import { Vehicles } from "./pages/Vehicles";
import { Species } from "./pages/Species";
import { Planets } from "./pages/Planets";
import { Films } from "./pages/Films";

export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/" element={<Home />} />
      <Route path="/people" element={<People />} />
      <Route path="/people/:id" element={<People />} />
      <Route path="/films" element={<Films />} />
      <Route path="/films/:id" element={<Films />} />
      <Route path="/ships" element={<Ships />} />
      <Route path="/ships/:id" element={<Ships />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/vehicles/:id" element={<Vehicles />} />
      <Route path="/species" element={<Species />} />
      <Route path="/species/:id" element={<Species />} />
      <Route path="/planets" element={<Planets />} />
      <Route path="/planets/:id" element={<Planets />} />
    </Route>
  )
);