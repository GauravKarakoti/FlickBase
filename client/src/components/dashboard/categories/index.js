import { Col, Row, Table } from "react-bootstrap";
import AdminLayout from "../../../hoc/adminLayout"
import AddCategories from "./addCategory";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../../../store/actions/article_actions";

const Categories = () => {
    const articles = useSelector(state => state.articles);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    },[dispatch]);
    return (
        <AdminLayout section="Categories">
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            { articles.categories ?
                                articles.categories.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.name}</td>
                                    </tr>
                                )) : null
                            }
                        </tbody>
                    </Table>
                </Col>
                <Col>
                    <AddCategories/>
                </Col>
            </Row>
        </AdminLayout>
    )
}
export default Categories;