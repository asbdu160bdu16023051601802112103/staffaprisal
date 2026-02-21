const Header = () => {
  return (
    <header className="header-gradient text-primary-foreground py-6 px-4">
      <div className="max-w-5xl mx-auto flex items-center gap-4">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold shrink-0">
          BSC
        </div>
        <div className="flex-1">
          <h1 className="text-xl md:text-2xl font-bold tracking-wide">
            BON SECOURS COLLEGE FOR WOMEN (AUTONOMOUS)
          </h1>
          <p className="text-primary-foreground/80 italic text-sm mt-1">
            Empowering Women through Quality Education
          </p>
        </div>
        <div className="hidden md:block bg-white/10 border border-white/20 rounded-md px-4 py-2">
          <p className="font-semibold text-sm">Staff Appraisal</p>
          <p className="text-xs text-primary-foreground/80">System</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
