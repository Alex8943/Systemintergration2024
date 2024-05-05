import {Router} from 'express';
const router = Router(); 

const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "Alice" }
];


/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: get all users.
 */

router.get("/api/users", (req, res) => {
    res.send({data: users});
});


/** 
openapi: 3.0.0
info:
  title: Users API
  version: 1.0.0
paths:
  /:
    post:
      description: Create a new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                id:
                  type: integer
                name:
                  type: string
              required:
                - name
      responses:
        '201':
          description: User created
        '400':
          description: Invalid input
*/

router.post("/api/users", (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.send({data: users});
});


export default router;