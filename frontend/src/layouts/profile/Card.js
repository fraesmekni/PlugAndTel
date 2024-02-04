import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

function KitchenSinkExample() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks/")
      .then((res) => setData(res.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div>
      {data &&
        data.map((task) => (
          <Card key={task._id} style={{ width: "18rem", marginBottom: "20px" }}>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
              <Card.Title>{task.title}</Card.Title>
              <Card.Text>{task.description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Status: {task.status}</ListGroup.Item>
              <ListGroup.Item>Deadline: {task.deadline}</ListGroup.Item>
              {/* Add more ListGroup items as needed */}
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">Edit Task</Card.Link>
              <Card.Link href="#">Delete Task</Card.Link>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
}

export default KitchenSinkExample;
