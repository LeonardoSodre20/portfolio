import { TECH_ICONS } from "@/constants/tech-icons";

interface TechChipsProps {
  items: string[];
}

export function TechChips({ items }: TechChipsProps) {
  return (
    <div className="chips" aria-label="Tecnologias usadas">
      {items.map((tech) => {
        const Icon = TECH_ICONS[tech];
        return (
          <span key={tech} className="chip">
            {Icon && <Icon size={13} aria-hidden="true" />}
            {tech}
          </span>
        );
      })}
    </div>
  );
}
