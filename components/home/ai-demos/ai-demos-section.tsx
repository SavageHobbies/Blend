"use client";

import { motion } from 'framer-motion';
import { Card } from 'components/ui/card';

export default function AIDemosSection() {
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Interactive AI Demos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Experience our AI solutions firsthand with interactive demos
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 h-full hover:shadow-lg transition-shadow bg-white/5 backdrop-blur-lg border-white/10">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <span className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Demo 1</h3>
                <p className="text-slate-600 dark:text-slate-300 flex-grow">
                  Interactive demo description
                </p>
              </div>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 h-full hover:shadow-lg transition-shadow bg-white/5 backdrop-blur-lg border-white/10">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <span className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Demo 2</h3>
                <p className="text-slate-600 dark:text-slate-300 flex-grow">
                  Interactive demo description
                </p>
              </div>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 h-full hover:shadow-lg transition-shadow bg-white/5 backdrop-blur-lg border-white/10">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <span className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Demo 3</h3>
                <p className="text-slate-600 dark:text-slate-300 flex-grow">
                  Interactive demo description
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
