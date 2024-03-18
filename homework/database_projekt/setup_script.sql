-- Create the users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    lastname VARCHAR(255),
    role VARCHAR(50)
);

-- Create the teachers table
CREATE TABLE teachers (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    lastname VARCHAR(255),
    FOREIGN KEY (id) REFERENCES users(id)
);

-- Create the students table
CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    lastname VARCHAR(255),
    FOREIGN KEY (id) REFERENCES users(id)
);

-- Create a trigger to insert into teachers or students based on the role
DELIMITER //

CREATE TRIGGER user_role_trigger
AFTER INSERT ON users FOR EACH ROW
BEGIN
    IF NEW.role = 'teacher' THEN
        INSERT INTO teachers (id, name, lastname) VALUES (NEW.id, NEW.name, NEW.lastname);
    ELSEIF NEW.role = 'student' THEN
        INSERT INTO students (id, name, lastname) VALUES (NEW.id, NEW.name, NEW.lastname);
    END IF;
END;

//

DELIMITER ;
