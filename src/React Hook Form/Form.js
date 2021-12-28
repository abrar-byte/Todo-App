import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

export default function Form() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState([]);
  // const [image, setImage] = useState(localStorage["fileBase64"]);

  const onSubmit = (values) => {
    const dataBaru = JSON.parse(JSON.stringify(data));
    dataBaru.push(values);
    setData(dataBaru);
    // data.push(values);
    console.log(values);
    alert("Input Tim Berhasil 🔪️ ");
    reset();
  };

  const imageUpload = (e, onChange) => {
    const file = e.target.files[0];
    console.log(file, "file");
    getBase64(file).then((base64) => {
      onChange(base64);
      // setValue("logo", base64);
    });
    // .then((base64) => {
    //   localStorage["fileBase64"] = localStorage["fileBase64"]
    //     ? JSON.stringify([
    //         ...JSON.parse(localStorage["fileBase64"]),
    //         { raw: base64, title: file.name },
    //       ])
    //     : JSON.stringify([{ raw: base64, title: file.name }]);
    // })
    // .then(() => onChange(file.name))
    // .then(() => setImage(localStorage["fileBase64"]))
    // .then(() => console.log("amah"));
  };
  console.log("data", data);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  console.log(getValues())

  return (
    <div className="container mx-auto px-6 max-w-7xl ">
      <h1 className="mt-10 font-extrabold text-4xl uppercase text-center mb-5 text-red-600 ">
        Input Data Tim Sepakbola
      </h1>
      <div className="max-w-4xl m-auto  bg-gray-200 rounded-md ">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl m-auto ">
          <label>Nama Tim </label>

          <input
            type="text"
            {...register("tim", { required: true })}
            className="border border-black box-border  py-1 px-3.5 w-full rounded mb-2.5 "
          />
          {/* required true, artinya dibutuhkan bener2 harus diisi */}
          {/* validasi berbentuk object seperti required dan lain lain ya adick adick */}

          {errors.tim && (
            <p className="text-left text-xs text-red-700 ">
              Harus kamu isi ya adick-adick
            </p>
          )}

          <label>Logo Tim</label>
          <Controller
            name="logo"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <input
                type="file"
                onChange={(e) => imageUpload(e, onChange)}
                className="border  box-border border-black py-1 px-3.5 w-full rounded mb-2.5 "
              />
            )}
          />

          {/* <input
            type="file"
            id="logo"
            name="logo"
            onChange={imageUpload}
            className="border  box-border border-black py-1 px-3.5 w-full rounded mb-2.5 "
          /> */}

          <label>Tahun Berdiri</label>

          <input
            type="number"
            {...register("tahun")}
            className="border  box-border border-black py-1 px-3.5 w-full rounded mb-2.5 "
          />

          {errors.tahun && (
            <p className="text-left text-xs text-red-700">
              Minimal tahun 1999 dan maximal tahun 2025
            </p>
          )}

          <label>Alamat Markas Tim</label>

          <input
            type="text"
            {...register("alamat")}
            className="border  box-border border-black py-1 px-3.5 w-full rounded mb-2.5 "
          />

          <label>Kota Markas Tim</label>

          <input
            type="text"
            {...register("kota")}
            className="border box-border border-black py-1 px-3.5 w-full rounded mb-2.5 "
          />

          {errors.kota && (
            <p className="text-left text-xs text-red-700">
              Satu kata aja ya adick-adick
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-green bg-green-500 py-2 my-2.5"
          >
            Submit
          </button>
        </form>
      </div>

      <table className="max-w-3xl mx-auto my-5">
        <tr className="border border-black ">
          <th className="text-left p-4 border border-black">No. </th>
          <th className="text-left p-4 border border-black">Tim</th>
          <th className="text-left p-4 border border-black">Logo</th>
          <th className="text-left p-4 border border-black">Tahun Berdiri</th>
          <th className="text-left p-4 border border-black">
            Alamat Markas Tim
          </th>
          <th className="text-left p-4 border border-black">Kota Markas Tim</th>
        </tr>
        {data?.map((item, i) => (
          <tr className="border border-black "key={i}>
            <td className="text-center p-4 border border-black">{i + 1}</td>

            <td className="text-center p-4 border border-black">{item.tim}</td>
            <td className="text-center p-4 border border-black">
              <img src={item.logo} width="50" height="100" alt="embleh" />
            </td>
            <td className="text-center p-4 border border-black">
              {item.tahun}
            </td>
            <td className="text-center p-4 border border-black">
              {item.alamat}
            </td>
            <td className="text-center p-4 border border-black">{item.kota}</td>
          </tr>
        ))}
      </table>
      {/* object tidak bisa ditampilkan langsung maka harus distringkan dulu */}
    </div>
  );
}
