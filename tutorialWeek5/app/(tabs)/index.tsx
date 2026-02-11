import StudentCard from "@/components/StudentCard";
import {View } from "react-native";

export default function IndexScreen() {
  return (
    <View style={{ padding:20}}>
      <StudentCard name='Alex' major='ComputerScience' year= '2026'></StudentCard>
      <StudentCard name='Jamie' major='Business' year= '2026'></StudentCard>
      <StudentCard name='Sam' major='Engineering' year= '2026'></StudentCard>
    </View>
  );
}



