import { TravelLogKey } from '@/models/TravelLog.model';
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  travelLogInputs: Record<
    TravelLogKey,
    {
      type?: "text" | "textarea" | "number" | "date" | "url";
      label: string;
      value?: string | number;
    }
  >;
  register: (rules?: RegisterOptions) => UseFormRegisterReturn;
  handleInputChange: (key: string, value: string) => void;
  errors: Record<string, { message: string } | undefined>;
};

function LatitudeLongitudeComponent({ travelLogInputs, register, handleInputChange, errors }) {
  return (
    <>
      {Object.entries(travelLogInputs).map(([name, value]) => {
        const key = name as TravelLogKey;

        // Render latitude and longitude inputs
        if (name === "latitude" || name === "longitude") {
          return (
            <div key={name} className="flex flex-col gap-2">
              <Label htmlFor={name}>{value.label}</Label>
              {value.type === "textarea" ? (
                <Textarea
                  {...register(key, {
                    onChange: (e) => handleInputChange(key, e.target.value),
                  })}
                  className={` ${errors[key] ? "border-red-700" : ""} `}
                />
              ) : (
                <Input
                  id={name}
                  type={value.type}
                  className={`${errors[key] ? "border-red-700" : ""}`}
                  {...register(key, {
                    onChange: (e) => handleInputChange(key, e.target.value),
                  })}
                />
              )}
              {errors[key] && (
                <span className="text-red-700">{errors[key]?.message}</span>
              )}
            </div>
          );
        }

        return null; // Skip rendering for other fields
      })}
    </>
  );
};

export default LatitudeLongitudeComponent;

