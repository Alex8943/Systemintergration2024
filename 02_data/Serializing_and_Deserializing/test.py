import pickle

# Sample class to represent an object
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

# Create an instance of the Person class
person_obj = Person(name="Alexnader", age=24)

# Serialize the object using pickle.dumps()
serialized_data = pickle.dumps(person_obj)


print("Serialized Data:", serialized_data)

# Deserialize the data
deserialized_obj = pickle.loads(serialized_data)


print("Deserialized Object:", deserialized_obj.name, deserialized_obj.age)

test = b'\x80\x04\x959\x00\x00\x00\x00\x00\x00\x00\x8c\x08__main__\x94\x8c\x06Person\x94\x93\x94)\x81\x94}\x94(\x8c\x04name\x94\x8c\x08John Doe\x94\x8c\x03age\x94K\x1eub.'

person = pickle.loads(test) 

print(person.name, person.age)
