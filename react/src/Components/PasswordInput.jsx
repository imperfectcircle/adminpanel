import { usePasswordVisibility } from '../Hooks/usePasswordVisibility';
import EyeIcon from './EyeIcon';

export default function PasswordInput(props) {
    const [passwordIsVisible, togglePasswordVisibility] =
        usePasswordVisibility();

    return (
        <div className="relative flex">
            <input
                onChange={props.handleChange ? props.handleChange : () => {}}
                className="w-full rounded-md shadow-lg focus:bg-emerald-100"
                type={passwordIsVisible ? 'text' : 'password'}
                autoComplete={props.autoComplete}
                placeholder={props.placeholder}
            />
            <EyeIcon
                passwordIsVisible={passwordIsVisible}
                togglePasswordVisibility={togglePasswordVisibility}
            />
        </div>
    );
}
