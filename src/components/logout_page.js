import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function LogoutPage() {
    return (
        <Form>
            <h1>Logout page</h1>
            <Button variant="primary" type="submit">
                Logout
            </Button>
        </Form>
    );
}
