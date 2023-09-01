import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AiOutlineUnorderedList, AiOutlinePlus } from 'react-icons/ai';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { useMenuVisibility } from '../Hooks/useMenuVisibility';

export default function Dropdown(props) {
    const [menuIsVisible, toggleMenuVisibility] = useMenuVisibility();

    return (
        <div className="">
            <div className="flex items-center space-x-3 pl-10">
                <props.icon />
                <p className="cursor-pointer" onClick={toggleMenuVisibility}>
                    <span className="flex items-center">
                        {props.menuName}
                        {menuIsVisible && <RiArrowUpSLine className="ml-3" />}
                        {!menuIsVisible && (
                            <RiArrowDownSLine className="ml-3" />
                        )}
                    </span>
                </p>
            </div>
            <AnimatePresence>
                {menuIsVisible && (
                    <motion.div
                        className="dropdown-container flex w-full flex-col bg-gray-100 p-3 pl-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Link
                            className="flex items-center text-lg text-black transition-all duration-150 hover:text-red-500"
                            to={props.linkList}
                        >
                            <AiOutlineUnorderedList className="mr-3" />
                            {props.listName}
                        </Link>
                        <Link
                            className="flex items-center text-lg text-black transition-all duration-150 hover:text-red-500"
                            to={props.linkNew}
                        >
                            <AiOutlinePlus className="mr-3" />
                            {props.newName}
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
