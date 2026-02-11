import {Text, View, Button} from 'react-native';
import {useState} from 'react';


type StudentCardProps = {
    name:string;
    major:string;
    year:string;
};

export default function StudentCard({name, major, year}: StudentCardProps) {
    const [count, setCount] = useState(0);
    return(
        <View style={{marginBottom: 12, padding:12, borderWidth: 1}}>
            <Text style={{fontSize:18}}>{name}</Text>
            <Text>Major: {major}</Text>
            <Text>Year: {year}</Text>

            <Text style={{marginTop:10}}>Count: {count}</Text>
            <Button title='+1' onPress={() => setCount(count + 1)} />
            <Button title='-1' onPress={() => setCount(count - 1)} />
            
            <Text
            style = {{
                color :
                count> 0 ? 'green':
                count< 0 ? 'red':
                'gray'
            }}
            >
            {count>0 && 'Positive'}
            {count<0 && 'Negative'}
            {count === 0 && 'Zero'}
            </Text>


        </View>
    );
}
