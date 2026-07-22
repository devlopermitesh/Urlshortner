const Header=()=>{
return (
    <header className="flex w-full h-32  ">
        <nav className=" flex flex-row justify-center h-auto w-full bg-white py-4 ">
            <div className="relative   mx-auto  p-2 ">
                <h1 className="text-brand-primary text-3xl md:text-5xl font-bold"
                > <span>Url</span>
                    Shortner</h1>
                    <sub className="absolute bottom-10 md:bottom-2 right-0 font-semibold text-md md:text-lg tracking-wide text-brand-secondary">
                        <span className="text-black">by {" "}</span>
                        Mitesh

                    </sub>
            </div>
            </nav>
    </header>
)
}
export default Header