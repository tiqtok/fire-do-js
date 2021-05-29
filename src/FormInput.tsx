import * as React from 'react';

// import './form-input.styles.scss';

interface FormInputProps {
    type: string;
    min?: string;
    max?: string;
    name: string;
    value: string;
    onChange: any;
    label: string;
    required: boolean;
    
}

const FormInput = (props: FormInputProps): JSX.Element => {
    const {onChange, label, ...otherProps} = props;

    return (    
        <div className='group'>
            <input className='form-input' onChange={onChange} {...otherProps}/>
            { label ? (
                <label 
                    className={`${
                        otherProps.value?.length ? 'shrink' : ''
                    } form-input-label`} 
                >
                    {label}
                </label>
            ) : null}
            
        </div>
    )
}

export default FormInput;