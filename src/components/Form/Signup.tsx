import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type Inputs = {
  firstName: string;
  alphabetInput: string;
  amount: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("firstName")); // watch input value by passing the name of it
  console.log(watch("amount"));

  const [image, setImage] = useState<string | null>(null);
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 ">
        <div className="flex flex-col gap-2 ">
          {/* register your input into the hook by invoking the "register" function */}
          <input className="p-4 border-2 border-blue-600" {...register("firstName")} />
        </div>
        {/* include validation with required or other standard HTML validation rules */}
        <div className="flex flex-col gap-2">
          <input
            className="p-4 border-2 border-blue-600"
            {...register("alphabetInput", {
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Only alphabets are allowed",
              },
              required: true,
            })}
            disabled={errors.alphabetInput?.type === "pattern"}
          />
          {/* errors will return when field validation fails  */}
          {errors.alphabetInput && (
            <span className="text-red-500">{errors.alphabetInput.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="number"
            {...register("amount", {
              validate: (value: string) => {
                const parsedValue = Number(value); // Convert to number
                return parsedValue % 2 === 0 || "The number of servings must be even";
              },
            })}
            id="amount"
          />

          {/* errors will return when field validation fails  */}
          {errors.amount && <span className="text-red-500">This field is required</span>}
        </div>

        <p>{image}</p>
        <img src={`${image}`} alt="" />
        <input
          type="file"
          onChange={(e) => {
            const files = e.target.files;

            if (files && files.length > 0) {
              const file = files[0];
              setImage(String(URL.createObjectURL(file)));
              console.log(file);
            }
          }}
        />
        <input type="submit" />
      </div>
    </form>
  );
};

export default Signup;
