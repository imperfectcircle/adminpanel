import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';
import { ContextProvider } from './Contexts/ContextProvider.jsx';
import { AnimatePresence, motion } from 'framer-motion';

const fadeInAnimation = {
    hidden: {
        x: '-100vw',
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
    },
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ContextProvider>
            <AnimatePresence mode="wait">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={fadeInAnimation}
                    transition={{ duration: 0.5 }}
                >
                    <RouterProvider router={router} />
                </motion.div>
            </AnimatePresence>
        </ContextProvider>
    </React.StrictMode>,
);
