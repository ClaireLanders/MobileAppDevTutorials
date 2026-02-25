import StudentCard from "@/components/StudentCard";
import {
  ScrollView,
  TextInput,
  Button,
  View,
  Text
 } from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
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
  // tutorial week 7 add ons
  // this creates form state
  const [name, setName] = useState('');
  const[major, setMajor] = useState('');
  const [ year,setYear] = useState('');
  const [editingId, setEditingId]= useState<number | null>(null);
 
  // week 7 add ons again 
  // Create function (changed from add to save student)
  const saveStudent =() =>{
    if (!name.trim()) return;

    if (editingId) {
      setStudents(prev =>
        prev.map(student=>
          student.id === editingId
          ?{...student, name, major, year}
          :student
        )
      );
      setEditingId(null);
    }else {
      const newStudent = {
      id: Date.now(),
      name,
      major,
      year,
      count:0,
    };
    setStudents(prev => [...prev, newStudent]);
    }

    setName('');
    setMajor('');
    setYear('');
  };

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
    <SafeAreaView style = {{ flex:1 }} edges={['top']}>
      <ScrollView contentContainerStyle={{padding: 20}} keyboardShouldPersistTaps="handled">
        <Text style= {{fontSize:22, marginBottom: 10}}>
          Total Score: {total}
        </Text>
        {total > 5 && <Text style={{ color:'green'}}>Class doing great!</Text>}
        {total < 0 && <Text style={{ color: 'red'}}>Class Struggling</Text>}
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={{borderWidth: 1, marginVertical: 5, padding: 5}}
        />
        <TextInput
          placeholder="Major"
          value={major}
          onChangeText={setMajor}
          style={{ borderWidth: 1, marginVertical: 5, padding: 5 }}
        />
        <TextInput
          placeholder="Year"
          value={year}
          onChangeText={setYear}
          style={{ borderWidth: 1, marginVertical: 5, padding: 5 }}
        />
        <Button title={editingId ? "Save Changes": "Add Student"}
         onPress={saveStudent}
         disabled={!name.trim()}
         />
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
            onEdit={(id) => {
              const student = students.find(s => s.id === id);
              if (!student) return;

              setEditingId(id);
              setName(student.name);
              setMajor(student.major);
              setYear(student.year);
            }}
          />
        ))
        )}
        </ScrollView>
    </SafeAreaView>
  );
}



