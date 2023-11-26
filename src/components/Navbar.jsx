import {
    Navbar,
    Typography,
    IconButton,
  } from "@material-tailwind/react";
import {  ShoppingBasket } from "lucide-react";
   
  export default function NavbarDark() {
    return (
      <Navbar
        variant="gradient"
        color="blue-gray"
        className="mx-auto max-w-screen-3xl from-blue-gray-900 to-blue-gray-800 px-4 py-3 rounded-none"
      >
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 ml-2 cursor-pointer py-1.5"
          >
            Pixel 
          </Typography>
          <div className="ml-auto flex gap-1 md:mr-4">
            <IconButton variant="text" color="white">
              <ShoppingBasket className="h-4 w-4" />
            </IconButton>
          </div>
        </div>
      </Navbar>
    );
  }