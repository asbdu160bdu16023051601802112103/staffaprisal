import collegeLogo from "@/assets/college-logo.png";

const Header = () => {
  return (
    <header className="header-gradient text-primary-foreground py-6 px-4">
      <div className="max-w-5xl mx-auto flex items-center gap-4">
        <img
          src={collegeLogo}
          alt="Bon Secours College Logo"
          className="w-16 h-16 rounded-full shrink-0 bg-white p-1"
        />
        <div className="flex-1">
          <h1 className="text-xl md:text-2xl font-bold tracking-wide">
            BON SECOURS COLLEGE FOR WOMEN (AUTONOMOUS)
          </h1>
          <p className="text-primary-foreground/80 italic text-sm mt-1">
            Empowering Women through Quality Education
          </p>
        </div>
        <div className="hidden md:block bg-white/10 border border-white/20 rounded-md px-4 py-2">
          <p className="font-semibold text-sm">Bon Grade Me</p>
          <p className="text-xs text-primary-foreground/80">Staff Performance Based Appraisal System</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
