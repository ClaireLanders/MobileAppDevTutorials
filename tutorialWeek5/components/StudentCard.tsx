import {Text, View, Button} from 'react-native';


type StudentCardProps = {
    id:number;
    name:string;
    major:string;
    year:string;
    count: number;
    onUpdate: (id:number, delta:number)=> void;
    onRemove: (id: number) => void;
    onEdit: (id:number) => void;
};

export default function StudentCard({
    id,
    name,
    major,
    year,
    count,
    onUpdate,
    onRemove,
    onEdit
}: StudentCardProps) {
    
    return(
        <View style={{marginBottom: 12, padding:12, borderWidth: 1}}>
            <Text style={{fontSize:18}}>{name}</Text>
            <Text>Major: {major}</Text>
            <Text>Year: {year}</Text>

            <Text style={{marginTop:10}}>Count: {count}</Text>
            
            <Button title='+1' onPress={() => onUpdate(id, 1 )} />
            <Button title='-1' onPress={() => onUpdate(id, - 1)} />
            
            <Text style = {{
                color:
                count > 0 ? 'green':
                count < 0 ? 'red':
                'gray'
            }}
            >
            {count > 0 && 'Positive'}
            {count < 0 && 'Negative'}
            {count === 0 && 'Zero'}
            </Text>
            <View style={{marginTop:5}}>
                <Button title='Edit' onPress={() => onEdit(id)}/>
            </View>
            <View style={{marginTop:5}}>
                <Button title='Remove' onPress={() => onRemove(id)}/>
            </View>
        </View>
    );
}
