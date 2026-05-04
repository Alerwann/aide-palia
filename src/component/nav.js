
import Link from 'next/link';

const navLinkBase =
  'p-5 md:rounded-[10%] transition-all duration-200 hover:bg-sky-100 ' ;

export default function Navigation() {
  return (
    <nav>
      <ul className="flex flex-row align-middle justify-around">
        <li className={navLinkBase}>
          <Link href='/perso'>Les personnages</Link>
        </li>
        <li className={navLinkBase}>Les objets</li>
        <li className={navLinkBase}>Les lieux</li>
        <li className={navLinkBase}>Astuces de débutants</li>
      </ul>
    </nav>
  );
}


  