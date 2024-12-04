import { teamMenu } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";

interface TeamDropdownProps {
  handleNavigate: () => void;
  setActiveTeamMenuItem: (index: number) => void;
}

export const TeamDropdown = ({ handleNavigate, setActiveTeamMenuItem }: TeamDropdownProps) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="absolute top-full right-1/2 mt-4 w-[600px] bg-white rounded-lg shadow-lg overflow-hidden z-50"
    style={{ marginRight: '-300px' }}
  >
    <div className="grid grid-cols-12 gap-0">
      <div className="col-span-12 p-6">
        <div className="grid grid-cols-2 gap-4">
          {teamMenu.map((menuItem, index) => {
            const Icon = menuItem.icon;
            return (
              <Link
                key={menuItem.name}
                href={menuItem.url}
                onClick={handleNavigate}
                className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors group relative"
                onMouseEnter={() => setActiveTeamMenuItem(index)}
              >
                <div className="flex gap-3">
                  {Icon && <Icon className="h-5 w-5 text-primary mt-1" />}
                  <div>
                    <h3 className="font-bold text-primary group-hover:text-accent transition-colors">
                      {menuItem.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {menuItem.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  </motion.div>
);