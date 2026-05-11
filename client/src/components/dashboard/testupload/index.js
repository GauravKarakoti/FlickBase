import { useFormik } from "formik";
import AdminLayout from "../../../hoc/adminLayout";
import * as Yup from 'yup';
import { Form } from "react-bootstrap";
import axios from "axios";

const TestUpload = () => {
    const formik = useFormik({
        initialValues: { archive: '' },
        validationSchema: Yup.object({
            archive: Yup.mixed().required('A file is required')
        }),
        onSubmit: (values) => {
            let formData = new FormData();
            formData.append('file', values.archive);
            // multer
            // axios.post(`${process.env.REACT_APP_SERVER_URL}/api/files/multerupload`, formData, {
            //     header: { 'content-type': 'multipart/form-data' }
            // }).then(response => {
            //     console.log(response);
            // }).catch(error => {
            //     console.log(error);
            // });
            // cloudinary
            axios.post(`${process.env.REACT_APP_SERVER_URL}/api/files/testupload`, formData, {
                header: { 'content-type': 'multipart/form-data' }
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
        }
    });
    const errorHelper = (formik, values) => ({
        error: formik.errors[values] && formik.touched[values] ? true : false,
        helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
    });
    return (
        <AdminLayout section="Test Upload">
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Form.File
                        id="file"
                        name="file"
                        label="Example file input"
                        onChange={(event) => {
                            formik.setFieldValue("archive", event.target.files[0]);
                        }}
                    />
                    {
                        formik.errors.archive && formik.error.archive.touched
                            ? <>Error</>
                            : null
                    }
                </Form.Group>
            </Form>
        </AdminLayout>
    )
}
export default TestUpload;