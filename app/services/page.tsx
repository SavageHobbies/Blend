"use client";

import { motion } from 'framer-motion';
import ServicesSection from 'components/home/services/services-section';
import ServicesListSection from 'components/services/services-list-section';

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ServicesSection />
        <ServicesListSection />
      </motion.div>
    </div>
  );
}
