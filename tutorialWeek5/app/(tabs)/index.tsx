import StudentCard from "@/components/StudentCard";
import {Button, View, Text } from "react-native";
import {useState} from 'react';

type Student ={
  id:number;
  name: string;
  major: string;
  year: string;
  count: number;
};

export default function IndexScreen() {
  const [students, setStudents] = useState<Student[]>([
    {id: 1, name: 'Emilia', major: 'Computer Science', year:'3', count: 0},
    {id: 2, name: 'Jackie', major: 'Business', year:'2', count: 0},
    {id: 3, name: 'Sammy', major: 'Engineering', year:'4', count: 0}

  ]);

  const updateCount = (id: number, delta: number) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id
        ? {...student, count: student.count + delta}
        :student
      )
    );
  };
// derived total (the total not stored in state)
  const total = students.reduce((sum, s) => sum + s.count, 0);

// Reset all
const resetAll = () => {
  setStudents(prev =>
    prev.map(student =>({...student, count:0}))
  );
};

// Adding/removing student
const removeStudent = (id:number)=> {
  setStudents(prev => prev.filter(student => student.id !==id));
};


  return (
    <View style={{ padding:20}}>
      <Text style= {{fontSize:22, marginBottom: 10}}>
        Total Score: {total}
      </Text>
      {total > 5 && <Text style={{ color:'green'}}>Class doing great!</Text>}
      {total < 0 && <Text style={{ color: 'red'}}>Class Struggling</Text>}
      <Button title='Reset All' onPress={resetAll}/>
      {students.length ===0 ?(
        <Text style={{marginTop: 20}}>No Students added yet.</Text>
      ) : (
      students.map(student =>(
        <StudentCard
        key={student.id}
       {...student}
       onUpdate={updateCount}
       onRemove={removeStudent}
        />
      ))
      )}
    </View>
  );
}



