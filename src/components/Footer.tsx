import { Instagram, Youtube } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground py-10">
    <div className="container text-center">
      <p className="font-heading text-xl text-primary-foreground mb-4">Jess Cousin</p>
      <div className="flex justify-center gap-5 mb-4">
        <a href="mailto:my.lifeafterlaw@gmail.com" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors font-body text-sm">Email</a>
        <a href="https://www.instagram.com/mylifeafterlaw/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
          <Instagram className="w-5 h-5" />
        </a>
        <a href="https://www.youtube.com/@MyLifeAfterLaw" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
          <Youtube className="w-5 h-5" />
        </a>
        <a href="https://linktr.ee/MyLifeAfterLaw" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors font-body text-sm">Linktree</a>
      </div>
      <p className="font-body text-xs text-primary-foreground/40">© {new Date().getFullYear()} Jess Cousin. All rights reserved.</p>
      <p className="font-body text-xs text-primary-foreground/40 mt-1">Portfolio includes personal and non-commissioned content created independently.</p>
    </div>
  </footer>
);

export default Footer;
