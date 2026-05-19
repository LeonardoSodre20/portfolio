import { SKILL_CATEGORIES } from "@/constants/skills";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function SkillsSection() {
  return (
    <section id="skills" className="skills">
      <SectionLabel>HABILIDADES</SectionLabel>

      <div className="skills__grid">
        {SKILL_CATEGORIES.map((cat) => (
          <div
            key={cat.category}
            className="skill-category"
            style={{
              borderColor: `${cat.color}44`,
              "--accent": cat.color,
            } as React.CSSProperties}
          >
            <h3
              className="skill-category__title"
              style={{ color: cat.color, textShadow: `0 0 8px ${cat.color}` }}
            >
              {cat.category}
            </h3>
            <div className="skill-category__tags">
              {cat.items.map((tech) => (
                <span
                  key={tech}
                  className="skill-tag"
                  style={{
                    color: cat.color,
                    borderColor: `${cat.color}44`,
                    background: `${cat.color}0D`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
