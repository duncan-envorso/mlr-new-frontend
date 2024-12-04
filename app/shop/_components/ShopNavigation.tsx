import { Menu } from "@/lib/shopify/types";
import Link from "next/link";

interface NavigationProps {
    menu: Menu[]
  }
  
  export function Navigation({ menu }: NavigationProps) {
    return (
      <nav>
        <ul>
          {menu.map((item) => (
            <li key={item.path}>
              <Link href={item.path}>{item.title}</Link>
              {item.items && item.items.length > 0 && (
                <ul>
                  {item.items.map((subItem) => (
                    <li key={subItem.path}>
                      <Link href={subItem.path}>{subItem.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    );
  }