import React from 'react';
import {
  useFormContext,
  RegisterOptions,
  FieldPath,
  FieldValues
} from 'react-hook-form';
import { _ } from '../../../lib/locale/translate/_.js';
import { Tooltip } from './Tooltip.js';
import { getNestedError } from './utils/getNestedError.js';

interface DateTimeLocalFieldProps<T extends FieldValues = FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'type'> {
  name: FieldPath<T>;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  validation?: RegisterOptions<T>;
  wrapperClassName?: string;
}

export function DateTimeLocalField<T extends FieldValues = FieldValues>({
  name,
  label,
  error,
  wrapperClassName = 'form-field',
  helperText,
  required,
  validation,
  className,
  min,
  max,
  step,
  ...props
}: DateTimeLocalFieldProps<T>) {
  const {
    register,
    unregister,
    formState: { errors }
  } = useFormContext<T>();

  const fieldError = getNestedError(name, errors, error);
  const fieldId = `field-${name}`;

  React.useEffect(() => {
    return () => {
      unregister(name);
    };
  }, [name, unregister]);

  const { valueAsNumber, valueAsDate, ...cleanValidation } = validation || {};
  const validationRules = {
    ...cleanValidation,
    ...(required && {
      required: _('${field} is required', { field: label || name })
    }),
    validate: {
      ...validation?.validate,
      minDateTime: (value) => {
        if (!min || !value) return true;
        return (
          value >= min ||
          _('Date and time must be after ${min}', { min: min.toString() })
        );
      },
      maxDateTime: (value) => {
        if (!max || !value) return true;
        return (
          value <= max ||
          _('Date and time must be before ${max}', { max: max.toString() })
        );
      }
    }
  };

  return (
    <div className={`${wrapperClassName} ${fieldError ? 'error' : ''}`}>
      {label && (
        <label htmlFor={fieldId}>
          {label}
          {required && <span className="required-indicator">*</span>}
          {helperText && <Tooltip content={helperText} position="top" />}
        </label>
      )}

      <input
        id={fieldId}
        type="datetime-local"
        min={min}
        max={max}
        step={step}
        {...register(name, validationRules)}
        className={className}
        aria-invalid={fieldError !== undefined ? 'true' : 'false'}
        aria-describedby={
          fieldError !== undefined ? `${fieldId}-error` : undefined
        }
        {...props}
      />

      {fieldError && (
        <p id={`${fieldId}-error`} className="field-error">
          {fieldError}
        </p>
      )}
    </div>
  );
}
