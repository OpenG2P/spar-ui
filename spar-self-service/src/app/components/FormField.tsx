import { MenuItem, TextField, Select, FormControl, InputLabel } from "@mui/material";
import { ChangeEvent } from "react";

interface FormFieldProps {
    label: string;
    options: { code: string; name: string }[];
    value: string;
    onChange: (event: ChangeEvent<{ value: unknown }>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ label, options, value, onChange }) => (
    <div>
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <select
                value={value}
                onChange={onChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 bg-white"
            >
                <MenuItem value="" disabled>
                    Select {label}
                </MenuItem>
                {options.map((option, index) => (
                    <MenuItem key={index} value={option.code}>
                        {option.name}
                    </MenuItem>
                ))}
            </select>
        </FormControl>
    </div>
);

export default FormField;
