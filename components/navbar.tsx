"use client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import * as React from "react"
import { Button } from "./ui/button"
import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu"
import { signOut, useSession } from "next-auth/react";

// import ModeToggle from "../mode-toggle"
//import { handleSignOut } from "@/app/lib/action"
//import ModeToggle from "./mode-toggle"


export function NavBar() {
    const { data: session, status } = useSession();

    return (
        <div className="flex items-center min-w-full w-full fixed justify-center p-2 z-[50] mt-[2rem]">
            <div className="flex justify-between md:w-[720px] w-[95%] border dark:border-zinc-900 dark:bg-black bg-opacity-10 relative backdrop-filter backdrop-blur-lg bg-white border-white border-opacity-20 rounded-xl p-2 shadow-lg">
                { /*<Dialog>
                    <SheetTrigger className="min-[825px]:hidden p-2 transition">
                        <MenuIcon />
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle>PayToll</SheetTitle>
                            <SheetDescription>
                                Load and recharge your prepaid Toll account balance to avoid fee accumulation.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="flex flex-col space-y-3 mt-[1rem] z-[99]">
                            <DialogClose asChild>
                                <Link href="/">
                                    <Button variant="outline" className="w-full">Home</Button>
                                </Link>
                            </DialogClose>
                            <DialogClose asChild>
                                <Link href="/software">
                                    <Button variant="outline" className="w-full">Software</Button>
                                </Link>
                            </DialogClose>
                            <DialogClose asChild>
                                <Link href="/automation">
                                    <Button variant="outline" className="w-full">Automation</Button>
                                </Link>
                            </DialogClose>
                            <DialogClose asChild>
                                <Link href="/blog">
                                    <Button variant="outline" className="w-full">Blog</Button>
                                </Link>
                            </DialogClose>
                            <DialogClose asChild>
                                <Link href="/projects">
                                    <Button variant="outline" className="w-full">Projects</Button>
                                </Link>
                            </DialogClose>
                            {/*<ModeToggle />
                        </div>
                    </SheetContent>
                </Dialog> */}
                <NavigationMenu>
                    <NavigationMenuList className="max-[825px]:hidden ">
                        <Link href="/" className="pl-2">
                            <h1 className="font-bold">PayToll</h1>
                        </Link>
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="flex items-center gap-2 max-[825px]:hidden">
                    <Link href="vehicles">
                        <Button variant="ghost">Vehicles</Button>
                    </Link>
                    <Link href="account">
                        <Button variant="ghost">User account</Button>
                    </Link>
                    <Link href="faq">
                        <Button variant="ghost">FAQ</Button>
                    </Link>
                    {!session ? (
                        <Link href="signin">
                        <Button variant="ghost">Sign in</Button>
                        </Link>
                    ) : (
                        <Button onClick={() => signOut({ callbackUrl: '/', redirect: true })} variant="ghost">Sign out</Button>
                    )}
                    {/*<ModeToggle />
                    <div>
                    <form
                    action={handleSignOut}
                    >
                        <Button variant="ghost">Sign out</Button>
                    </form>
                    </div>*/}
                </div>
            </div>
        </div>

    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"