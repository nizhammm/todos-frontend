import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import moment from "moment";

const TodoItem = ({ action, deleteItem, toggleStatus, isDone }) => {

  return (
    <Card className="my-2">
      <CardBody>
        <div className="d-flex justify-content-between">
          <div>
            {/* <CardTitle tag="h5" className="fw-bold">
              {moment(date).format("DD MMMM YYYY")}
            </CardTitle> */}
            <CardText>{action}</CardText>
          </div>
          <div className="d-flex align-items-center">
            {isDone ? (
              <Button
                className="mx-2"
                onClick={toggleStatus}
                color="success"
              >
                Done
              </Button>
            ) : (
              <Button
                className="mx-2"
                onClick={toggleStatus}
                color="warning"
              >
                On Going
              </Button>
            )}
            <Button onClick={deleteItem} className="mx-2" color="danger">
              Delete
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TodoItem;