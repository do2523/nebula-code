import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "note/n/components/ui/table";
import Navbar from "../_components/navbar";

const users = [
  {
    rank: "1",
    name: "Gabriel",
    streak: "30",
    points: "320",
  },
  {
    rank: "2",
    name: "Jhon",
    streak: "27",
    points: "300",
  },
  {
    rank: "3",
    name: "Alice",
    streak: "20",
    points: "220",
  },
  {
    rank: "4",
    name: "Alex",
    streak: "18",
    points: "210",
  },
  {
    rank: "5",
    name: "James",
    streak: "1",
    points: "16",
  },
];

export default function Leaderboard() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="w-full text-white p-6 mx-2 shadow-md rounded-md mt-16">
        <Table className="min-w-full">
          <TableCaption className="text-green-500 text-lg mb-4">
            Leaderboard of Best Users
          </TableCaption>
          <TableHeader>
            <TableRow className="border-b border-gray-700">
              <TableHead className="w-[100px] text-green-400">Rank</TableHead>
              <TableHead className="text-green-400">Name</TableHead>
              <TableHead className="text-green-400">Streak</TableHead>
              <TableHead className="text-right text-green-400">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.rank} className="border-b border-gray-700 hover:bg-gray-900">
                <TableCell className="font-medium text-white">{user.rank}</TableCell>
                <TableCell className="text-white">{user.name}</TableCell>
                <TableCell className="text-white">{user.streak}</TableCell>
                <TableCell className="text-right text-white">{user.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}