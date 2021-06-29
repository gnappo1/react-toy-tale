import React, { Component } from "react";

class ToyForm extends Component {
    state = {
        name: "",
        image: "",
        human: "Select Something"
    }
    handleChange = (e) => {
        const elName = e.target.name
        const elValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({[elName]: elValue})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {...this.state, likes: 0}
        //reset the form to be blank
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accepts: "application/json"
            },
            body: JSON.stringify(formData)
        }
        fetch("http://localhost:3000/toys", configObj)
        .then(res => res.json())
        .then(json => this.props.handleCreate(json))
    }
    render() {
        return (
           <div>
               <form onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input id="name" name="name" className="name" onChange={this.handleChange} value={this.state.name} />
                    <label>Image Url</label>
                    <input id="image" name="image" className="image" onChange={this.handleChange} value={this.state.image} />
                    <label></label>
                    <select id="human" name="human" className="human" onChange={this.handleChange} placeholder="Select Something" value={this.state.human}>
                        <option>Select Something</option>
                        <option>True</option>
                        <option>False</option>
                    </select>
                    <input type="submit" value="Create" />
               </form>
           </div> 
        )
    }
}
export default ToyForm;

// import React from 'react';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';

// const validationSchema = yup.object({
//   email: yup
//     .string('Enter your name')
//     .email('Enter a valid name')
//     .required('Name is required'),
//   password: yup
//     .string('Enter your image')
//     .min(8, 'Image should be of minimum 8 characters length')
//     .required('Image is required'),
// });

// const WithMaterialUI = () => {
//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       image: '',
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       alert(JSON.stringify(values, null, 2));
//     },
//   });

//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit}>
//         <TextField
//           id="name"
//           name="name"
//           label="Name"
//           value={formik.values.name}
//           onChange={formik.handleChange}
//           error={formik.touched.name && Boolean(formik.errors.name)}
//           helperText={formik.touched.name && formik.errors.name}
//         />
//         <TextField
//           id="image"
//           name="image"
//           label="Image"
//           type="image"
//           value={formik.values.image}
//           onChange={formik.handleChange}
//           error={formik.touched.image && Boolean(formik.errors.image)}
//           helperText={formik.touched.image && formik.errors.image}
//         />
//         <Button color="primary" variant="contained" type="submit">
//           Submit
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default WithMaterialUI;