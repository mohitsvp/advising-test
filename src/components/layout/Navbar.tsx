import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";


const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container h-20 flex items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Image src="/advisint-logo.png" alt="AdvisInt" width={100} height={100} />
                    </Link>
                </div>

                <div className="flex flex-1  items-center justify-end space-x-2">
                    <nav className="flex items-center gap-6 text-sm">
                        <Link href="/services" className="transition-colors duration-200 hover:text-foreground/80 text-foreground/60">Services</Link>
                        <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">About Us</Link>
                        <Link href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">Contact</Link>
                        <ThemeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar;