interface getStudentCodeProps {
  grade: number;
  classNumber: number;
  number: number;
}

export default function getStudentCode({ grade, classNumber, number }: getStudentCodeProps) {
  return `${String(grade)}${String(classNumber)}${String(number).padStart(2, '0')}`;
}
