import { useField } from "formik";


const CustomInput = ({label, ...props}) => {
    const [field,meta] = useField(props);

    return (
        <>
        <label>{label}</label>
        <input {...field} {...props} />
        
        </>
    )
}

export default CustomInput
