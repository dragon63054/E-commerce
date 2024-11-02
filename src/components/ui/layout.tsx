import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "./input";
import { Search, ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Badge } from "./badge";
import { Button } from "./button";
import { getCartItemCount } from "@/lib/utils";
import { Store } from "lucide-react";


function Header() {
  const { items } = useSelector((state: RootState) => state.cart);
  const totalItems = getCartItemCount(items);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [usernameInitial, setUsernameInitial] = useState(""); 
  const [showProfileInfo, setShowProfileInfo] = useState(false); // State to manage profile info visibility
  const [username, setUsername] = useState(""); // State to store username
  const [password, setPassword] = useState(""); // State to store password

  useEffect(() => {
    function loadCategories() {
      fetch("https://dummyjson.com/products/category-list")
        .then((res) => res.json())
        .then(setCategories);
    }
    loadCategories();
  }, []);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setUsernameInitial(storedName.charAt(0).toUpperCase()); // Set the first character of the username
      setUsername(storedName); // Store the username
      // Assuming password is stored in localStorage for demonstration purposes
      const storedPassword = localStorage.getItem('password');
      if (storedPassword) {
        setPassword(storedPassword);
      }
    }
  }, []);

  function onCategoryChange(updatedCategory: string) {
    console.log(updatedCategory);
    if (updatedCategory === "all") {
      navigate("/");
    } else {
      navigate(`/?category=${updatedCategory}`);
    }
  }

  function searchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
    if (event.target.value === "") {
      navigate("/");
    }
  }
  
  function onSearchClick() {
    if (search) {
      navigate(`/?search=${search}`);
    }
  }

  function toggleDropdown() {
    setDropdownOpen(!dropdownOpen);
    if (dropdownOpen) {
      setShowProfileInfo(false); // Hide profile info when dropdown is closed
    }
  }

  function handleLoginClick() {
    setUsernameInitial(""); // Clear the initial when logging out
    navigate("/login"); // Redirect to login page
    console.log("Login button clicked");
  }

  function handleProfileClick() {
    setShowProfileInfo(!showProfileInfo); // Toggle the profile info visibility
  }

  return (
    <header className="p-4 grid grid-cols-[auto_1fr_auto] gap-2">
<section className="flex items-center"><Store /></section>
      <section className="grid grid-cols-[auto_1fr] gap-2 place-content-center">
        <Select onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder={"All"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="capitalize">
              all
            </SelectItem>
            {categories?.length > 0
              ? categories.map((category) => (
                  <SelectItem key={category} value={category} className="capitalize">
                    {category}
                  </SelectItem>
                ))
              : null}
          </SelectContent>
        </Select>
        <section className="shadow-sm transition-colors border border-input rounded-lg px-2 flex items-center focus-within:ring-1 focus-within:ring-primary">
          <Input
            type="search"
            value={search}
            onChange={searchChange}
            className="border-none shadow-none focus-visible:ring-0 outline-none"
            placeholder="Search..."
          />
          <Search className="size-6 text-muted-foreground" onClick={onSearchClick} />
        </section>
      </section>
      <section className="flex items-center gap-2">
        <section className="relative size-10 flex">
          {items.length > 0 ? (
            <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 text-[.5rem] size-4 p-2 rounded-full bg-primary/80 grid place-content-center">
              <span>{totalItems}</span>
            </Badge>
          ) : null}
          <Button onClick={() => navigate("/cart")} className="w-full h-full" variant={"ghost"} size={"sm"}>
            <ShoppingCart className="size-6 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
          </Button>
        </section>
        <div className="relative">
          <Avatar onClick={toggleDropdown}>
            <AvatarImage src="" alt="username" />
            <AvatarFallback className="hover:cursor-pointer font-bold text-xl">{usernameInitial}</AvatarFallback>
          </Avatar>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
              <ul>
                <li>
                  <a onClick={handleLoginClick} className="block py-2 px-4 text-gray-800 hover:bg-gray-100 hover:cursor-pointer">
                    Logout
                  </a>
                </li>
                <li>
                  <a onClick={handleProfileClick} className="block py-2 px-4 text-gray-800 hover:bg-gray-100">
                    Profile
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-4 text-gray-800 hover:bg-gray-100">
                    Settings
                  </a>
                </li>
              </ul>
              {showProfileInfo && (
                <div className="p-4">
                  <p>Username: {username}</p>
                  <p>Password: {password}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </header>
  );
}

import { Facebook, Twitter, Instagram, CreditCard, Shield, Truck } from "lucide-react"; // Import icons from lucide-react

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white p-6 flex flex-col space-y-4">
        <div className="flex justify-between mb-4">
          <div className="flex space-x-4 mb-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="flex justify-around border-t border-gray-600 pt-4">
          <div className="flex flex-col items-center">
            <h4 className="font-bold">Customer Service</h4>
            <a href="/shipping" className="text-gray-300 hover:text-white">Shipping Info</a>
            <a href="/returns" className="text-gray-300 hover:text-white">Returns</a>
            <a href="/faq" className="text-gray-300 hover:text-white">FAQ</a>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="font-bold">Company</h4>
            <a href="/about" className="text-gray-300 hover:text-white">About Us</a>
            <a href="/careers" className="text-gray-300 hover:text-white">Careers</a>
            <a href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</a>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="font-bold">Payment Methods</h4>
            <div className="flex space-x-2">
              <CreditCard className="h-5 w-5" />
              <Shield className="h-5 w-5" />
              <Truck className="h-5 w-5" />
            </div>
            <p className="text-sm text-gray-400">Secure payments</p>
          </div>
        </div>
        <p className="text-sm text-gray-400 text-center">© 2023 Your Company Name. All rights reserved.</p>
      </footer>
    </>
  );
};














