import React from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
  link: {
    cursor: 'pointer',
  },
}));

const Control = () => {
  const classes = useStyles();
  const { handleSubmit, control } = useForm();

  const onSubmit = data => {
    console.log(data);
  };
  // const imageUpload = (e, change) => {
  //   const file = e.target.files[0];
  //   console.log(file, "file");
  //   change('gambar.jpg')
  //   getBase64(file)
  //     .then((base64) => {
  //       localStorage["fileBase64"] = base64;
  //       console.debug("file stored", base64);
  //     })
  //     .then(() => setImage(localStorage["fileBase64"]));
  // };

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* <Controller
        name="logo"
        control={control}
        defaultValue=""
        render={({ field, fieldState: { error } }) => (
          <input
          type="file"
          onChange={(e)=>imageUpload(e, field.onChange)}
          className="border  box-border border-black py-1 px-3.5 w-full rounded mb-2.5 "
        />

          
        )}
        
      /> */}
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Password"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="password"
          />
        )}
        rules={{
          required: 'Password required',
          minLength: {
            value: 8,
            message: 'Password should be as least 8 characters',
          },
          pattern: {
            value: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
            message:
              'Password should contain at least 1 alphabet and 1 numeric value',
          },
          validate: {
            equals: password =>
              password !== 'password123' || 'Choose a more secure password',
          },
        }}
      />
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => console.log('closed')}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Sign up
        </Button>
      </div>
    </form>
  );
};

export default Control;