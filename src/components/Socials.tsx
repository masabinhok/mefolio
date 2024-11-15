import { FC } from "react";
import { Link } from "react-router-dom";
import * as Icons from '@mui/icons-material';


type Social = {
  name: string;
  href: string;
  icon: keyof typeof Icons;
};


export const socials: Social[] = [
  { name: 'GitHub', href: 'https://github.com/masabinhok', icon: 'GitHub' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/sabinshresthaa', icon: 'LinkedIn' },
  { name: 'X', href: 'https://x.com/masabinhok', icon: 'X' },

];

const Socials: FC = () => {
  return (
    <nav className="flex gap-2">
      {socials.map((social) => {
        const IconComponent = Icons[social.icon];
        return (
          <Link key={social.name} to={social.href}>
            {IconComponent ? <IconComponent className="hover:text-primary  tranimate" /> : null}
          </Link>
        );
      })}
    </nav>
  );
};

export default Socials;
