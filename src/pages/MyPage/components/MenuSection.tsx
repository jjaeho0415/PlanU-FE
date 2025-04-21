import React from "react";
import styles from "./menuSection.module.scss";

interface MenuSectionProps {
  menuItems: {
    title: string;
    items: string[];
  }[];
  handleMenuClick: (item: string) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ menuItems, handleMenuClick }) => {
  return (
    <div className={styles.menuContainer}>
      {menuItems.map((menu, index) => (
        <div key={index} className={styles.section}>
          <h3 className={styles.sectionTitle}>{menu.title}</h3>
          <ul className={styles.sectionList}>
            {menu.items.map((item, idx) => (
              <li key={idx} className={styles.listItem} onClick={() => {handleMenuClick(item)}}>
                {item}
              </li>
            ))}
          </ul>
          {index < menuItems.length - 1 && <hr className={styles.divider} />}
        </div>
      ))}
    </div>
  );
};

export default MenuSection;
