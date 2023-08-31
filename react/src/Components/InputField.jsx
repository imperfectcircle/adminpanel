export default function InputField({
    content,
    value,
    onChange,
    type,
    field,
    autoComplete,
}) {
    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={field}>{content}</label>

            <input
                value={value}
                onChange={onChange}
                className="rounded-md shadow-lg focus:bg-emerald-100"
                type={type}
                name={field}
                id={field}
                autoComplete={autoComplete}
                placeholder={content}
            />
        </div>
    );
}
