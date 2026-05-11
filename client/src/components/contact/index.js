import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import Loader from "../../utils/loader";
import { Button, TextField } from "@material-ui/core";
import { contactUs } from "../../store/actions/users_actions";

const Contact = () => {
    const [loading, setLoading] = useState(null);
    const notifications = useSelector(state => state.notifications);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {email: '', firstname: '', lastname: '', message: ''},
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Sorry this field is required')
                .email('This is not a valid email'),
            firstname: Yup.string()
                .required('Sorry this field is required'),
            lastname: Yup.string()
                .required('Sorry this field is required'),
            message: Yup.string()
                .required('Sorry you need to say something')
                .max(500, 'Sorry, the message is too long')
        }),
        onSubmit: (values) => {
            setLoading(true);
            dispatch(contactUs(values));
        }
    });
    useEffect(() => {
        if(notifications && notifications.success) {
            formik.resetForm();
            setLoading(false);
        }
    },[notifications, formik]);
    const errorHelper = (formik, values) => ({
        error: formik.errors[values] && formik.touched[values] ? true : false,
        helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
    });
    return (
        <>
            { loading
                ? <Loader/>
                : <>
                    <h1>Contact Us</h1>
                    <form className="mt-3" onSubmit={formik.handleSubmit}>
                        <div className="form-group mb-3">
                            <TextField
                                style={{width: '100%'}}
                                name="email"
                                label="Enter your email"
                                variant="outlined"
                                { ...formik.getFieldProps('email') }
                                { ...errorHelper(formik, 'email') }
                            />
                        </div>
                        <div className="form-group mb-3">
                            <TextField
                                style={{width: '100%'}}
                                name="firstname"
                                label="Enter your first name"
                                variant="outlined"
                                { ...formik.getFieldProps('firstname') }
                                { ...errorHelper(formik, 'firstname') }
                            />
                        </div>
                        <div className="form-group mb-3">
                            <TextField
                                style={{width: '100%'}}
                                name="lastname"
                                label="Enter your last name"
                                variant="outlined"
                                { ...formik.getFieldProps('lastname') }
                                { ...errorHelper(formik, 'lastname') }
                            />
                        </div>
                        <div className="form-group mb-3">
                            <TextField
                                style={{width: '100%'}}
                                name="message"
                                label="Add your message here"
                                variant="outlined"
                                multiline
                                rows={4}
                                { ...formik.getFieldProps('message') }
                                { ...errorHelper(formik, 'message') }
                            />
                        </div>
                        <Button variant="contained" color="primary" type="submit">
                            Send us a message
                        </Button>
                    </form>
                </>
            }    
        </>
    )
}
export default Contact;