-- Create 5 teachers
INSERT INTO users (name, lastname, role)
VALUES
    ('Alice', 'Anderson', 'teacher'),
    ('Bob', 'Baker', 'teacher'),
    ('Charlie', 'Clark', 'teacher'),
    ('David', 'Davis', 'teacher'),
    ('Eva', 'Evans', 'teacher');

-- Create 20 students
INSERT INTO users (name, lastname, role)
VALUES
    ('Anna', 'Adams', 'student'),
    ('Ben', 'Brown', 'student'),
    ('Catherine', 'Cooper', 'student'),
    ('Daniel', 'Dixon', 'student'),
    ('Emily', 'Elliot', 'student'),
    ('Frank', 'Fisher', 'student'),
    ('Grace', 'Gray', 'student'),
    ('Henry', 'Harrison', 'student'),
    ('Isabel', 'Irwin', 'student'),
    ('Jack', 'Jones', 'student'),
    ('Katherine', 'Keller', 'student'),
    ('Liam', 'Lewis', 'student'),
    ('Mia', 'Miller', 'student'),
    ('Nathan', 'Nelson', 'student'),
    ('Olivia', 'Owens', 'student'),
    ('Patrick', 'Parker', 'student'),
    ('Quinn', 'Quinlan', 'student'),
    ('Rachel', 'Reed', 'student'),
    ('Samuel', 'Smith', 'student'),
    ('Taylor', 'Turner', 'student');

select * from school.students;
select * from school.teachers;