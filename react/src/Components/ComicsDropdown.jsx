import { motion, AnimatePresence } from 'framer-motion';
import { useMenuVisibility } from '../Hooks/useMenuVisibility';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export default function ComicsDropdown(props) {
    const [menuIsVisible, toggleMenuVisibility] = useMenuVisibility();
    return (
        <div onClick={toggleMenuVisibility}>
            <div className="relative flex items-center space-x-3">
                <span className="cursor-pointer rounded-lg bg-sky-400 px-5 py-2">
                    <p className="flex items-center text-white">
                        {props.text}
                        {menuIsVisible && <RiArrowUpSLine className="ml-3" />}
                        {!menuIsVisible && (
                            <RiArrowDownSLine className="ml-3" />
                        )}
                    </p>
                </span>
            </div>
            <AnimatePresence>
                {menuIsVisible && (
                    <motion.div
                        className="dropdown-container absolute z-10 mt-1 flex w-fit flex-col items-center justify-center rounded-lg bg-slate-300 p-3 shadow-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {props.author.map((el) => (
                            <Link
                                key={el.id}
                                className="text-center text-lg text-black transition-all duration-150 hover:text-red-700"
                                to="#"
                            >
                                {el.title}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
