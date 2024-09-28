import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "note/n/components/ui/table"
   
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
  ]

export default function Leaderboard() {
            return (
              <Table>
                <TableCaption>Leaderbord of best users.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Rank</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Streak</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.rank}>
                      <TableCell className="font-medium">{user.rank}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.streak}</TableCell>
                      <TableCell className="text-right">{user.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )
}