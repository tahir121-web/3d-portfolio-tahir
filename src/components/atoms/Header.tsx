import React from "react";
import { motion } from "framer-motion";

import { styles } from "../../constants/styles";
import { textVariant } from "../../utils/motion";
import { VerificationBadge } from "./VerificationBadge";

interface IHeader {
  useMotion: boolean;
  p: string;
  h2: string;
  showVerificationBadge?: boolean;
}

export const Header: React.FC<IHeader> = ({ 
  useMotion, 
  p, 
  h2,
  showVerificationBadge = false 
}: IHeader) => {
  const Content = () => (
    <>
      <p className={styles.sectionSubText}>{p}</p>
      <h2 className={styles.sectionHeadText}>
        {h2}
        {showVerificationBadge && <VerificationBadge />}
      </h2>
    </>
  );

  return useMotion === true ? (
    <motion.div variants={textVariant()}>
      <Content />
    </motion.div>
  ) : (
    <Content />
  );
};